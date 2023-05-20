import { FC, useState, useEffect } from "react";
import Select from "react-select";

import { getOptionsBL1, getOptionsBL2, getOptionsBL3 } from "./dropdownOptions";

// function checkFirstNChars(str1, str2, n) {
//   console.log(str1, str2, n);
//   return str1.substring(0, n) === str2;
// }

// function filterOptionsByBranchLevel(filterVal, options) {
//   return options.filter((option) =>
//     checkFirstNChars(option.value, filterVal.value, filterVal.value.length)
//   );
// }

export interface FilterBranchesType {
  filterValBl1: object;
  setFilterValBl1: (val: object) => void;
  filterValBl2: object;
  setFilterValBl2: (val: object) => void;
  filterValBl3: object;
  setFilterValBl3: (val: object) => void;
}

export const FilterBranches: FC<FilterBranchesType> = ({
  filterValBl1,
  setFilterValBl1,
  filterValBl2,
  setFilterValBl2,
  filterValBl3,
  setFilterValBl3,
}) => {
  const [bl1Disabled, setBl1Disabled] = useState<boolean>(false);
  const [bl2Disabled, setBl2Disabled] = useState<boolean>(false);

  const [optionsBL2, setOptionsBL2] = useState<number[]>(getOptionsBL2());
  const [optionsBL3, setOptionsBL3] = useState<number[]>(getOptionsBL3());

  //   useEffect(() => {
  //     if (filterValBl1) {
  //       setOptionsBL2(filterOptionsByBranchLevel(filterValBl1, optionsBL2));
  //       setOptionsBL3(filterOptionsByBranchLevel(filterValBl1, optionsBL3));
  //     }
  //   }, [filterValBl1]);

  useEffect(() => {
    if (filterValBl3) {
      setBl1Disabled(true);
      setBl2Disabled(true);
    } else {
      setBl1Disabled(false);
      setBl2Disabled(false);
    }
  }, [filterValBl3]);

  useEffect(() => {
    if (filterValBl2) {
      setBl1Disabled(true);
    } else {
      setBl1Disabled(false);
    }
  }, [filterValBl2]);

  return (
    <div className="">
      <div className="mt-4">
        Branch level 1
        <Select
          value={filterValBl1}
          onChange={setFilterValBl1}
          className={""}
          isClearable={true}
          isSearchable={true}
          isDisabled={bl1Disabled}
          options={getOptionsBL1()}
        />
      </div>
      <div className="mt-4">
        Branch level 2
        <Select
          value={filterValBl2}
          onChange={setFilterValBl2}
          className={""}
          isClearable={true}
          isSearchable={true}
          isDisabled={bl2Disabled}
          options={optionsBL2}
        />
      </div>
      <div className="mt-4">
        Branch level 3
        <Select
          value={filterValBl3}
          onChange={setFilterValBl3}
          className={""}
          isClearable={true}
          isSearchable={true}
          options={optionsBL3}
        />
      </div>
    </div>
  );
};
