export async function getIdsByFilter(
  dataPointsIndexed,
  age,
  employees,
  filterBType,
  filterValBL1,
  filterValBL2,
  filterValBL3
) {
  // make all default val null
  const sendFilterValBL1 = filterValBL1?.value ? filterValBL1.value : false;
  const sendFilterValBL2 = filterValBL2?.value ? filterValBL2.value : false;
  const sendFilterValBL3 = filterValBL3?.value ? filterValBL3.value : false;

  const sendEmployees = !isNaN(parseFloat(employees?.value))
    ? employees.value
    : false;

  console.log("ÄÄÄssssss", sendEmployees);
  const sendBType = filterBType !== null ? filterBType.value : false;
  const sendStart = age[0] === 0 && age[1] === 100 ? false : age[0];
  const sendEnd = age[0] === 0 && age[1] === 100 ? false : age[1];

  let path = "/api/getIds/?";
  path += sendStart ? `&start=${sendStart}` : "";
  path += sendEnd ? `&end=${sendEnd}` : "";
  path += !isNaN(parseFloat(sendEmployees))
    ? `&employees=${sendEmployees}`
    : "";
  path += sendFilterValBL1 ? `&bl1=${sendFilterValBL1}` : "";
  path += sendFilterValBL2 ? `&bl2=${sendFilterValBL2}` : "";
  path += sendFilterValBL3 ? `&bl3=${sendFilterValBL3}` : "";
  path += sendBType !== false ? `&bt=${sendBType}` : "";
  // path += "&ids=1&ids=2&ids=3&ids=4&ids=5";

  console.log("path: ", path);

  const newData = [];
  try {
    let res;
    if (process.env.NODE_ENV === "development") {
      res = await fetch(path, { cache: "no-store" });
    } else {
      res = await fetch(path);
    }

    if (res.ok) {
      const data = await res.json();

      data.ids.forEach((d) => {
        newData.push(dataPointsIndexed[d]);
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    return newData;
  }
}
