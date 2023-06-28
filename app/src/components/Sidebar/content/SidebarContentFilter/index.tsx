import { FC, useEffect, useState } from "react";
// import classNames from "classnames";
import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";
import { FilterLayer } from "@/components/filter/FilterLayer";
import { addLayer } from "@lib/addLayer.js";

export interface SidebarContentFilterType {
  // pointData: any
  // setPointData: (data: any) => void
}

export const SidebarContentFilter: FC<SidebarContentFilterType> = ({
  setDeckLayers,
  deckLayers,
  layersData,
  setLayersData,
  loading,
  setLoading,
}) => {
  // add one layer on start
  useEffect(() => {
    if (layersData && !Object.keys(layersData).length) {
      addLayer(layersData, setLayersData);
    }
  }, []);

  return (
    <>
      <SidebarHeader text="IHK Gewerbedaten" />

      <SidebarBody>
        {Object.keys(layersData).map((layerId, i) => {
          const layer = layersData[layerId];
          return (
            <FilterLayer
              setDeckLayers={setDeckLayers}
              deckLayers={deckLayers}
              layerId={layer.id}
              layersData={layersData}
              index={i}
              key={i}
              loading={loading}
              setLoading={setLoading}
            ></FilterLayer>
          );
        })}
        <div className="my-6 sticky bottom-4 bg-white width-full">
          <button
            onClick={() => {
              addLayer(layersData, setLayersData);
            }}
            className="btn btn-primary btn-sm text-white"
          >
            + Ebene hinzufügen
          </button>
        </div>
      </SidebarBody>
    </>
  );
};
