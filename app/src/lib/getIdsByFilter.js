export async function getIdsByFilter(
  dataPointsIndexed,
  age,
  employees,
  filterValBL3,
  filterBType
) {
  // make all default val null
  const sendFilterValBL3 = filterValBL3?.value ? filterValBL3.value : false;
  const sendEmployees = employees?.value ? employees.value : false;
  const sendBType = filterBType !== null ? filterBType.value : false;
  const sendAge = age[0] === 0 && age[1] === 100 ? false : age;

  let path = "/api/getIds/?";
  path += sendAge ? `&age=${sendAge}` : "";
  path += sendEmployees ? `&employees=${sendEmployees}` : "";
  path += sendFilterValBL3 ? `&bl3=${sendFilterValBL3}` : "";
  path += sendBType !== false ? `&bt=${sendBType}` : "";

  console.log(path);

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
