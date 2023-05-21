"use client";
import { FC, useState } from "react";
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

export const App: FC<AppType> = ({ dataPoints }) => {
  const [deckLayers, setDeckLayers] = useState([]);
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState<boolean>(true);
  const [mobileHeight, setMobileHeight] = useState<"half" | "full">("half");
  const [navView, setNavView] = useState<"filter" | "info">("filter");

  const dataPointsIndexed = {};
  dataPoints.forEach((d) => {
    dataPointsIndexed[d.id] = d;
  });

  return (
    <main className="">
      <MapComponent deckLayers={deckLayers}></MapComponent>
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
        />
      </SidebarWrapper>
      <SidebarNav
        navViews={navViews}
        setNavView={setNavView}
        navView={navView}
        sidebarMenuOpen={sidebarMenuOpen}
        setSidebarMenuOpen={setSidebarMenuOpen}
        // setModalOpen={setModalOpen}
        // entityId={entityId}
        // setEntityId={setEntityId}
        // mapZoom={mapZoom}
        // setMapZoom={setMapZoom}
        // setMapPitch={setMapPitch}
        // mapPitch={mapPitch}
      />
    </main>
  );
};
