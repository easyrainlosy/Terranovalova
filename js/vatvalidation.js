jQuery(document).ready(function() {

	var vatValidation = false;
	var vatLast;

	jQuery(document).on("input", ".vat-validation", function() {
		clearTimeout(jQuery.data(this, 'timer'));
		jQuery(this).data('timer', setTimeout(function() {


			var vat = jQuery(".vat-validation").val();

			jQuery.post("/ajax/vat/validate/", {vat: vat }, function(response) {
				
				if (vat) {
					if (!jQuery('.fiscal-validation').parent().parent().hasClass('hidden') && jQuery('.billing-company-code-field').hasClass('hidden')) {
						jQuery('.fiscal-validation').removeClass('required-entry');
					}
					vatValidation = true;
				} else {
					if (!jQuery('.fiscal-validation').parent().parent().hasClass('hidden')) {
						jQuery('.fiscal-validation').addClass('required-entry');
					}
					vatValidation = false;
				}
				if (response) {
					jQuery('.vat-success-msg').html('La P.IVA inserita potrebbe non essere valida')
					jQuery('.vat-success-msg').css('color', 'red')
				} else {
					jQuery('.vat-success-msg').html('La tua P.IVA è valida')
					jQuery('.vat-success-msg').css('color', 'green')
				}

				Validation.validate($('billing:vat_id'))
				Validation.validate($('billing:fiscal_code'))
			})



		}, 200));
	})

	Validation.add('vat-validation', 'La P.IVA inserita non è valida', function(v) {
		if (vatValidation == true && jQuery('.billing-company-code-field').hasClass('hidden')) {
			jQuery('input[name="billing[fiscal_code]"]').parent().find('.validation-advice').remove()
		}
	    return Validation.get('IsEmpty').test(v) || vatValidation;
	})


	var privatevatValidation = false;
	var privatevatLast;

	jQuery(document).on("input", ".fiscal-validation", function() {
		clearTimeout(jQuery.data(this, 'timer2'));
		jQuery(this).data('timer2', setTimeout(function() {
			var vat = jQuery(".fiscal-validation").val();

			jQuery.post("/ajax/vat/validatefiscale/", {vat: vat }, function(response) {
		
				if (vat) {
					if (jQuery('.billing-company-code-field').hasClass('hidden')) {
						jQuery('.vat-validation').removeClass('required-entry');
					}
					
					privatevatValidation = true;
				} else {
					jQuery('.vat-validation').addClass('required-entry');
					privatevatValidation = false;
				}


				if (response) {
					jQuery('.fiscal-success-msg').html('Il C.F. inserito protrebbe non essere valido')
					jQuery('.fiscal-success-msg').css('color', 'red')
				} else {
					jQuery('.fiscal-success-msg').html('Il tuo C.F. è valido')
					jQuery('.fiscal-success-msg').css('color', 'green')
				}


				Validation.validate($('billing:fiscal_code'))
				Validation.validate($('billing:vat_id'))
			})
		}, 200));
	})

	Validation.add('fiscal-validation', 'Il tuo C.F. non è valido', function(v) {
	    return Validation.get('IsEmpty').test(v) || privatevatValidation;
	})

	var companycodeValidation = false;
	jQuery(document).on("input", ".company-code-validation", function() {
		clearTimeout(jQuery.data(this, 'timer3'));
		jQuery(this).data('timer3', setTimeout(function() {
			var companycode = jQuery(".company-code-validation").val();



			jQuery.post("/ajax/vat/validatecompanycode/", {companycode: companycode }, function(response) {

				if (response) {
					jQuery('.company-code-success-msg').html('')
					jQuery('.company-code-success-msg').css('color', 'red')
					companycodeValidation = false;
					jQuery('.pec-validation').addClass('required-entry');
				} else {
					jQuery('.company-code-success-msg').html('')
					jQuery('.company-code-success-msg').css('color', 'green')
					companycodeValidation = true;
					jQuery('.pec-validation').removeClass('required-entry');
				}

				Validation.validate($('billing:company_code'))
			})

		}, 200));
	})

	Validation.add('company-code-validation', 'Il codice azienda deve essere di 7 caratteri e non può contenere lettere accentate o caratteri speciali.', function(v) {
		if (companycodeValidation == true) {
			jQuery('input[name="billing[pec]"]').parent().find('.validation-advice').remove()
		}
		if (jQuery('.billing-company-code-field').hasClass('hidden')) {
			return true;
		}
	    return Validation.get('IsEmpty').test(v) || companycodeValidation;
	})



	var pecValidation = false;
	jQuery(document).on("input", ".pec-validation", function() {

		clearTimeout(jQuery.data(this, 'timer4'));
		jQuery(this).data('timer4', setTimeout(function() {
			var companycode = jQuery(".pec-validation").val();

			pecValidation = Validation.validate($('billing:pec'))

			if (pecValidation == true) {
				jQuery('.company-code-validation').removeClass('required-entry');
				jQuery('input[name="billing[company_code]"]').parent().find('.validation-advice').remove()
			} else {
				jQuery('.company-code-validation').addClass('required-entry');
			}

		}, 200));
	})

	Validation.add('pec-validation', 'Inserire un indirizzo email valido. Per esempio johndoe@domain.com.', function(v) {
	    return Validation.get('IsEmpty').test(v) || /^([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*@([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*\.(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]){2,})$/i.test(v)
	})




	jQuery(document).on("submit", "#contactForm", function(e) {
		var name = jQuery('input[name="name"]');
		var email = jQuery('input[name="email"]');
		var comment = jQuery('textarea[name="comment"]');

		if (checkInput(name) == false) {
			e.preventDefault();
		}
		if (checkInput(email) == false) {
			e.preventDefault();
		}
		if (checkInput(comment) == false) {
			e.preventDefault();
		}

		if (jQuery('#inputPrivacy').prop("checked") != true) {
			alert("Devi accettare l'informativa sulla privacy");
			e.preventDefault();
		}
	})

	jQuery(document).on("submit", "#newsletter-validate-detail", function(e){
		if (jQuery(this).find('input[name="Privacy"]').prop('checked') != true) {
			alert("Devi accettare l'informativa sulla privacy");
			e.preventDefault()
		}
	})

	var needInvoiceTimer;

	jQuery(document).on("click", "#need_invoice", function() {

		var needInvoice = jQuery('#need_invoice');
		var vat = jQuery('#billing:vat_id');
		var btn = jQuery('#review-buttons-container').find('button');

		if (jQuery(this).prop("checked")) {
			needInvoiceTimer = setInterval(function() {
				if (needInvoice.length && needInvoice.prop('checked')) {
					
					if (jQuery('.billing-vat-field').hasClass('hidden')) {
		
						if (!jQuery('input[name="billing\[fiscal_code\]"]').val()) {
							btn.addClass('button-disabled');
							btn.prop('disabled', true);
						} else {
							btn.removeClass('button-disabled');
							btn.prop('disabled', false);	
						}
					} else {
		
						if (jQuery('input[name="billing\[vat_id\]"]').val() && jQuery('input[name="billing\[fiscal_code\]"]').val() && (jQuery('input[name="billing\[pec\]"]').val() || jQuery('input[name="billing\[company_code\]"]').val())) {
							btn.removeClass('button-disabled');
							btn.prop('disabled', false);	
						} else {
							btn.addClass('button-disabled');
							btn.prop('disabled', true);
						}

					}
				}
			}, 1000);
		} else {
			clearInterval(needInvoiceTimer);
			btn.removeClass('button-disabled');
			btn.prop('disabled', false);	
		}
	})

})



function checkInput(el) {
	el.css('border', '1px solid #BBBBBB');
	if (!el.val()) {
		el.css('border', '1px dotted red');
		return false;		
	} else {
		return true;
	}
}