export interface ViewStateType {
	longitude: number;
	latitude: number;
	zoom: number;
	pitch: number;
	bearing: number;
	transitionDuration: number;
}

export interface StringSelection {
	value: string;
	label: string;
}

export interface LayerDataType {
	[key: string]: {
		id?: string;
		color?: string;
		colorHex?: string;
		count?: number;
		heatmapColor?: string;
		heatmap?: boolean;
	};
}
