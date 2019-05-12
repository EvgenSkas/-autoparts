$(document).ready(function () {

	//Проверка поля при фокусе
	$('.input').focus(function () {
		inputCheck();
	});

	//Проверка поля после снятия с него фокуса
	$('.input').blur(function () {
		inputCheck();
	});

	//Функция проверки поля формы на заполненность
	var inputCheck = function () {
		$('.input').change(function () {

			if ($(this).val() != '') {
				$(this).siblings('.input-label').addClass('remove');
			} else {
				$(this).siblings('.input-label').removeClass('remove');
			}
		});
	};

	inputCheck();

	//Подставляем значение ссылок в атрибут, для звонка
	setTimeout(function () {
		$('.js-phone-link').each(function () {
			var phoneUnreplaced = $(this).text();
			var phone = $(this).text().replace(/[^0-9.]/g, '');

			$(this).attr('href', 'tel:+' + phone);
			$('.js-phone-label').text(phoneUnreplaced);
		});
	}, 500);

	//Вставляем подменный номер в скрытую кнопку для мобильных устройств
	setTimeout(function () {
		var button = $('a.mobile-show');
		var phone = $('.header__phone').text().replace(/[^0-9.]/g, '');

		button.attr('href', 'tel:+' + phone);
	}, 700);

	//Всплывающая форма
	$('[data-fancybox]').fancybox({
		smallBtn: true,
		trapFocus: false,
		toolbar: false,
		autoFocus: false,
		infobar: false
	});

	$('.form__close').click(function () {
		$.fancybox.close(true);
	});

	//Маска для номеров телефонов
	var phoneMask = "+7 (999) 999-99-99";

	// if ($('#main-phone') || $('#form-phone') || $('#leave-phone') || $('#brand-phone')) {
	// 	$("#main-phone").mask(phoneMask);
	// 	$("#form-phone").mask(phoneMask);
	// 	$("#leave-phone").mask(phoneMask);
	// 	// $("#brand-phone").mask(phoneMask);
	// }

	if ($('#for-mobile-button').length > 0) {
		//При скролле на мобильном устройстве, показывать/скрывать кнопки звонка и заявки
		$(window).on('load resize', function () {
			if ($(window).width() < 768) {
				$('.header__button-wrapper').addClass('header__button-wrapper--mobile');
				$('.header__button--white').text('Оставить заявку');
			} else {
				$('.header__button-wrapper').removeClass('header__button-wrapper--mobile');
				$('.header__button--white').text('Заказать запчасти');
			}
		});

		var $requestBlock1 = $('#for-mobile-button'),
			requestBlockHeight1 = $requestBlock1.height(),
			requestBlockOffset1 = $requestBlock1.offset(),
			windowHeight1 = $(window).height();

		$(window).on('scroll load resize', function () {
			if ($(this).scrollTop() + windowHeight1 < (requestBlockOffset1.top) || $(this).scrollTop() > requestBlockOffset1.top + requestBlockHeight1) {
				$('.header__button-wrapper--mobile').css({'opacity':'1'});
			}
			else {
				$('.header__button-wrapper--mobile').css({'opacity':'0'});
			}
		});
	}

	if ($('.brand__form-submit').length > 0) {
		//При скролле на мобильном устройстве, показывать/скрывать кнопки звонка и заявки
		$(window).on('load resize', function () {
			if ($(window).width() < 768) {
				$('.header__button-wrapper').addClass('header__button-wrapper--mobile');
				$('.header__button--white').text('Оставить заявку');
			} else {
				$('.header__button-wrapper').removeClass('header__button-wrapper--mobile');
				$('.header__button--white').text('Заказать запчасти');
			}
		});

		var $requestBlock = $('.brand__form-submit'),
			requestBlockHeight = $requestBlock.height(),
			requestBlockOffset = $requestBlock.offset(),
			windowHeight = $(window).height();

		$(window).on('scroll load resize', function () {
			if ($(this).scrollTop() + windowHeight < (requestBlockOffset.top) || $(this).scrollTop() > requestBlockOffset.top + requestBlockHeight) {
				$('.header__button-wrapper--mobile').css({'opacity':'1'});
			}
			else {
				$('.header__button-wrapper--mobile').css({'opacity':'0'});
			}
		});
	}

	//Проверка обязательного для заполнения поля формы
	$('input[type="submit"]').click(function () {
		var field = $(this).parent('form').find('.required');
		var fieldValue = $(this).parent('form').find('.required').val().length;

		if (fieldValue > 0 && fieldValue < phoneMask.length) {
			$(field).addClass('error');
		}
	});

	$('.required').focusout(function () {
		$(this).removeClass('error');
	});

	//Рандомное число заказов
	var orders = function (day, month) {
		var day = day;
		var month = month;
		var daysArray = [0, 40, 44, 42, 43, 41, 42, 47, 48, 42, 49, 40, 45, 44, 46, 47, 41, 48, 43, 41, 49, 42, 45, 46, 41, 48, 43, 47, 44, 42, 45, 48];
		var ordersNumber = 0;

		ordersNumber = Math.floor(daysArray[day] * 2.75);

		return ordersNumber;
	};

	//Выводим вчерашнюю дату

	//Считаем сколько дней было в месяце
	function daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}

	//Вычисляем дату и ставим вчерашний день
	var setDate = function () {
		var newDate = new Date();
		var currentYear = newDate.getFullYear();
		var currentMonth = newDate.getMonth();
		var currentDate = newDate.getDate();
		var monthArray = [' января', ' февраля', ' марта', ' апреля', ' мая', ' июня', ' июля', ' августа', ' сентября', ' октября', ' ноября', ' декабря']

		//Если сегодня 1-е число, то выставляем последний день предыдущего месяца
		if (currentDate == 1) {
			$('.js-tomorrow-date').text(daysInMonth(currentYear, currentMonth - 1) + monthArray[currentMonth - 1]);
		} else {
			//Если не 1-е число, то из текущего дня вычитаем 1 и подставляем текущий месяц
			$('.js-tomorrow-date').text(currentDate - 1 + monthArray[currentMonth]);
		}

		$('.js-order-numbers').text(orders(currentDate, currentMonth));
	};

	setDate();

	// //Яндекс карта в подвале
	// ymaps.ready(init);
	// var myMap,
	// 	myPlacemark;

	// function init() {
	// 	myMap = new ymaps.Map("map", {
	// 		center: [55.705221, 37.841641],
	// 		zoom: 15
	// 	});

	// 	myPlacemark = new ymaps.Placemark([55.705221, 37.841641], {
	// 		hintContent: 'Горячие запчасти',
	// 		balloonContent: 'ул. Привольная, д. 2, стр. 9'
	// 	}, {
	// 		iconLayout: 'default#image',
	// 		iconImageHref: '/pic/design/marker2.png',
	// 		iconImageSize: [60, 60],
	// 		iconImageOffset: [-30, -60]
	// 	});

	// 	myMap.geoObjects.add(myPlacemark);
	// 	myMap.behaviors.disable('scrollZoom');
	// 	myMap.controls.remove('searchControl');
	// }

	//Подменю
	var submenu = function () {
		var $root = $('html, body');
		var $link = $('.header__submenu-link');
		var $submenuItem = $('.header__submenu-item');
		var activeClass= 'header__submenu-item--active';

		$link.on('click', function() {
			$root.animate({
				scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 500);

			$submenuItem.removeClass(activeClass);
			$(this).closest($submenuItem).addClass(activeClass);

			$('.header__menu-icon').removeClass('active');
			$('.header__submenu').removeClass('active');
			$('body').css({'overflow':'visible'});

			return true;
		});
	};

	submenu();

	var submenuIcon = function() {
		var icon = $('.header__menu-icon');

		$(icon).click(function() {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('.header__submenu').removeClass('active');
				$('body').css({'overflow':'visible'});
				$('html').css({'overflow':'visible', 'height': 'auto', 'position':'static'});
				$('.mobile-shadow').css({'height':'0', 'display':'none', 'opacity':'0'});
				$('.header__button-wrapper--mobile').show();
			} else {
				$(this).addClass('active');
				$('.header__submenu').addClass('active');
				$('body').css({'overflow':'hidden'});
				$('html').css({'overflow':'hidden', 'height': '100%', 'position':'relative'});
				$('.mobile-shadow').css({'height':'100%', 'display':'block', 'opacity':'1'});
				$('.header__button-wrapper--mobile').hide();
			}
		});
	};

	submenuIcon();

	//Запись данных в sessionStorage
	var writeToStorage = function(input) {
		var $button = $('.form__submit');
		var $orderInput = input;

		$button.on('click', function() {
			localStorage.setItem('order', '' + $orderInput.val());
		});
	};

	writeToStorage($('#main-order'));
	writeToStorage($('#form-order'));

	//На странице подтверждения заказа выводим текст заказа
	if ($('.success__order-text').length > 0) {
		$('.success__order-text').html(localStorage.getItem('order'));
	}

	//Делаем кнопку заказа, на странице подтверждения заказа, неактивной
	var inactive = function() {
		var pageURL = window.location.pathname;

		if (pageURL === '/send.html') {
			$('.header__button--white').attr('disabled', true).addClass('inactive');
		}
	};

	inactive();

	//Снимаем неактивность с кнопки заказа
	var active = function() {
		var pageURL = window.location.pathname;

		if (pageURL === '/send.html') {
			$('.header__button--white').attr('disabled', false).removeClass('inactive');
		}
	};

	//Таймер на 15 секунд
	setTimeout(function() {active()}, 15000);

	//Перестраиваем порядок элементов в блоке с контактами
	var contactBlock = function() {
		var windowWidth = $(window).width();

		if (windowWidth < 768) {
			$('.order__half--left').append($('.order__half--right'));
		} else {
			$('.container.order').append($('.order__half--right'));
		}
	};
	$(window).on('resize', function() {
		contactBlock();
	});

	contactBlock();

	//3 шага в слайдер
	var slider = function() {
		$('.steps__list').slick({
			autoplay: false,
			infinite: true,
			arrows: false,
			dots: true,
			fade: true
		});
	};

	if ($('.steps__list').length > 0 && $(window).width() <= 767) {
		slider();

		$(window).resize(function() {
			if ($(window).width() <= 767 ) {
				slider();
			} else {
				$('.steps__list').slick('unslick');
			}
		});
	}

	//Политика конфеденциальности в модальном окне
	var formAgreement = function() {
		var agreementLink = $('.js-form-agreement');
		var agreementContainer = $('.form__agreement-wrapper');
		var formContainer = $('.form__inner-wrapper');
		var agreementButton = $('.form__agreement-back-button-wrapper');
		var agreementClose = $('#order-form .fancybox-close-small');

		agreementLink.on('click', function() {
			agreementContainer.toggle();
			formContainer.toggle();
			agreementButton.css({'display':'flex'});
		});

		agreementButton.on('click', function() {
			agreementContainer.toggle();
			formContainer.toggle();
			$(this).css({'display':'none'});
		});

		agreementClose.on('click', function() {
			if (agreementContainer.css('display') === 'block') {
				agreementContainer.toggle();
			} else {
				formContainer.toggle();
			}
		});
	};

	formAgreement();

	var formAgreementClose = function() {
		$('.header__button--white').on('click', function() {
			var agreementContainer = $('.form__agreement-wrapper');
			var agreementButton = $('.form__agreement-back-button-wrapper');
			var formContainer = $('.form__inner-wrapper');

			agreementContainer.hide();
			agreementButton.hide();
			formContainer.show();
		})
	};

	formAgreementClose();

	//Custom scrollbar
	var customScroll = function() {
		var container = $('.agreement__scroll-container');

		var ps = new PerfectScrollbar('.agreement__scroll-container', {
			wheelSpeed: 2,
			wheelPropagation: true,
			minScrollbarLength: 20
		});
	};

	customScroll();

	//Поведение подменю при скролле
	var submenuScroll = function() {
		var didScroll;
		var lastScrollTop = 0;
		var delta = 60;
		var navbarHeight = $('header').outerHeight();

		$(window).scroll(function(event){
			didScroll = true;
		});

		setInterval(function() {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 250);

		function hasScrolled() {
			var st = $(this).scrollTop();

			// Проверяем, что скролл больше нашей дельты
			if(Math.abs(lastScrollTop - st) <= delta)
				return;

			// If they scrolled down and are past the navbar, add class .nav-up.
			// This is necessary so you never see what is "behind" the navbar.
			if (st > lastScrollTop && st > navbarHeight){
				// Скроллим вниз
				$('.header').addClass('js-submenu');
				$('.container.submenu').addClass('js-submenu');
			} else {
				// Скроллим вверх
				if(st + $(window).height() < $(document).height()) {
					$('header').removeClass('js-submenu');
					$('.container.submenu').removeClass('js-submenu');
				}
			}

			lastScrollTop = st;
		}
	};

	if ($(window).width() > 767) {
		submenuScroll();
	}

	// Смена целей для метрики
	function targetChange() {
		var formButton = $('#main-form .form__submit');
		var brandFormButton = $('.brand__form-submit');
		var width = $(window).width();

		if (width < 784) {
			formButton.attr('onclick', 'yaCounter44868019.reachGoal(\'click4\'); return true;');
			brandFormButton.attr('onclick', 'yaCounter44868019.reachGoal(\'click4\'); return true;');
		} else {
			formButton.attr('onclick', 'yaCounter44868019.reachGoal(\'click2\'); return true;');
			brandFormButton.attr('onclick', 'yaCounter44868019.reachGoal(\'click2\'); return true;');
		}
	}

	targetChange();

	$(window).on('resize', function() {
		targetChange();
	});

	// function checkFancybox() {
	// 	if ($('#leave-form').css('display') === 'inline-block') {
	// 		return $.fancybox.destroy();
	// 	} else {
	// 		return true;
	// 	}
	// }
	//
	// if ($('#leave-form').length > 0) {
	// 	$(document).mouseleave(function(e){
	// 		var leaveSessionKey = (sessionStorage.getItem('leaveSession') === 'true');
	// 		var leaveLocalKey = (localStorage.getItem('leaveLocal') === 'true');
	//
	// 		if (e.clientY < 40 && leaveSessionKey) {
	// 			return false;
	// 		} else if (e.clientY < 40 && leaveLocalKey) {
	// 			return false;
	// 		} else if (e.clientY < 40 && !leaveSessionKey) {
	// 			$.fancybox.open(
	// 				{
	// 					onInit: checkFancybox(),
	// 					src  : '#leave-form',
	// 					loop : false
	// 			});
	//
	// 			ym(44868019, 'reachGoal', 'spec_form');
	//
	// 			$('#leave-form .fancybox-close-small').on('click', function() {
	// 				ym(44868019, 'reachGoal', 'close_spec_form');
	// 				sessionStorage.setItem('leaveSession', 'true');
	// 			});
	//
	// 			$('#leave-form .form__submit').on('click', function() {
	// 				ym(44868019, 'reachGoal', 'send_spec_form');
	// 				localStorage.setItem('leaveLocal', 'true');
	// 			});
	//
	// 			$('form').on('submit', function() {
	// 				localStorage.setItem('leaveLocal', 'true');
	// 			});
	// 		}
	// 	});
	// }
	//
	// $('form').on('submit', function() {
	// 	localStorage.setItem('leaveLocal', 'true');
	// });

	function setContentFromUrl() {
		if ($('.wrapper-container.brand')) {
			var url = window.location.href;
			//var title = decodeURI(url.slice(url.lastIndexOf('_') + 1));
			var stringBegin = url.indexOf('utm_term=');
			var title = url.slice(stringBegin);
			var stringEnd = title.indexOf('&');

			title = decodeURI(title.slice(9, stringEnd));

			if (stringBegin < 0) {
				$('.brand__title').html('Запчасти для KIA <br> по отличным ценам');

			} else {
				$('.brand__title').text(title);
				$('#brand-user-text').val(title);
			}
		}
	}

	setContentFromUrl();

	function setContentFromUrlToOld() {
		if ($('.first__info-wrapper .first__title')) {
			var url = window.location.href;
			//var title = decodeURI(url.slice(url.lastIndexOf('_') + 1));
			var stringBegin = url.indexOf('utm_term=');
			var title = url.slice(stringBegin);
			var stringEnd = title.indexOf('&');

			title = decodeURI(title.slice(9, stringEnd));

			if (stringBegin < 0) {
				$('.first__title').html('Хватит мучаться!');
			} else {
				$('.first__title').text(title);
				$('#main-order').val(title);
			}
		}
	}
  console.log('hip', $("#main-phone"), $("#form-phone"), $("#leave-phone"), $("#brand-phone"))

  setContentFromUrlToOld();
});