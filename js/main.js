document.addEventListener('DOMContentLoaded', () => {
	const openBtns = document.querySelectorAll('.js-open-burger');
	const closeBtns = document.querySelectorAll('.js-close-burger');
	const burgerMenu = document.querySelector('.burger-menu');

	function showBurger() {
		openBtns.forEach((btn) => btn.classList.add('hide'));
		closeBtns.forEach((btn) => btn.classList.remove('hide'));
		burgerMenu.classList.add('burger-menu_active');
	}

	function closeBurger() {
		openBtns.forEach((btn) => btn.classList.remove('hide'));
		closeBtns.forEach((btn) => btn.classList.add('hide'));
		burgerMenu.classList.remove('burger-menu_active');
	}

	openBtns.forEach((btn) => btn.addEventListener('click', showBurger));
	closeBtns.forEach((btn) => btn.addEventListener('click', closeBurger));

	const popup = document.querySelector('.popup');
	const openButtons = document.querySelectorAll('.js-callback');
	const closeButtons = document.querySelectorAll('.js-popup-close');

	function openPopup() {
		popup.classList.remove('hide');
		popup.classList.add('popup_active');
	}

	function closePopup() {
		popup.classList.add('hide');
		popup.classList.remove('popup_active');
	}

	openButtons.forEach((btn) => {
		btn.addEventListener('click', openPopup);
	});

	closeButtons.forEach((btn) => {
		btn.addEventListener('click', closePopup);
	});

	const form = document.querySelector('.popup-form');
	const nameInput = form.querySelector('#user-name');
	const phoneInput = form.querySelector('#user-phone');

	function formatPhone(value) {
		let digits = value.replace(/\D/g, '');
		if (digits.startsWith('8') || digits.startsWith('7')) {
			digits = digits.substring(1);
		}
		digits = digits.substring(0, 10);
		const parts = [];
		if (digits.length > 0) parts.push(digits.substring(0, 3));
		if (digits.length >= 4) parts.push(digits.substring(3, 6));
		if (digits.length >= 7) parts.push(digits.substring(6, 8));
		if (digits.length >= 9) parts.push(digits.substring(8, 10));
		return '+7 ' + parts.join(' ');
	}

	phoneInput.addEventListener('input', (e) => {
		const formatted = formatPhone(e.target.value);
		e.target.value = formatted;
		e.target.classList.remove('popup-form__input_error');
	});

	nameInput.addEventListener('input', () => {
		nameInput.classList.remove('popup-form__input_error');
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let valid = true;

		if (nameInput.value.trim().length < 2) {
			nameInput.classList.add('popup-form__input_error');
			valid = false;
		}

		const digitsCount = phoneInput.value.replace(/\D/g, '').length;
		if (digitsCount < 11) {
			phoneInput.classList.add('popup-form__input_error');
			valid = false;
		}

		if (!valid) {
			return;
		}

		const formData = new FormData(form);
		fetch(form.action, {
			method: 'POST',
			body: formData,
		})
			.then((res) => {
				if (!res.ok) throw new Error('Error');
				return res.json();
			})
			.then((data) => {
				console.log('Успешно отправлено:', data);
			})
			.catch((err) => {
				console.error('Ошибка отправки формы:', err);
			});
	});
});
