"use client";
import { FC } from "react";
import { MapComponent } from "@components/map/Map";

export interface AppType {
  dataPoints: any;
}

export const App: FC<AppType> = ({ dataPoints }) => {
  return (
    <main className="">
      <MapComponent dataPoints={dataPoints}></MapComponent>
    </main>
  );
};
