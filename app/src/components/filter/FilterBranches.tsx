import { FC, useState, useEffect } from "react";
import Select from "react-select";

import { getOptionsBL1, getOptionsBL2, getOptionsBL3 } from "./dropdownOptions";

export interface FilterBranchesType {
  dataPoints: any;
  dataPointsIndexed: any;
  deckLayers: any;
  setDeckLayers: any;
}

export const FilterBranches: FC<FilterBranchesType> = ({}) => {
  const [filterValBl1, setfilterValBl1] = useState<object | null>(null);
  const [filterValBl2, setfilterValBl2] = useState<object | null>(null);
  const [filterValBl3, setfilterValBl3] = useState<object | null>(null);

  useEffect(() => {}, []);

  return (
    <div className="">
      <div className="mt-4">
        Branch level 1
        <Select
          value={filterValBl1}
          onChange={setfilterValBl1}
          className={""}
          isClearable={true}
          isSearchable={true}
          options={getOptionsBL1()}
        />
      </div>
      <div className="mt-4">
        Branch level 2
        <Select
          value={filterValBl2}
          onChange={setfilterValBl2}
          className={""}
          isClearable={true}
          isSearchable={true}
          options={getOptionsBL2()}
        />
      </div>
      <div className="mt-4">
        Branch level 3
        <Select
          value={filterValBl3}
          onChange={setfilterValBl3}
          className={""}
          isClearable={true}
          isSearchable={true}
          options={getOptionsBL3()}
        />
      </div>
    </div>
  );
};
