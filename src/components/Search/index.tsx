import { FC, useState, useEffect } from "react";
import classNames from "classnames";
export interface SearchType {}

import {
	SearchResultType,
	useGeocodedPlace,
} from "@lib/hooks/useGeocodedPlace";
import { useDebounce } from "use-debounce";
import { GeoMarker } from "@components/Icons";

interface SearchResultItemPropType extends SearchResultType {
	searchTerm: string;
	onClick: () => void;
}

const SearchResultItem: FC<SearchResultItemPropType> = ({
	name,
	searchTerm,
	onClick,
}) => {
	const indexOfTerm = name.toLowerCase().indexOf(searchTerm.toLowerCase());
	const before = name.slice(0, indexOfTerm);
	const after = name.slice(indexOfTerm + searchTerm.length, name.length);
	return (
		<button
			onClick={onClick}
			className={classNames(
				"flex w-full items-center pt-3 text-left",
				"-ml-4 rounded px-4 transition hover:bg-gray-100",
				"group focus:outline-none focus:ring-2 focus:ring-gray-500",
				"relative focus:z-10 focus:ring-gray-500"
			)}
			style={{ width: "calc(100% + 32px)" }}
		>
			<span className="mr-2 -translate-y-2 transform text-gray-300">
				<GeoMarker />
			</span>
			<div
				className={classNames(
					"flex-grow border-b border-dashed border-gray-300 pb-2",
					"transition group-hover:border-opacity-0 group-focus:border-opacity-0"
				)}
			>
				<h6 className="text-sm leading-4">
					{indexOfTerm === -1 ? (
						name
					) : (
						<>
							{before}
							<span className="text-light text-gray-400">{searchTerm}</span>
							{after}
						</>
					)}
				</h6>
			</div>
		</button>
	);
};

export interface SearchType {
	setMapCenter: (center: number[] | null) => void;
}

export const Search: FC<SearchType> = ({ setMapCenter }) => {
	const [inputVal, setInputVal] = useState("");
	const [debouncedInputValue] = useDebounce(inputVal, 700);

	const { results } = useGeocodedPlace(debouncedInputValue);

	const clickHandler = function (d: any) {
		setMapCenter([Number(d[1]), Number(d[0])]);
	};

	console.log(debouncedInputValue);

	useEffect(() => {
		if (!debouncedInputValue) {
			setMapCenter(null);
		}
	}, [debouncedInputValue]);

	return (
		<>
			<input
				type="text"
				placeholder="Gib hier einen Ort an"
				value={inputVal}
				onChange={(evt) => setInputVal(evt.target.value)}
				className={classNames(
					"block w-full rounded border border-gray-400 px-3 py-2",
					"my-4 focus:outline-none focus:ring-2 focus:ring-primary",
					"focus:ring-offset-2 focus:ring-offset-white"
				)}
			/>

			{results && (
				<ul>
					{results.map((item) => (
						<li key={`${item.id}`}>
							<SearchResultItem
								{...item}
								searchTerm={inputVal}
								onClick={() => clickHandler([item.latitude, item.longitude])}
							/>
						</li>
					))}
				</ul>
			)}
		</>
	);
};
