export function calculateHeatmapOpacity(zoom) {
	if (zoom <= 10) {
		return 0.6;
	} else if (zoom >= 15) {
		return 0;
	} else {
		const m = (0 - 0.6) / (15 - 10); // Calculate the slope
		const b = 0.6 - m * 10; // Calculate the y-intercept
		return m * zoom + b; // Apply linear regression equation
	}
}
