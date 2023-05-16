import { MapComponent } from "@components/map/Map";
// import path from "path";

async function getPoints() {
  const path =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/data.json"
      : "https://ihk-vis.netlify.app/data.json";

  let res;
  if (process.env.NODE_ENV === "development") {
    res = await fetch(path, { cache: "no-store" });
  } else {
    res = await fetch(path);
  }
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const points = await getPoints();

  return (
    <main className="">
      <MapComponent dataPoints={points}></MapComponent>
    </main>
  );
}
