import branchKeys from "@lib/branchKeys.json";

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

export function getOptionsMonths() {
  const optionsMonths = [
    {
      value: 3,
      label: "März 2023",
    },
    {
      value: 4,
      label: "April 2023",
    },
    {
      value: 5,
      label: "Mai 2023",
    },
    {
      value: 6,
      label: "Juni 2023",
    },
  ];
  return optionsMonths;
}

export function getOptionsBL1() {
  let optionsBL1 = [];
  branchKeys.forEach((b) => {
    if (b.nace_id !== 0) {
      optionsBL1.push({
        value: b.branch_top_level_id,
        label: `${b.branch_top_level_desc} <br/><small>ID ${b.branch_top_level_id}</small>`,
        id: b.branch_top_level_id,
        name: b.branch_top_level_desc,
      });
    }
  });
  // optionsBL1.sort((a, b) => a.id - b.id);
  optionsBL1.sort((a, b) => a.name.localeCompare(b.name));
  optionsBL1 = optionsBL1.filter(
    (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
  );
  optionsBL1 = optionsBL1.map(({ name, id, ...rest }) => rest);

  return optionsBL1;
}

export function getOptionsBL2(filterValBl1) {
  let optionsBL2 = [];
  branchKeys.forEach((b) => {
    if (
      b.nace_id !== 0 &&
      (!filterValBl1 || b.branch_top_level_id === filterValBl1)
    ) {
      optionsBL2.push({
        value: b.nace_id,
        label: `${b.nace_desc} <br/><small>ID ${b.nace_id}</small>`,
        id: b.nace_id,
        name: b.nace_desc,
      });
    }
  });
  // optionsBL2.sort((a, b) => a.id - b.id);
  optionsBL2.sort((a, b) => a.name.localeCompare(b.name));
  optionsBL2 = optionsBL2.filter(
    (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
  );
  optionsBL2 = optionsBL2.map(({ name, id, ...rest }) => rest);

  return optionsBL2;
}

export function getOptionsBL3(filterValBl1, filterValBl2) {
  // options for branch level 3
  let optionsBL3 = [];
  branchKeys.forEach((b) => {
    if (
      b.nace_id !== 0 &&
      (!filterValBl1 || b.branch_top_level_id === filterValBl1)
    ) {
      if (!filterValBl2 || b.nace_id === filterValBl2) {
        optionsBL3.push({
          value: b.ihk_branch_id,
          label: `${b.ihk_branch_desc} <br/><small>ID ${b.ihk_branch_id}</small>`,
          id: b.ihk_branch_id,
          name: b.ihk_branch_desc,
        });
      }
    }
  });
  // optionsBL3.sort((a, b) => a.id - b.id);
  optionsBL3.sort((a, b) => a.name.localeCompare(b.name));
  optionsBL3 = optionsBL3.filter(
    (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
  );
  optionsBL3 = optionsBL3.map(({ name, id, ...rest }) => rest);

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
