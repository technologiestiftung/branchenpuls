export function getNextOrPreviousId(id, ids, option) {
	if (ids.length === 0) return null;

	const index = ids?.indexOf(id);
	if (index === -1) {
		return null;
	}

	if (option === "next") {
		if (index === ids.length - 1) {
			return ids[0];
		} else {
			return ids[index + 1];
		}
	} else {
		if (index === 0) {
			return ids[ids.length - 1];
		} else {
			return ids[index - 1];
		}
	}
}
