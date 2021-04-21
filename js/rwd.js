jQuery(window).bind('load resize', function(){
	homeContentPosition();
	catalogItemsPricebox();
	homeItemHeight();
	footer();
	headerBackground();
	insertBars();
	addBodyClass();
	if (viewport().width >= 992) {
		jQuery('#nav').show();
	}
	magicToolboxRwd();
	makeSidebarHeight();
	istruzioni();
});

jQuery(document).ready(function(){
	jQuery(document).on('click', '.toggle-menu', function(){
		toggleMenu();
	})

	if (viewport().width < 641) {
		jQuery('.btn-slider span span').each(function() {
			if (jQuery(this).text() == "Scopri i dettagli dell'offerta") {
				jQuery(this).text("Scopri")
			}
		})
	}
})
function istruzioni(){
	if (viewport().width < 768 ) {
		jQuery('.istruzioni').css('height', '700px');
	} else {
		jQuery('.istruzioni').css('height', '300px');
	}
}
function makeSidebarHeight(){
	if( jQuery('.banner_home').length > 0 ){

		var elLeftItem = jQuery('.col-left').find('.products-columns > li');
		var elRightItem = jQuery('.col-right').find('.products-columns > li');

		var numLeftItem = elLeftItem.length;
		var numRightItem = elRightItem.length;



		if (viewport().width >= 1200) {

			var timer = setInterval(function(){

				var bannerHeight = jQuery('.flexslider').height();
				if(bannerHeight > 0){

					clearInterval(timer);
					var colContentHeight = jQuery('.col-content').height();
					var colLeftHeight = jQuery('.col-left').height();
					var colRightHeight = jQuery('.col-right').height();

					//console.log()

					switch(location.hostname){
						case 'www.fassi-sport.it':
							var fixNum = 7.5;
						break
						case 'www.diadorafitness.it':
							var fixNum = 19.2;
						break
						case 'www.diadorafitness.co.uk':
							var fixNum = 6;
						break
						case 'www.diadorafitness.es':
							var fixNum = 8.5;
						break						
					}

					if( colContentHeight > colLeftHeight || colContentHeight > colRightHeight){

						if( colLeftHeight > colRightHeight ) {
							//console.log('1')
							var diffHeight = (colContentHeight - colLeftHeight);
							var newHeight = ((colLeftHeight - 40 - (30 * numLeftItem) ) / numLeftItem) + (diffHeight / numLeftItem) + fixNum;

						} else {
							//console.log('2')
							var diffHeight = (colContentHeight - colRightHeight);
							var newHeight = ((colRightHeight - 40 - (30 * numRightItem) ) / numRightItem) + (diffHeight / numRightItem) + fixNum;

						}

						elLeftItem.css('height', newHeight+'px');
						elRightItem.css('height', newHeight+'px');	
					} else {
						elLeftItem.css('height', 'auto');
						elRightItem.css('height', 'auto');
					}			

				}


			}, 100)
		} else {
			elLeftItem.css('height', 'auto');
			elRightItem.css('height', 'auto');
		}
	}


}

function magicToolboxRwd(){
	jQuery('.MagicZoomPlus').css('width', '100%');
	if (viewport().width >= 768) {
		jQuery('.MagicToolboxContainer').css('width', '50%');		
	} else {
		jQuery('.MagicToolboxContainer').css('width', '100%');
	}

	if(viewport().width < 992){
		jQuery('.MagicZoomBigImageCont').css('width','300px');
		jQuery('.MagicZoomBigImageCont').css('height','300px');
	}
	if(viewport().width < 769){
		jQuery('.MagicZoomBigImageCont').hide();
		jQuery('.MagicZoomPup').css('width', '0px');
		jQuery('.MagicZoomPup').css('height', '0px');
		jQuery('.MagicZoomPlus').css('cursor','url(/skin/frontend/base/default/css/graphics/zoomin.cur), pointer');
		jQuery('.MagicZoomPlus:hover').css('cursor','url(/skin/frontend/base/default/css/graphics/zoomin.cur), pointer');
	} else {
		jQuery('.MagicZoomBigImageCont').show();
		jQuery('.MagicZoomPup').css('width', '126px');
		jQuery('.MagicZoomPup').css('height', '119px');
		jQuery('.MagicZoomPlus').css('cursor','default');
		jQuery('.MagicZoomPlus:hover').css('cursor','default');
	}

}

function toggleMenu(){
	jQuery('#nav').slideToggle();
}

function addBodyClass(){
	if (viewport().width < 992) {
		jQuery('body').addClass('mini');
	} else {
		jQuery('body').removeClass('mini');
	}
}

function insertBars(){
	if( jQuery('.toggle-menu').length <= 0){
		jQuery('<a href="javascript:void();"><i class="fa fa-bars toggle-menu"></i></a><div class="clear"></div>').prependTo('.nav-container');
	}
	
}

