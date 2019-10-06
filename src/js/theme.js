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
		const buttonHover = $(".uk-button");
		const toggleBtn = $(".js-toggle-nav");
		const nav = $(".nav-wrap");
		const classActive = "uk-navbar-toggle--active";
		const dropdownBtn = $(".js-toggle-dropdown");
		const dropdownActive = "dropdown--active";
		const fixedBckg = $(".members-section"); //za paralax mozes iskoristiti
		const introSlider = $(".js-intro-slider");
		const introCard = $(".js-intro-slider .uk-slider-items li");
		const introSliderArrowPrev = $(".js-intro-arrow-next");
		const introSliderArrowNext = $(".js-intro-arrow-prev");
		const recentSlider = $(".js-recent-slider");
		const recentCard = $(".js-recent-slider .uk-slider-items li");
		const recentCardActive = "recent-card--active";
		const recentSliderArrowPrev = $(".js-recent-arrow-next");
		const recentSliderArrowNext = $(".js-recent-arrow-prev");
		const mapBtn = $(".js-button-map");
		const destinationCard = $(".destination-card");
		const destinationsBtnParent = $(".js-destination-members li");
		const mapsBtnParent = $(".js-destination-map li");
		const closeCardBtn = $(".js-card-close");
		const cardBtnClassActive = "active";
		if (buttonHover.length) {
			this.btnHoverEffect(buttonHover);
		}
		if (mapBtn.length) {
			this.toggleDestinationCard(
				mapBtn,
				destinationCard,
				cardBtnClassActive,
				destinationsBtnParent,
				mapsBtnParent
			);
		}
		if (closeCardBtn.length) {
			this.closeDestinationCard(closeCardBtn);
		}
		if (toggleBtn.length) {
			this.toggleNav(toggleBtn, classActive, nav);
		}
		if (dropdownBtn.length) {
			this.toggleDropdown(dropdownBtn, dropdownActive);
		}
		if (introCard.length) {
			this.calcSliderWidth(
				introCard,
				introSlider,
				introSliderArrowPrev,
				introSliderArrowNext,
				4
			);
		}
		if (recentCard.length) {
			this.calcSliderWidth(
				recentCard,
				recentSlider,
				recentSliderArrowPrev,
				recentSliderArrowNext,
				3
			);
			if (!$(".touch").length) {
				this.recentCardHover(recentCard, recentCardActive);
			}
		}
	},

	btnHoverEffect: function(buttonHover) {
		if ($(".touch").length) {
			buttonHover
				.on("mouseenter", function(e) {
					var parentOffset = $(this).offset(),
						relX = e.pageX - parentOffset.left,
						relY = e.pageY - parentOffset.top;
					$(this)
						.find(".uk-button-hover")
						.css({ top: relY, left: relX });
				})
				.on("mouseout", function(e) {
					var parentOffset = $(this).offset(),
						relX = e.pageX - parentOffset.left,
						relY = e.pageY - parentOffset.top;
					$(this)
						.find(".uk-button-hover")
						.css({ top: relY, left: relX });
				});
			$('[href="#"]').click(function() {
				return false;
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
		equalItem.css("min-height", itemHeight);
	},

	calcSliderWidth: function(
		card,
		slider,
		sliderArrowPrev,
		sliderArrowNext,
		multipleNum
	) {
		const cardWidth = card.width();
		const arrowWidth = sliderArrowPrev.width();
		const cardPartWidth = cardWidth / 5;
		const sliderWidth = cardPartWidth + $(window).width();
		slider.css("width", sliderWidth);
		const cardWidthArrows = card.width();
		let multipleNumber = multipleNum;
		if (window.matchMedia("screen and (min-width: 1200px)").matches) {
			multipleNumber = multipleNum;
		} else if (
			window.matchMedia("(max-width: 1199px)").matches &&
			window.matchMedia("(min-width: 768px)").matches
		) {
			multipleNumber = 2;
		} else {
			multipleNumber = 1;
		}
		if (window.matchMedia("(min-width: 768px)").matches) {
			sliderArrowPrev.css(
				"left",
				cardWidthArrows * multipleNumber - arrowWidth
			);
			sliderArrowNext.css("left", cardWidthArrows * multipleNumber);
		} else {
			sliderArrowPrev.css(
				"left",
				cardWidthArrows * multipleNumber - arrowWidth * 2
			);
			sliderArrowNext.css(
				"left",
				cardWidthArrows * multipleNumber - arrowWidth
			);
		}
	},

	toggleDestinationCard: function(
		mapBtn,
		destinationCard,
		cardBtnClassActive,
		destinationsBtnParent,
		mapsBtnParent
	) {
		mapBtn.click(function() {
			const index = $(this).data("card") - 1;
			destinationsBtnParent
				.not(
					destinationsBtnParent.eq(index).addClass(cardBtnClassActive)
				)
				.removeClass(cardBtnClassActive);
			mapsBtnParent
				.not(mapsBtnParent.eq(index).addClass(cardBtnClassActive))
				.removeClass(cardBtnClassActive);
			destinationCard.not(destinationCard.eq(index).show()).hide();
		});
	},

	closeDestinationCard: function(closeCardBtn) {
		closeCardBtn.click(function() {
			$(this)
				.closest(".destination-card")
				.hide();
		});
	},

	protectLinks: function() {
		var $links = $("a[target='_blank']");
		if (!$links.length) return;

		$links.each(function() {
			var $a = $(this),
				rel = $a.attr("rel"),
				protect = ["noopener", "noreferrer"];

			rel = !$nb.x(rel) ? rel.split(" ") : [];
			for (var i = 0; i < protect.length; i++) {
				if (rel.indexOf(protect[i]) < 0) rel.push(protect[i]);
			}

			$a.attr("rel", rel.join(" "));
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

	recentCardHover: function(recentCard, classActive) {
		recentCard.hover(function() {
			$(this).toggleClass(classActive);
		});
	}
};

$(document).ready(function() {
	theme.init();
});
