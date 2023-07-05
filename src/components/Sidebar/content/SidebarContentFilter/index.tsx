import { FC, useEffect, useState } from "react";
// import classNames from "classnames";
import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";
import { FilterLayer } from "@/components/filter/FilterLayer";
import { getNewLayerData } from "@lib/getNewLayerData.js";

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
  setOpen,
}) => {
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);

  // add one layer on start
  useEffect(() => {
    if (layersData && !Object.keys(layersData).length) {
      const newLayer = getNewLayerData(layersData);
      layersData[newLayer.id] = newLayer;
      layersData = JSON.parse(JSON.stringify(layersData));
      setActiveLayerId(newLayer.id);
      setLayersData(layersData);
    }
  }, []);

  return (
    <>
      <SidebarHeader text="IHK Gewerbedaten" />
      <SidebarBody>
        <div className="flex mt-2">
          {Object.keys(layersData).map((layerId, i) => {
            const layer = layersData[layerId];
            return (
              <button
                style={{ backgroundColor: layer.colorHex }}
                className={`h-12 mr-1 grid items-center hover:opacity-75 cursor-pointer rounded text-white text-center w-1/3 ${
                  layerId !== activeLayerId ? "opacity-40" : ""
                }`}
                onClick={() => {
                  setActiveLayerId(layerId);
                }}
              >
                {/* {i + 1}. Ebene */}
                Ebene
              </button>
            );
          })}
          {Object.keys(layersData).length < 3 ? (
            <button
              onClick={() => {
                const newLayer = getNewLayerData(layersData);
                layersData[newLayer.id] = newLayer;
                layersData = JSON.parse(JSON.stringify(layersData));
                setActiveLayerId(newLayer.id);
                setLayersData(layersData);
              }}
              className="h-12 grid items-center hover:opacity-75 cursor-pointer text-center rounded bg-gray-200 w-1/3 "
            >
              Ebene +
            </button>
          ) : null}
        </div>

        {Object.keys(layersData).map((layerId, i) => {
          const layer = layersData[layerId];
          // return layerId === activeLayerId ? (
          return (
            <div className={`${layerId === activeLayerId ? "" : "hidden"}`}>
              <FilterLayer
                setDeckLayers={setDeckLayers}
                deckLayers={deckLayers}
                layerId={layer.id}
                layersData={layersData}
                index={i}
                key={i}
                loading={loading}
                setLoading={setLoading}
                setOpen={setOpen}
                activeLayerId={activeLayerId}
              ></FilterLayer>
            </div>
          );
          // ) : null;
        })}
      </SidebarBody>
    </>
  );
};
