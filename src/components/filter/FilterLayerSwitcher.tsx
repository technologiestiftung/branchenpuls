import { FC, useState, useEffect } from "react";

export interface FilterLayerSwitcherType {}

export const FilterLayerSwitcher: FC<FilterLayerSwitcherType> = ({
  layersData,
  activeLayerId,
  setActiveLayerId,
  addNewLayer,
}) => {
  return (
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
            key={`layer-key-${layerId}`}
          >
            Ebene
          </button>
        );
      })}
      {Object.keys(layersData).length < 3 ? (
        <button
          onClick={() => {
            addNewLayer(layersData);
          }}
          className="leading-4 text-gray-400 font-normal h-12 grid items-center hover:opacity-75 cursor-pointer text-center rounded bg-gray-200 w-1/3 "
        >
          Ebene
          <br />+
        </button>
      ) : null}
    </div>
  );
};
