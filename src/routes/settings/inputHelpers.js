export function onlyNumber(e, max) {
	let val = e.target.value;
	let num = parseInt(val.replace(/[^0-9]/g, ''));

	if (val.toString().length > num.toString().length) return null;

	if (!val) return '';

	if (!isNaN(num) && num <= max) {
		return num;
	}
	return null;
}

export function handleNumericInput(e, max) {
	let num = onlyNumber(e, max);
	if (num !== null) {
		return { success: true, value: num };
	} else {
		return { success: false, value: e.target.value };
	}
}

export function normalize(value, min, max) {
	if (!value || value < min) return min;
	if (value > max) return max;
	return value;
}