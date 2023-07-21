export function calculatePointRadius(zoom) {
	if (zoom <= 10) {
		return 30;
	} else if (zoom >= 15) {
		return 5;
	} else {
		const m = (5 - 30) / (15 - 10); // Calculate the slope
		const b = 30 - m * 10; // Calculate the y-intercept
		return m * zoom + b; // Apply linear regression equation
	}
}