function headerBackground(){
	var header = jQuery('.header');
	if (viewport().width > 991 && viewport().width < 1200) {
		var backMargin = 1200 - viewport().width + 30;
		header.css('background', 'url("/skin/frontend/diadora/default/images/bg_header.png") no-repeat -'+backMargin+'px 0');
	}
	if (viewport().width >= 1200) {
		header.css('background', 'url("/skin/frontend/diadora/default/images/bg_header.png") no-repeat 0 0');
	}
	if (viewport().width < 992) {
		header.css('background', '#000');
	}
}

function footer(){
	jQuery('.ban-info > h3').css('width', 'auto');
	jQuery('.ban-info > p').css('width', 'auto');
	if (viewport().width < 641) {
		jQuery('.footer > .col > p').css('text-align', 'center');
	} else {
		jQuery('.footer > .col > p').css('text-align', 'left');
	}
}

function catalogItemsPricebox(){

	jQuery.each( jQuery('.category-main-block .item'), function(){
		if( jQuery(this).find('.clear').length == 0){
			jQuery('<div class="clear"></div>').appendTo( jQuery(this) );
		}
		if (viewport().width < 1200) {
			jQuery(this).find('#little-price-box').appendTo( jQuery(this) );
			jQuery(this).find('#little-price-box').addClass('little-price-box-rwd');
		} else {
			jQuery(this).find('#little-price-box').appendTo( jQuery(this).find('.pricebox') );
			jQuery(this).find('#little-price-box').removeClass('little-price-box-rwd');
		}

		
	})

}

function compareNumbers(a, b) {
  return a - b;
}

function homeItemHeight(){
	if (window.location.hostname == "www.sport365.it") {
		jQuery('.item.odd').css('height', 'auto');
		jQuery('.item.even').css('height', 'auto');

		if (viewport().width > 1140) {
			
			var firstHeight;
			var secondHeight;
			var thirdHeight;

			jQuery.each( jQuery('.item:nth-child(3n+1)'), function(index, el){
				firstHeight = jQuery(this).height();
				secondHeight = jQuery('.item:nth-child(3n+2)').eq(index).height();
				thirdHeight = jQuery('.item:nth-child(3n)').eq(index).height();

				var arr = [parseInt(firstHeight),parseInt(secondHeight),parseInt(thirdHeight)];
				var a = arr.sort(compareNumbers);
				jQuery(this).css('height', a[2]+"px")
				jQuery('.item:nth-child(3n+2)').eq(index).css('height', a[2]+"px")
				jQuery('.item:nth-child(3n)').eq(index).css('height', a[2]+"px")


			})

		}

		if (viewport().width > 640 && viewport().width < 1139) {
			var oddHeight;
			var evenHeight;
			jQuery.each( jQuery('.item.odd'), function(){

				oddHeight = jQuery(this).height();
				evenHeight = jQuery(this).next('.item.even').height();

				if(oddHeight > evenHeight){
					jQuery(this).next('.item.even').css('height', oddHeight+'px');
					jQuery(this).css('height', oddHeight+'px');
				} else {
					jQuery(this).css('height', evenHeight+'px');
					jQuery(this).next('.item.even').css('height', evenHeight+'px');
				}
			});
		}	

		return;
	}

	if (viewport().width > 640) {
		jQuery('.item.odd').css('height', 'auto');
		jQuery('.item.even').css('height', 'auto');
		var array = [];
		var oddHeight;
		var evenHeight;
		jQuery.each( jQuery('.item.odd'), function(){

			oddHeight = jQuery(this).height();
			evenHeight = jQuery(this).next('.item.even').height();

			if(oddHeight > evenHeight){
				jQuery(this).next('.item.even').css('height', oddHeight+'px');
				jQuery(this).css('height', oddHeight+'px');
			} else {
				jQuery(this).css('height', evenHeight+'px');
				jQuery(this).next('.item.even').css('height', evenHeight+'px');
			}
		});
	} else {

	}
}

function homeContentPosition(){
	var colContent = jQuery('.col-content');
	var colLeft = jQuery('.col-left');
	var colRight = jQuery('.col-right');

	if (viewport().width > 991) {
		colContent.insertAfter( colLeft )
	} else {
		colContent.insertBefore( colLeft )
	}
	jQuery('.flexslider').flexslider({
		animation: "slide",
		controlNav: false,
		start: function(slider) {
			jQuery('body').removeClass('loading');
		}
	});
}

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function getMax(arr) {
	var arrLen = arr.length,
		maxEl = arr[0];
	for (var i = 0; i < arrLen; i++) {
		if (maxEl < arr[i]) {
			maxEl = arr[i];
		}
	}
	return maxEl;
}