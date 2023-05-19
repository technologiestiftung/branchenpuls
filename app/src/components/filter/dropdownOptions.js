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

export function getOptionsBL1() {
  const optionsBL1 = [];
  for (const key in uiKeys.bl1) {
    optionsBL1.push({
      value: key,
      label: uiKeys.bl1[key],
    });
  }
  return optionsBL1;
}

export function getOptionsBL2() {
  const optionsBL2 = [];
  for (const key in uiKeys.bl2) {
    optionsBL2.push({
      value: key,
      label: uiKeys.bl2[key],
    });
  }
  return optionsBL2;
}

export function getOptionsBL3() {
  // options for branch level 3
  const optionsBL3 = [];
  for (const key in uiKeys.bl3) {
    optionsBL3.push({
      value: key,
      label: uiKeys.bl3[key],
    });
  }
  return optionsBL3;
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
