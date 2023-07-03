import uiKeys from "@lib/uiKeys.json";

export function getOptionsEmployees() {
  const optionsEmployees = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1 - 3",
    },
    {
      value: 2,
      label: "4 - 6",
    },
    {
      value: 3,
      label: "7 - 9",
    },
    {
      value: 4,
      label: "10 - 19",
    },
    {
      value: 5,
      label: "20 - 49",
    },
    {
      value: 6,
      label: "50 - 99",
    },
    {
      value: 7,
      label: "100 - 199",
    },
    {
      value: 8,
      label: "200 - 499",
    },
    {
      value: 9,
      label: "500 - 999",
    },
    {
      value: 10,
      label: "1000 - 2499",
    },
    {
      value: 11,
      label: "2500 - 4999",
    },
    {
      value: 12,
      label: "5000 - 7499",
    },
    {
      value: 13,
      label: "7500 - 9999",
    },
    {
      value: 14,
      label: "10000+",
    },
  ];

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
