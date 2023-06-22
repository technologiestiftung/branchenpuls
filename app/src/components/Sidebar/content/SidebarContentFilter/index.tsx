import { FC, useEffect, useState } from "react";
// import classNames from "classnames";
import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";
import { Filter } from "@/components/filter/Filter";
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
  // add one layer on start
  useEffect(() => {
    if (layersData && !Object.keys(layersData).length) {
      addLayer(layersData, setLayersData);
    }
  }, []);

  return (
    <>
      <SidebarHeader text="Filter-postgres" />

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
        <div className="my-6 sticky bottom-4 bg-white width-full">
          <button
            onClick={() => {
              addLayer(layersData, setLayersData);
            }}
            className="btn btn-primary btn-sm"
          >
            + Add Layer
          </button>
        </div>
      </SidebarBody>
    </>
  );
};
