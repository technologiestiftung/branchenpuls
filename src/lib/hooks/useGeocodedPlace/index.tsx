import useSWR from "swr";

interface RawSearchResultType {
	osm_id: number;
	display_name: string;
	lat: number;
	lon: number;
}

export interface SearchResultType {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
}

const mapRawResults = (rawResults: RawSearchResultType[]): SearchResultType[] =>
	rawResults.map(({ osm_id, display_name, lat, lon }) => ({
		id: osm_id,
		name: display_name,
		latitude: lat,
		longitude: lon,
	}));

const fetchSearch = async (searchTerm: string): Promise<SearchResultType[]> => {
	if (searchTerm.length < 3) return [];
	const geocodingUrl = `https://nominatim.openstreetmap.org/search?viewbox=11.82,51.74,15.04,53.46&bounded=1&q=${searchTerm}&countrycodes=de&format=json`;
	const res = await fetch(geocodingUrl);

	if (!res.ok) return [];

	const json = (await res.json()) as { features: RawSearchResultType[] };
	// @ts-ignore
	return mapRawResults(json);
};

export const useGeocodedPlace = (
	searchTerm: string
): {
	results: SearchResultType[];
	error: Error | null;
} => {
	const { data: results, error } = useSWR<SearchResultType[], Error>(
		["sidebarSearch", searchTerm],
		() => fetchSearch(searchTerm)
	);

	return { results: results || [], error: error || null };
};
