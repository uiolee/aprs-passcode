const calcPass = (call: string) => {
	let code: number = 0;
	let i = 0;
	while (i < call.length) {
		code ^= (call.charCodeAt(i) << 8) ^ call.charCodeAt(i + 1);
		i += 2;
	}
	return (0x73e2 & 0x7fff) ^ code;
};

const cleanse = (inputValue: string) => {
	const idx = inputValue.indexOf('-');
	return inputValue
		.substring(0, idx > 0 ? idx : undefined)
		.toUpperCase()
		.replace(/[\s]+/g, '');
};

const getSearchParams = (key: string) => {
	const url = new URL(location.href);
	return url.searchParams.get(key);
};

export { calcPass, cleanse, getSearchParams };
