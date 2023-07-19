import { useCallback, useState } from "react";

const useLors = () => {
	const [isLoading, setIsLoading] = useState(true);

	const loadLors = useCallback(async () => {
		setIsLoading(true);
		const response = await fetch("/api/getLors", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			const txt = await response.json();
			throw new Error(txt);
		}
		const data = await response.json();
		return data;
	}, []);

	return { loadLors, isLoading };
};

export default useLors;
