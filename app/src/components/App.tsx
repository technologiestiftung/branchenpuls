"use client";
import { FC, useState } from "react";
import { MapComponent } from "@components/map/Map";
import { Filter } from "@components/filter/Filter";

export interface AppType {
  dataPoints: any;
}

export const App: FC<AppType> = ({ dataPoints }) => {
  const [deckLayers, setDeckLayers] = useState([]);

  const dataPointsIndexed = {};
  dataPoints.forEach((d) => {
    dataPointsIndexed[d.id] = d;
  });
  return (
    <main className="">
      <MapComponent deckLayers={deckLayers}></MapComponent>
      <Filter
        dataPoints={dataPoints}
        dataPointsIndexed={dataPointsIndexed}
        setDeckLayers={setDeckLayers}
      ></Filter>
    </main>
  );
};
