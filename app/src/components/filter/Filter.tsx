import { FC } from "react";
import { MapComponent } from "@components/map/Map";

export interface FilterType {
  //   dataPoints: any;
}

export const Filter: FC<FilterType> = ({}) => {
  return <div className="fixed w-[200px] top-2 left-2 bg-white"></div>;
};
