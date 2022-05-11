let div = null;

window.onload = () => {
	main();
};


function main() {
	const root = document.getElementById('root');
	const output = document.getElementById('output');
	const output2 = document.getElementById('output2');
	const changeBtn = document.getElementById('change-btn');
	const copyBtn = document.getElementById('copy-btn');

	changeBtn.addEventListener('click', function () {
		const color = generateColorDecimal();
		const hex = generateHexColor(color);
		const rgb = generateRGBColor(color);
		root.style.backgroundColor = hex;
		output.value = hex.substring(1);
		output2.value = rgb;
	});

	copyBtn.addEventListener('click', function () {
		navigator.clipboard.writeText(`#${output.value}`);
		if (div !== null) {
			div.remove();
			div = null;
		}
		if (isValidHex(output.value)) {
			generateToastMessage(`#${output.value} copied`);
		} else {
			alert('Invalid Color Code');
		}
	});

	output.addEventListener('keyup', function (e) {
		const color = e.target.value;
		if (color) {
			output.value = color.toUpperCase();
			if (isValidHex(color)) {
				root.style.backgroundColor = `#${color}`;
			}
		}
	});
}


function generateColorDecimal() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return {
		red,
		green,
		blue,
	};
}

function generateHexColor({ red, green, blue }) {
	const getTwoCode = (value) => {
		const hex = value.toString(16);
		return hex.length === 1 ? `0${hex}` : hex;
	};

	return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
		blue
	)}`.toUpperCase();
}

function generateRGBColor({ red, green, blue }) {
	return `rgb(${red}, ${green}, ${blue})`;
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
	if (color.length !== 6) return false;
	return /^[0-9A-Fa-f]{6}$/i.test(color);
}
