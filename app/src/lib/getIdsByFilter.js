export async function getIdsByFilter(
  dataPointsIndexed,
  age,
  employees,
  filterValBL3,
  filterBType
) {
  // make all default val null
  const sendFilterValBL3 = filterValBL3?.value ? filterValBL3.value : null;
  const sendEmployees = employees?.value ? employees.value : null;
  const sendBType = filterBType !== null ? filterBType.value : null;
  const sendAge = age[0] === 0 && age[1] === 100 ? null : age;

  const newData = [];
  try {
    const path = `/api/getIds/?age=${sendAge}&employees=${sendEmployees}&bl3=${sendFilterValBL3}&bt=${sendBType}`;
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
