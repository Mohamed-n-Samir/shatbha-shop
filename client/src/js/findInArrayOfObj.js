import i18next from "i18next";

function findInArrayOfObj(array, key, value) {
	if(!array) return null;
	return array.find((item) => item[key] === value) || null;
}

function formatDate(dateString) {
	const lang = i18next.language === "en" ? "en-US" : "ar-EG";
	if (dateString) {
		const date = new Date(parseInt(dateString));
		const formattedDate = date.toLocaleDateString(lang , {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
		return `${formattedDate}`;
	} else {
		return "";
	}
}

export {findInArrayOfObj,formatDate};