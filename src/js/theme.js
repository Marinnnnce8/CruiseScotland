/**
 * Theme JS
 *
 * @copyright 2019 NB Communication Ltd
 *
 */

var theme = {
	init: function () {
		this.protectLinks();
		this.touchHelper();
		
		if (toggleBtn.length) {
			this.toggleNav(toggleBtn, classActive, nav);
		}
		if (navigator.userAgent.match(/Trident\/7\./) && fixedBckg.length) {
			$('body').on("mousewheel", function () {
				event.preventDefault();

				var wheelDelta = event.wheelDelta;
				var currentScrollPosition = window.pageYOffset;
				window.scrollTo(0, currentScrollPosition - wheelDelta);
			});
		}
	},

	equalHeight: function (equalItem) {
		let itemHeight = 0;
		equalItem.each(function () {
			if ($(this).outerHeight() > itemHeight) {
				itemHeight = $(this).outerHeight();
			}
		});
		equalItem.css("height", itemHeight);
	},

	protectLinks: function () {
		var $links = $("a[target='_blank']");
		if (!$links.length) return;

		$links.each(function () {
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

	touchHelper: function () {
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

	toggleNav: function (obj, classActive, nav) {
		obj.click(function () {
			obj.toggleClass(classActive);
			nav.slideToggle();
		});
	},

	toggleDropdown: function (obj, classActive) {
		obj.click(function () {
			obj.parent().toggleClass(classActive);
		});
	},

	toggleDopdownOut: function (obj, dropdownBtn, classActive) {
		$(document).mouseup(function (e) {
			if (!obj.is(e.target) && obj.has(e.target).length === 0) {
				dropdownBtn.parent().removeClass(classActive);
				obj.hide();
			}
		});
	},

	toggleText: function (obj, listingText, listingItem, listingItemActive) {
		if (!$("html").hasClass("touch")) {
			obj.hover(function (e) {
				$(this)
					.find(listingText)
					.slideToggle(500);
				$(this)
					.find(listingItem)
					.toggleClass(listingItemActive);
			});
		} else {
			obj.click(function () {
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

$(document).ready(function () {
	theme.init();
});
