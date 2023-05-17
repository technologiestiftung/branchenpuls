"use client";
import { FC } from "react";
import { MapComponent } from "@components/map/Map";
import { Filter } from "@components/filter/Filter";

export interface AppType {
  dataPoints: any;
}

export const App: FC<AppType> = ({ dataPoints }) => {
  const dataPointsIndexed = {};
  dataPoints.forEach((d) => {
    dataPointsIndexed[d.id] = d;
  });
  return (
    <main className="">
      <MapComponent
        dataPoints={dataPoints}
        dataPointsIndexed={dataPointsIndexed}
      ></MapComponent>
      <Filter></Filter>
    </main>
  );
};
