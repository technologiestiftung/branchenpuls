export async function getSinglePointData(pointId, position) {
  let data;
  try {
    const path = `/api/getsinglepointdata/?pointid=${pointId}&lng=${
      position[0] + "&lat=" + position[1]
    }`;
    let res;
    if (process.env.NODE_ENV === "development") {
      res = await fetch(path, { cache: "no-store" });
    } else {
      res = await fetch(path);
    }
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error(error);
  } finally {
    const popupData = {
      position: position,
      info: data.data,
    };
    alert(JSON.stringify(popupData));
    // setSelectedPoint(popupData);
  }
}
