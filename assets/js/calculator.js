$(function(){

	var calculator = {
		defaults : {
			calc_action : "#calculate" ,
			numerador : "#num" ,
			denominator : "#denominator" ,
			result : "#fraction_calculator .result" ,
			"reset_action" : "#calc-reset"
		} ,
		init : function( options ) {
			this.settings = $.extend( {}, this.defaults, options ) ;
			this.calculate() ;
			this.reset();
		} ,
		calculate: function() {
			var that = this ;

			$(that.settings.calc_action).click(function (e) {
				e.preventDefault() ;

				var $btn = $(this) ;
				var $numerador = $( that.settings.numerador ) ;
				var $denominator = $( that.settings.denominator ) ;
				var $result = $( that.settings.result ) ;

				$btn.removeClass( "success" ).val( "=" ) ;
				$result.html("&nbsp;") ;
				if ( $.isEmptyObject( $numerador.val() ) ) {
					$numerador.focus() ;
					return ;
				}

				if ( $.isEmptyObject( $denominator.val() ) ) {
					$denominator.focus() ;
					return ;
				}

				var numerador = parseFloat( $numerador.val() );
				var denominator = parseFloat( $denominator.val() );
				var category = that.getCategory( numerador , denominator ) ;

				$result.text( numerador / denominator ) ;
				$btn.val( category ) ;
				$btn.addClass( "success" ) ;
				that.addToHistory( numerador, denominator, category );
			});
		} ,
		getCategory: function( numerador , denominator ) {
			if ( numerador < denominator ) {
				return "Própria" ;
			}

			if ( numerador % denominator == 0 ) {
				return "Aparente" ;
			}

			return "Imprópria" ;
		} ,
		addToHistory: function( numerador , denominator , category ) {
			var $history = $(".history").find("table");
			var $new_line = $history.find("tbody").find("tr").last().clone();

			// verifica se é a mesma linha para evitar duplicação
			if( parseFloat($new_line.find("td").find(".numerador").text()) == numerador
				&& parseFloat($new_line.find("td").find(".divisor").text()) == denominator){
				return ;
			}

			$new_line.find("td").find(".numerador").text(numerador);
			$new_line.find("td").find(".divisor").text(denominator);
			$new_line.find("td").eq(1).text( parseFloat((numerador/denominator).toFixed(2)));
			$new_line.find("td").eq(2).text(category);
			$history.append( $new_line );
		} ,
		reset: function() {
			var that = this ;
			$(that.settings.reset_action).click(function (e) {
				e.preventDefault() ;
				$( that.settings.numerador ).val("").focus();
				$( that.settings.denominator ).val("");
				$( that.settings.result ).html("&nbsp;");
				$( that.settings.calc_action ).removeClass( "success" ).val( "=" ) ;
			}) ;
		}
	}

	calculator.init();
})