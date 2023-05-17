"use client";
import { FC } from "react";
import { MapComponent } from "@components/map/Map";
import { Filter } from "@components/filter/Filter";

export interface AppType {
  dataPoints: any;
}

export const App: FC<AppType> = ({ dataPoints }) => {
  return (
    <main className="">
      <MapComponent dataPoints={dataPoints}></MapComponent>
      <Filter></Filter>
    </main>
  );
};
