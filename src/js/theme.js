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
		const toggleBtn = $('.js-toggle-nav');
		const nav = $('.uk-navbar-nav');
		const classActive = 'uk-navbar-toggle--active';
		const dropdownBtn = $('.js-toggle-dropdown');
		const dropdownActive = 'dropdown--active';
		const dropdownContainer = $('.uk-navbar-dropdown');
		const equalItem = $('.js-height-match');
		const listingLink = $('.js-toggle-text');
		const listingText = $('.listing-item__text');
		const listingItemActive = 'listing-item-bottom--active';
		const listingItem = $('.listing-item-bottom');
		const fixedBckg = $('.members-section');
		const introSlider = $('.js-intro-slider');
		const introCard = $('.uk-slider-items li');
		const introSliderArrowPrev = $('.js-slider-arrow-next');
		const introSliderArrowNext = $('.js-slider-arrow-prev');
		const recentStoryLink = $('.js-toggle-txt');
		if (toggleBtn.length) {
			this.toggleNav(toggleBtn, classActive, nav);
		}
		if (introCard.length) {
			this.calcIntroSliderWidth(introCard, introSlider, introSliderArrowPrev, introSliderArrowNext);
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
		if (listingLink.length) {
			this.toggleText(
				listingLink,
				listingText,
				listingItem,
				listingItemActive
			);
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

	equalHeight: function(equalItem) {
		let itemHeight = 0;
		equalItem.each(function() {
			if ($(this).outerHeight() > itemHeight) {
				itemHeight = $(this).outerHeight();
			}
		});
		equalItem.css('min-height', itemHeight);
	},

	calcIntroSliderWidth: function(introCard, introSlider,  introSliderArrowPrev, introSliderArrowNext) {
		const cardWidth = introCard.width();
		const arrowWidth = introSliderArrowPrev.width();
		const cardPartWidth = cardWidth / 5;
		const sliderWidth = cardPartWidth + $(window).width();
		introSlider.css('width', sliderWidth);
		introSliderArrowPrev.css('left', (cardWidth * 4) + cardPartWidth + arrowWidth);
		introSliderArrowNext.css('left', (cardWidth * 4) + cardPartWidth + arrowWidth * 2);
	},

	slideText: function(recentStoryLink){
		recentStoryLink.hover(function(){
			$(this).closest('li').find('p').slideToggle();
		});
	},

	protectLinks: function() {
		var $links = $("a[target='_blank']");
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
			(('ontouchstart' in window || navigator.msMaxTouchPoints > 0) &&
				window.matchMedia('screen and (max-width: 1200px)').matches) ||
			('ontouchstart' in window &&
				navigator.appVersion.indexOf('Mac') !== -1)
		) {
			$('html').addClass('touch');
		} else {
			$('html').addClass('no-touch');
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
	},

	toggleText: function(obj, listingText, listingItem, listingItemActive) {
		if (!$('html').hasClass('touch')) {
			obj.hover(function(e) {
				$(this)
					.find(listingText)
					.slideToggle(500);
				$(this)
					.find(listingItem)
					.toggleClass(listingItemActive);
			});
		} else {
			obj.click(function() {
				$(this)
					.find(listingText)
					.slideToggle(500);
				$(this)
					.find(listingItem)
					.toggleClass(listingItemActive);
			});
		}
	}
};

$(document).ready(function() {
	theme.init();
});
