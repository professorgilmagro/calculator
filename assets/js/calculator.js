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

				$result.text( numerador / denominator ) ;
				$btn.val( that.get_category( numerador , denominator ) ) ;
				$btn.addClass( "success" ) ;
			});
		} ,
		get_category: function( numerador , denominator ) {
			if ( numerador < denominator ) {
				return "Própria" ;
			}

			if ( numerador % denominator == 0 ) {
				return "Aparente" ;
			}

			return "Imprópria" ;
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