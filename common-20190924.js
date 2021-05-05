'use strict';

const _window = $(window);
const $videoPlay = $('.play a');
const $menuClick = $('.menu a');

$('#scenicElement03 img').load(function() {
	$(this).show();
});

function check_if_in_view() {
	var window_height = _window.height();
	var window_top_position = _window.scrollTop();
	var window_bottom_position = window_top_position + window_height;
	var _animation_elements = $('.is-motion');

	$.each(_animation_elements, function() {
		var _element = $(this);
		var element_height = _element.outerHeight();
		var element_top_position = _element.offset().top;
		var element_bottom_position = element_top_position + element_height;

		if (element_bottom_position >= window_top_position && element_top_position <= window_bottom_position) {
			_element.addClass('is-active');
		}
	});
}
function activeAni() {
	// new Scenic(document.querySelector('#scenicElement03'));
	// new Scenic(document.querySelector('#scenicElement01'));
	// new Scenic(document.querySelector('#scenicElement02'));
	// new Scenic(document.querySelector('#scenicElement04'));

	gnbUtill();
	userAgentCheck();
}
function videoModule(event) {
	var $body = $('body');
	var $targetEvent = $(event.target);
	var $parentNode = $targetEvent.parent();
	var $videoUrl = $parentNode.attr('date-video');
	var $videoViewClose = $('.play_view .close');

	var $videoTag = "<iframe src='https://www.youtube.com/embed/" + $videoUrl + "?autoplay=1' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen class='video-block'></iframe>";

	var $videoView = $body.find('.play_view');

	$body.css('overflow', 'hidden');
	$videoView.prepend($videoTag);
	$videoView.addClass('show');

	$videoViewClose.on('click', function() {
		$('body').removeAttr('style');
		$('.play_view').removeClass('show');
		$('.video-block').remove();

		return false;
	});
	event.preventDefault();
}

$videoPlay.click(videoModule);

$menuClick.on('click', function(e) {
	var targetHash = $(this).attr('href');
	var headerHeight = $('.pubg_mobile-header').outerHeight();
	var targetOffset = $(targetHash).offset().top;
	e.preventDefault();

	$('html, body').animate({ scrollTop: targetOffset - headerHeight }, 500);
	$('.menu a').removeClass('over');
	$(this).addClass('over');
});

function bannerScrollActive() {
	var $headerWrap = $('.pubg_mobile-header');
	var $bannerWrap = $('.pmsc_banner');
	var display = $bannerWrap.css('display');
	function bannerScroll() {
		$('html, body').scrollTop() <= 80 ? $headerWrap.addClass('scroll') : $headerWrap.removeClass('scroll');
	}

	display != 'none' ? bannerScroll() : '';

	$('.pmsc_banner__inner .close').on('click', function() {
		$bannerWrap.hide();
		$headerWrap.removeClass('scroll');
	});
}

function mobileMenuActive() {
	var headerHeight = $('.pubg_mobile-header').outerHeight();
	$('.pubg_mobile-section').each(function() {
		if ($(window).scrollTop() >= $(this).offset().top - headerHeight) {
			var id = $(this).attr('id');
			$('.menu li a').removeClass('over');
			$('.menu li a[href=#' + id + ']').addClass('over');
		}
	});
}

function gnbUtill() {
	var $utilSelect = $('.util-menu-mo a');
	var $utilClose = $('.util-view .close');
	var utilView = $('.util-view');
	$utilSelect.on('click', function(e) {
		e.preventDefault();
		utilView.fadeIn();
	});
	$utilClose.on('click', function(e) {
		e.preventDefault();
		utilView.hide();
	});
}

function userAgentCheck() {
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.indexOf('edge') > -1) {
		$('body').addClass('noneBrowser');
		$('.section-royale video').remove();
	} else if (userAgent.indexOf('msie') > -1) {
		$('body').addClass('noneBrowser');
		$('.section-royale video').remove();
	} else if (userAgent.indexOf('firefox') > -1) {
		$('.section-royale video').prop('preload', 'none');
	} else if (userAgent.indexOf('Safari') > -1) {
		$('.section-royale video').prop('preload', 'none');
	} else {
		$('.section-royale video').prop('autoplay', 'true');
	}

	if (navigator.userAgent.match(/ipad/i)) {
		$('video').remove();
	} else if (navigator.userAgent.match(/Tabvar/i)) {
		$('video').remove();
	} else if (navigator.userAgent.match(/Android/i)) {
		$('video').remove();
	} else if (navigator.userAgent.match(/iPhone|iPod/i)) {
		$('video').remove();
	}
}

function slickModule() {
	var $slickWrap = $('.section-festival');
	var $slick = $('.pubg_mobile-slick');
	$slick.slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		autoplay: false,
		responsive: [
			{
				breakpoint: 769,
				settings: {
					autoplay: true,
					autoplaySpeed: 2000,
				},
			},
		],
	});

	$slickWrap.addClass('first-item');
	$slick.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		if (nextSlide === 0) {
			$slickWrap.addClass('first-item');
		} else {
			$slickWrap.removeClass('first-item');
		}
	});
}

_window.on('scroll resize', check_if_in_view);
_window.trigger('scroll');

$(window).scroll(function() {
	mobileMenuActive();
});
activeAni();
slickModule();
