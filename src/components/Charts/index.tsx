import { FC, useState, useEffect, useRef, useLayoutEffect } from "react";
import classNames from "classnames";
import { data, data2 } from "./BarplotBasic/data";
import { Barplot } from "./BarplotBasic/Barplot";
import { useDimensions } from "@lib/hooks/use-dimensions";
import { MixedArray } from "@common/interfaces";
import { getIdsOrData } from "@lib/getIdsOrData";

export interface ChartsType {
	allFilter: MixedArray;
}

async function getChartData(allFilter) {
	let aggregation = "sumByBranch";
	const data = await getIdsOrData(...allFilter, false, aggregation); // false for csv
	console.log("LLLLL", data);
}

export const Charts: FC<ChartsType> = ({ allFilter }) => {
	const [chartData, setChartData] =
		useState<{ name: string; value: number }[]>(data);
	const [chartReady, setChartReady] = useState(false);

	const chartRef = useRef<HTMLDivElement>(null);
	const [chartSize, setChartSize] = useState(data);

	// useEffect(() => {
	// 	setChartData(data);
	// }, [chartSize]);

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				if (entry.target === chartRef.current) {
					const dimensions = {
						width: entry.contentRect.width,
						height: entry.contentRect.height,
					};
					setChartSize(dimensions);
				}
			}
		});

		if (chartRef.current) {
			observer.observe(chartRef.current);
		}

		return () => {
			if (chartRef.current) {
				observer.unobserve(chartRef.current);
			}
		};
	}, []);

	function loadData1() {
		setChartData(data);
	}

	function loadData2() {
		setChartData(data2);
	}
	return (
		<>
			<div className="mt-4">
				<button
					className="btn-primary btn-sm btn mr-1 text-white"
					onClick={loadData1}
				>
					Branchentyp Verteilung
				</button>{" "}
				<button
					className="btn-primary btn-sm btn mr-1 mt-2 text-white"
					onClick={loadData2}
				>
					Andere Verteilung
				</button>
			</div>
			<div
				style={{ height: "400px", width: "100%" }} // height: 400,
				ref={chartRef}
				className="pointer-events-auto"
			>
				<Barplot
					data={chartData}
					width={chartSize.width}
					height={chartSize.height}
				/>
			</div>
		</>
	);
};
