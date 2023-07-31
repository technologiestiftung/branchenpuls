export async function getOptionsDates() {
	let data;
	try {
		let res;
		if (process.env.NODE_ENV === "development") {
			res = await fetch("/api/getexistingmonths/?", { cache: "no-store" });
		} else {
			res = await fetch("/api/getexistingmonths/?");
		}
		console.log(res);
		if (res.ok) {
			data = await res.json();
			data = data
				.map((d) => d.tablename.replace("state_", "").split("_"))
				.map((d) => [Number(d[0]), Number(d[1])]);
			console.log("datadatadata", data);
		}
	} catch (error) {
		console.error(error);
	} finally {
		console.log(data);
		return data;
	}
}
