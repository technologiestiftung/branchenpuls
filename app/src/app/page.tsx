import { MapComponent } from "@components/map/Map";
import path from "path";

async function getPoints() {
  const filePath =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/data.json"
      : "https://ihk-vis.netlify.app/data.json";
  const res = await fetch(filePath);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  // console.log("ÄÄÄÄÄ", req);

  const points = await getPoints();

  return (
    <main className="">
      <MapComponent dataPoints={points}></MapComponent>
    </main>
  );
}
