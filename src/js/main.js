import autosize from 'autosize';
import $ from 'jquery';

//Dropdown
$('.dropdown__elem').on('click', function(){
	//Find dropdown elem
	let dropdown = this.closest('.dropdown');

	//Toggle state
	if(!$(dropdown).hasClass('active')){
		$('.dropdown').removeClass('active');
		$(dropdown).addClass('active');
	}
	else {
		$(dropdown).removeClass('active');
	}
});

//Burger
$('.burger').on('click', function(){
	$(this).toggleClass('active');

	$('.header__links').toggleClass('active');
});

//Change account create status
$('#create').on('change', function(){
	if(this.checked) {
		$('#createForm').removeClass('hidden');
	}
	else {
		$('#createForm').addClass('hidden');
	}
});

//Change active payment
$('[name="payment"]').on('click', function(){
	$('.payment__content').addClass('hidden');

	$(this).closest('.payment__type').find('.payment__content')
		.removeClass('hidden');
});

$('.goods__categories-title').on('click', function () {
	$(this).parent().toggleClass('active');
});


//Range
$('.goods__price-point').on('dragstart', () => false);

$('.goods__price-point').on('mousedown', function (event) {
	let elem = event.target,
		indicator = document.querySelector('.goods__price-indicator'),
		isRight = elem.classList.contains('right'),
		leftRect = document.querySelector('.goods__price-point.left')
			.getBoundingClientRect(),
		rightRect = document.querySelector('.goods__price-point.right')
			.getBoundingClientRect(),
		parentRect = elem.parentElement.getBoundingClientRect();

	function handler(event) {
		if(isRight && (event.clientX > parentRect.right
			|| event.clientX - leftRect.right <= 100 )){
			return;
		}

		if(!isRight && (event.clientX <= parentRect.left
			|| event.clientX - rightRect.left >= -100 )){
			return;
		}

		elem.style.left = `${event.clientX - parentRect.left}px`;

		if(isRight){
			indicator.style.right = parentRect.width - parseInt(elem
				.style.left) + 'px';
		}
		else{
			indicator.style.left = elem.style.left;
		}
	}

	$('body').on('mousemove', handler);

	$('body').on('mouseup', function () {
		$('body').off('mousemove', handler);
	});
});

autosize(document.getElementById('message'));

//tabs
$('.tabs__item').on('click', (e) => {
	e.preventDefault();

	if($(e.target).hasClass('tabs__item_active')){
		return;
	}

	$('.tabs__item_active').removeClass('tabs__item_active');
	$(e.target).addClass('tabs__item_active');

	let targetContent = $(e.target).attr('href');
	$('.tabs__content-item_active').removeClass('tabs__content-item_active');
	$(targetContent).addClass('tabs__content-item_active');
});
