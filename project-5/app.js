
let div = null;

window.onload = () => {
	main();
};

function main() {
	const root = document.getElementById('root');
	const output = document.getElementById('output');
	const changeBtn = document.getElementById('change-btn');
	const copyBtn = document.getElementById('copy-btn');

	changeBtn.addEventListener('click', function () {
		const bgColor = generateHexColor();
		root.style.backgroundColor = bgColor;
		output.value = bgColor;
	});

	copyBtn.addEventListener('click', function () {
		if (div !== null) {
			div.remove();
			div = null;
		}
		if (isValidHex(output.value)) {
			navigator.clipboard.writeText(output.value);
			generateToastMessage(`${output.value} copied`);
		} else {
			alert('Invalid Color Code');
		}
	});

	output.addEventListener('keyup', function (e) {
		const color = e.target.value;
		if (color && isValidHex(color)) {
			root.style.backgroundColor = color;
		}
	});
}


function generateHexColor() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

function generateToastMessage(msg) {
	div = document.createElement('div');
	div.innerText = msg;
	div.className = 'toast-message toast-message-slide-in';

	div.addEventListener('click', function () {
		div.classList.remove('toast-message-slide-in');
		div.classList.add('toast-message-slide-out');

		div.addEventListener('animationend', function () {
			div.remove();
			div = null;
		});
	});

	document.body.appendChild(div);
}

/**
 * @param {string} color : ;
 */
function isValidHex(color) {
	if (color.length !== 7) return false;
	if (color[0] !== '#') return false;

	color = color.substring(1);
	return /^[0-9A-Fa-f]{6}$/i.test(color);
}
