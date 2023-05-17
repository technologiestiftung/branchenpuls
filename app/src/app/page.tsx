// import path from "path";
import { App } from "@components/App";

async function getPoints() {
  const devMode = process.env.NODE_ENV === "development";
  const path = devMode
    ? "http://localhost:3000/data.json"
    : "https://ihk-vis.netlify.app/data.json";

  let fetchConfig = {};
  if (devMode) {
    fetchConfig.cache = "no-store";
  }
  let res = await fetch(path, fetchConfig);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const dataPoints = await getPoints();
  return <App dataPoints={dataPoints}></App>;
}
