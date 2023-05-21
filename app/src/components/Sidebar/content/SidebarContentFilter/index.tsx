import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";
import { Filter } from "@components/filter/Filter";

export interface SidebarContentFilterType {
  // pointData: any
  // setPointData: (data: any) => void
}

export const SidebarContentFilter: FC<SidebarContentFilterType> = ({
  dataPoints,
  dataPointsIndexed,
  setDeckLayers,
}) => {
  return (
    <>
      <SidebarHeader text="Filter" />

      <SidebarBody>
        <Filter
          dataPoints={dataPoints}
          dataPointsIndexed={dataPointsIndexed}
          setDeckLayers={setDeckLayers}
        ></Filter>
      </SidebarBody>
    </>
  );
};
