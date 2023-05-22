import uiKeys from "@lib/uiKeys.json";

export function getOptionsEmployees() {
  //   // options for employees
  //   const optionsEmployees = [];
  //   for (const key in uiKeys.nr_e) {
  //     optionsEmployees.push({
  //       value: key,
  //       label: uiKeys.nr_e[key],
  //     });
  //   }

  const optionsEmployees = [
    {
      value: "0 Beschäftigte",
      label: "0",
    },
    {
      value: "1 - 3 Beschäftigte",
      label: "1 - 3",
    },
    {
      value: "4 - 6 Beschäftigte",
      label: "4 - 6",
    },
    {
      value: "7 - 9 Beschäftigte",
      label: "7 - 9",
    },
    {
      value: "10 - 19 Beschäftigte",
      label: "10 - 19",
    },
    {
      value: "20 - 49 Beschäftigte",
      label: "20 - 49",
    },
    {
      value: "50 - 99 Beschäftigte",
      label: "50 - 99",
    },
    {
      value: "100 - 199 Beschäftigte",
      label: "100 - 199",
    },
    {
      value: "200 - 499 Beschäftigte",
      label: "200 - 499",
    },
    {
      value: "500 - 999 Beschäftigte",
      label: "500 - 999",
    },
    {
      value: "1000 - 2499 Beschäftigte",
      label: "1000 - 2499",
    },
    {
      value: "2500 - 4999 Beschäftigte",
      label: "2500 - 4999",
    },
    {
      value: "5000 - 7499 Beschäftigte",
      label: "5000 - 7499",
    },
    {
      value: "7500 - 9999 Beschäftigte",
      label: "7500 - 9999",
    },
    {
      value: "10000 und mehr Beschäftigte",
      label: "10000 und mehr",
    },
    {
      value: "unbekannt",
      label: "unbekannt",
    },
  ];

  //   console.log(uiKeys.nr_e);
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
