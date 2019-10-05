/**
 * Theme JS
 *
 * @copyright 2019 NB Communication Ltd
 *
 */

var theme = {
	init: function() {
		this.protectLinks();
		this.touchHelper();
		const buttonHover = $('.uk-button');
		const toggleBtn = $('.js-toggle-nav');
		const nav = $('.nav-wrap');
		const classActive = 'uk-navbar-toggle--active';
		const dropdownBtn = $('.js-toggle-dropdown');
		const dropdownActive = 'dropdown--active';
		const dropdownContainer = $('.uk-navbar-dropdown');
		const equalItem = $('.js-height-match');
		const fixedBckg = $('.members-section');//za paralax mozes iskoristiti
		const introSlider = $('.js-intro-slider');
		const introCard = $('.uk-slider-items li');
		const introSliderArrowPrev = $('.js-slider-arrow-next');
		const introSliderArrowNext = $('.js-slider-arrow-prev');
		const recentStoryLink = $('.js-toggle-txt');
		const mapBtn = $('.js-button-map');
		const destinationCard = $('.destination-card');
		const destinationsBtnParent = $('.js-destination-members li');
		const mapsBtnParent = $('.js-destination-map li');
		const closeCardBtn = $('.js-card-close');
		const cardBtnClassActive = 'active';
		if (buttonHover.length) {
			this.btnHoverEffect(buttonHover);
		}
		if (mapBtn.length) {
			this.toggleDestinationCard(mapBtn, destinationCard,cardBtnClassActive, destinationsBtnParent, mapsBtnParent);
		}
		if (closeCardBtn.length) {
			this.closeDestinationCard(closeCardBtn);
		}
		if (toggleBtn.length) {
			this.toggleNav(toggleBtn, classActive, nav);
		}
		if (introCard.length) {
			this.calcIntroSliderWidth(
				introCard,
				introSlider,
				introSliderArrowPrev,
				introSliderArrowNext
			);
		}
		if (recentStoryLink.length) {
			this.slideText(recentStoryLink);
		}
		if (dropdownBtn.length) {
			this.toggleDropdown(dropdownBtn, dropdownActive);
		}
		if (dropdownContainer.length) {
			this.toggleDopdownOut(
				dropdownContainer,
				dropdownBtn,
				dropdownActive
			);
		}
		if (dropdownContainer.length) {
			this.equalHeight(equalItem);
		}
		if (navigator.userAgent.match(/Trident\/7\./) && fixedBckg.length) {
			$('body').on('mousewheel', function() {
				event.preventDefault();

				var wheelDelta = event.wheelDelta;
				var currentScrollPosition = window.pageYOffset;
				window.scrollTo(0, currentScrollPosition - wheelDelta);
			});
		}
	},

	btnHoverEffect: function(buttonHover){
		buttonHover.on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
			$(this).find('.uk-button-hover').css({top:relY, left:relX})
    	}).on('mouseout', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
    	$(this).find('.uk-button-hover').css({top:relY, left:relX})
    	});
  		$('[href="#"]').click(function(){return false});
	},

	equalHeight: function(equalItem) {
		let itemHeight = 0;
		equalItem.each(function() {
			if ($(this).outerHeight() > itemHeight) {
				itemHeight = $(this).outerHeight();
			}
		});
		equalItem.css('min-height', itemHeight);
	},

	calcIntroSliderWidth: function(
		introCard,
		introSlider,
		introSliderArrowPrev,
		introSliderArrowNext
	) {
		const cardWidth = introCard.width();
		const arrowWidth = introSliderArrowPrev.width();
		const cardPartWidth = cardWidth / 5;
		const sliderWidth = cardPartWidth + $(window).width();
		introSlider.css('width', sliderWidth);
		introSliderArrowPrev.css(
			'left',
			cardWidth * 4 + cardPartWidth + arrowWidth
		);
		introSliderArrowNext.css(
			'left',
			cardWidth * 4 + cardPartWidth + arrowWidth * 2
		);
	},

	slideText: function(recentStoryLink) {
		recentStoryLink.hover(function() {
			$(this)
				.closest('li')
				.find('p')
				.toggleClass('closed');
		});
	},

	toggleDestinationCard: function(mapBtn, destinationCard, cardBtnClassActive, destinationsBtnParent, mapsBtnParent) {
		mapBtn.click(function() {
			const index = $(this).data('card') - 1;
			destinationsBtnParent.not(destinationsBtnParent.eq(index).addClass(cardBtnClassActive)).removeClass(cardBtnClassActive);
			mapsBtnParent.not(mapsBtnParent.eq(index).addClass(cardBtnClassActive)).removeClass(cardBtnClassActive);
			destinationCard.not(destinationCard.eq(index).show()).hide();
		});
	},
	
	closeDestinationCard: function(closeCardBtn) {
		closeCardBtn.click(function(){
			$(this).closest('.destination-card').hide();
		});
	},

	protectLinks: function() {
		var $links = $('a[target="_blank"]');
		if (!$links.length) return;

		$links.each(function() {
			var $a = $(this),
				rel = $a.attr('rel'),
				protect = ['noopener', 'noreferrer'];

			rel = !$nb.x(rel) ? rel.split(' ') : [];
			for (var i = 0; i < protect.length; i++) {
				if (rel.indexOf(protect[i]) < 0) rel.push(protect[i]);
			}

			$a.attr('rel', rel.join(' '));
		});
	},

	touchHelper: function() {
		if (
			(("ontouchstart" in window || navigator.msMaxTouchPoints > 0) &&
				window.matchMedia("screen and (max-width: 1200px)").matches) ||
			("ontouchstart" in window &&
				navigator.appVersion.indexOf("Mac") !== -1)
		) {
			$("html").addClass("touch");
		} else {
			$("html").addClass("no-touch");
		}
	},

	toggleNav: function(obj, classActive, nav) {
		obj.click(function() {
			obj.toggleClass(classActive);
			nav.slideToggle();
		});
	},

	toggleDropdown: function(obj, classActive) {
		obj.click(function() {
			obj.parent().toggleClass(classActive);
		});
	},

	toggleDopdownOut: function(obj, dropdownBtn, classActive) {
		$(document).mouseup(function(e) {
			if (!obj.is(e.target) && obj.has(e.target).length === 0) {
				dropdownBtn.parent().removeClass(classActive);
				obj.hide();
			}
		});
	}
};

$(document).ready(function() {
	theme.init();
});
