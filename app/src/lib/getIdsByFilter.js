export async function getIdsByFilter(dataPointsIndexed, age) {
  console.log("JJJJJ");
  const newData = [];
  try {
    const path = `/api/getIds/?age=${age}&domain=s`;
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
