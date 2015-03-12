/*jslint devel: false, browser: false, white: true */
/*global $: false, window: false */

(function () {
	"use strict";

	window.Wedding = {
		init: function () {
			this.sections();
			this.scroller();
			this.tabs();
			this.slider();
			//this.simpleScrolls();
			//this.infoMenu();
		},

		sections: function () {
			var h = $(window).height() || window.innerHeight,
				pageWidth = window.innerWidth || document.documentElement.clientWidth,
				sections = $('.section').length,
				currentSection,
				sectionId;

			$('.section').each(function(i){
				$(this).css('min-height', h);
				//$(this).css('top', h * i);
				$(this).css('z-index', i * 100)
			});

			if ( pageWidth > 600 ) {
				$('.section').each(function(){
					$(this).css('height', h);
				});
			};

			/*$(window).scroll(function() {
				currentSection = Math.floor( $(window).scrollTop() / h ) + 1;
				sectionId = $('.section:nth-of-type(' + currentSection + ')').attr('id');

				$('.section:nth-of-type(' + currentSection + ')').css('position', 'fixed').css('top', '0');
			});*/
		},

		tabs: function () {
			var scrollBool = true,
				h = window.innerHeight,
				docH = document.height;

			function scrollOn () {
				scrollBool = true;
			};

			$('.tabs li, .header li').on('click', function(){
				var curTab = $(this).attr('id');
				scrollBool = false;

				$(this).siblings().removeClass('selected');
				$(this).addClass('selected');

				if ( $(this).parent('.tabs').length ) {
					$(this).parents().children('.content').hide();
					$(this).parents().children('.' + curTab).show();
				};

				setTimeout(scrollOn, 900);
			});

			$(document).scroll(function(){
				if ( $(window).scrollTop() >= (docH - h - 200) ) {
					$('.scroll').hide();
				} else {
					$('.scroll').show();
				}

				$('.section').each(function(){
					var top = $(this).offset().top - $(window).scrollTop() - 66,
						id = $(this).attr('id');

					if ( top <= 0 && top > -h && scrollBool ) {
						$('.header li').removeClass('selected');
						$('.header li#' + id).addClass('selected');
					};
				});
			});
		},

		slider: function () {
			$('.slider').carouFredSel({
				items: 1,
				responsive: true,
				width: '100%',
				height: 400,
				auto: {play: false},
				next: {button: '.next-slide'},
				prev: {button: '.prev-slide'},
				pagination: {container: '.pager'},
				scroll: {fx: 'cover',duration: 800}
			});
		},

		scroller: function () {
			$('body').pageScroller({
				sectionClass: 'section',
				scrollOffset: 0,
				animationSpeed: 800,
				navigation: '.header'
			});

			$('.scroll p').on('click', function(){
			    pageScroller.next();
			});

			$('.header li').on('click', function(){
				var current = $(this).attr('data-scroll');
				console.log(current);
				pageScroller.goTo(current);
			});
		},

		simpleScrolls: function () {
			var controller = $.superscrollorama(),
				fullHeight = window.innerHeight,
				pageWidth = window.innerWidth || document.documentElement.clientWidth;

			/*controller.addTween(
				'.section.lead',
				TweenMax.to($('.section.lead'), .5, {css:{backgroundSize:'120%'}}),
				fullHeight,
				0
			);*/

			controller.addTween(
				'.section.beginning',
				TweenMax.to($('.section.beginning'), 4, {css:{backgroundPosition:'0 200%'}, ease:Power0.easeIn, repeat:-1, repeatDelay:-1}),
				0,
				0
			);

			controller.addTween(
				'.section.dating',
				TweenMax.to($('.grounds'), 4, {css:{bottom:'800px'}, ease:Power0.easeIn}),
				fullHeight,
				0
			);

			controller.addTween(
				'.section.dating',
				TweenMax.to($('.dublin'), 4, {css:{bottom:'800px'}, ease:Power0.easeIn}),
				fullHeight,
				240
			);

			controller.addTween(
				'.section.dating',
				TweenMax.to($('.welch'), 4, {css:{bottom:'800px'}, ease:Power0.easeIn}),
				fullHeight,
				360
			);
		},

		infoMenu: function () {
			$('.info').on("click", function(){
				if ( $(this).hasClass('open') ) {
					$('.popout').hide();
					$('.scroll ul').animate({
						width: '55px'
					}, 600);
					$(this).removeClass('open');
				} else {
					$('.scroll ul').animate({
						width: '222px'
					}, 600, function(){ $('.popout').show(); });
					$(this).addClass('open');
				}
			});

			$('.popout').on("click", function(){
				$('.popout').hide();
				$('.scroll ul').animate({
					width: '55px'
				}, 600);
				$('.info').removeClass('open');
			});
		}
	};

	$(window.document).ready(function () {
		window.Wedding.init();
	});
}());