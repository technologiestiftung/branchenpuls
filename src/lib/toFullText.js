export function toFullText(text) {
	let updatedText = text
		.replace(/ u\. /g, " und ")
		.replace(/ v\. /g, " von ")
		.replace(/ f\. /g, " für ")
		.replace(/ m\. /g, " mit ")
		.replace(/H\. von/g, "Herstellung von")
		.replace('"EH', "EH")
		.replace("EH ", "Einzelhandel ")
		.replace("HV ", "Handelsvermittlung ");
	return updatedText;
}
