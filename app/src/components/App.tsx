"use client";
import { FC, useState, useEffect } from "react";
import { MapComponent } from "@components/map/Map";

import { SidebarContentFilter } from "@components/Sidebar/content/SidebarContentFilter";
import { SidebarWrapper } from "@components/Sidebar/SidebarWrapper";
import { SidebarNav } from "@components/Sidebar/SidebarNav";
import { Info, Filter, Search } from "@components/Icons";

const navViews = [
  {
    value: "filter",
    name: "filter",
    icon: <Filter />,
    mobileHeight: "half",
  },
  //   {
  //     value: "info",
  //     name: "information",
  //     icon: <Info />,
  //     mobileHeight: "full",
  //   },
];

export interface AppType {
  dataPoints: any;
}

async function getPoints() {
  const devMode = process.env.NODE_ENV === "development";
  const path = devMode
    ? "http://localhost:3000/api/getStartIds/?"
    : "https://deploy-preview-5--ihk-vis.netlify.app/api/getStartIds/?";

  // let path = "/api/getStartIds/?";

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

export const App: FC<AppType> = () => {
  const [deckLayers, setDeckLayers] = useState([]);
  const [layersData, setLayersData] = useState<object>({});
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState<boolean>(true);
  const [mobileHeight, setMobileHeight] = useState<"half" | "full">("half");
  const [navView, setNavView] = useState<"filter" | "info">("filter");
  const [zoom, setZoom] = useState<null | number>(null);
  const [dataPointsIndexed, setDataPointsIndexed] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function getData() {
      const dataPoints = await getPoints();

      let dIndexed = {};
      dataPoints.forEach((d) => {
        dIndexed[d.id] = d;
      });
      setDataPointsIndexed(dIndexed);
      setDataPoints(dataPoints);
      setDataLoaded(true);
    }
    getData();
  }, []);

  return (
    dataLoaded && (
      <main className="">
        <MapComponent deckLayers={deckLayers} setZoom={setZoom}></MapComponent>
        <SidebarWrapper
          classes="z-20"
          position="left"
          isOpen={sidebarMenuOpen}
          setOpen={setSidebarMenuOpen}
          closeSymbol="cross"
          mobileHeight={mobileHeight}
        >
          <SidebarContentFilter
            dataPoints={dataPoints}
            dataPointsIndexed={dataPointsIndexed}
            setDeckLayers={setDeckLayers}
            deckLayers={deckLayers}
            layersData={layersData}
            setLayersData={setLayersData}
          />
        </SidebarWrapper>
        <SidebarNav
          navViews={navViews}
          setNavView={setNavView}
          navView={navView}
          sidebarMenuOpen={sidebarMenuOpen}
          setSidebarMenuOpen={setSidebarMenuOpen}
        />
      </main>
    )
  );
};
