import { FC, useEffect, useState } from "react";
// import classNames from "classnames";
import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";
import { Filter } from "@components/Filter/Filter";
import { addLayer } from "@lib/addLayer.js";

export interface SidebarContentFilterType {
  // pointData: any
  // setPointData: (data: any) => void
}

export const SidebarContentFilter: FC<SidebarContentFilterType> = ({
  dataPoints,
  dataPointsIndexed,
  setDeckLayers,
  deckLayers,
  layersData,
  setLayersData,
}) => {
  return (
    <>
      <SidebarHeader text="Filter" />

      <SidebarBody>
        {Object.keys(layersData).map((layerId, i) => {
          const layer = layersData[layerId];
          return (
            <Filter
              dataPoints={dataPoints}
              dataPointsIndexed={dataPointsIndexed}
              setDeckLayers={setDeckLayers}
              deckLayers={deckLayers}
              layerId={layer.id}
              layersData={layersData}
              index={i}
              key={i}
            ></Filter>
          );
        })}
        <button
          onClick={() => {
            addLayer(layersData, setLayersData);
          }}
          className="btn btn-primary btn-sm my-6"
        >
          + Add Layer
        </button>
      </SidebarBody>
    </>
  );
};
