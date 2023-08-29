export interface ViewStateType {
	longitude: number;
	latitude: number;
	zoom: number;
	pitch: number;
	bearing: number;
	transitionDuration: number;
}

export interface StringSelection {
	value: string | number;
	label: string;
	id: number;
	name: string;
}

export interface ArraySelection {
	value: any;
	label: string;
	id: number;
	name: number[];
}

export interface LayerDataType {
	[key: string]: {
		id?: string;
		color?: any;
		colorHex?: string;
		count?: number;
		heatmapColor?: any;
		heatmap?: boolean;
	};
}
