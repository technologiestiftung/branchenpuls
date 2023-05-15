import { MapComponent } from "@components/map/Map";
import path from "path";

async function getPoints() {
  const filePath = "http://localhost:3000/data.json";
  const res = await fetch(filePath, { cache: "no-store" });
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
