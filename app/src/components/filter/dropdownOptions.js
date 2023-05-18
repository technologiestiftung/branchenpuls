import uiKeys from "@lib/uiKeys.json";

export function getOptionsEmployees() {
  // options for employees
  const optionsEmployees = [];
  for (const key in uiKeys.nr_e) {
    optionsEmployees.push({
      value: key,
      label: uiKeys.nr_e[key],
    });
  }
  return optionsEmployees;
}

export function getOptionsBranchLevelThree() {
  // options for branch level 3
  const optionsBranchLevelThree = [];
  for (const key in uiKeys.branchLevelThree) {
    optionsBranchLevelThree.push({
      value: key,
      label: uiKeys.branchLevelThree[key],
    });
  }
  return optionsBranchLevelThree;
}

export function getOptionsBType() {
  const optionsBType = [
    {
      value: 0,
      label: "Kleingewerbetreibender",
    },
    {
      value: 1,
      label: "Im Handelsregister eingetragen",
    },
  ];

  return optionsBType;
}
