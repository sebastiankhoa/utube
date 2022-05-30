export const format = (seconds) => {
	if (isNaN(seconds)) {
		return "00:00";
	}

	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes();
	const ss = date.getUTCSeconds().toString().padStart(2, "0");

	if (hh) {
		return `${hh}:${mm.toString().padStart(2, "0")} : ${ss}`;
		// 01:02:32
	}

	return `${mm}:${ss}`;
	// 02:35
};
