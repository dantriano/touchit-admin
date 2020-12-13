const displayedOptions = [
  {
    class: "btn-danger",
    icon: "fa fa fa-trash-o",
    delete: "true",
  },
];
const dropdownOptions = {
  0: {
    link: "/registers/edit",
    text: "Add register",
  },
};
const displayedColumns = [
  "employee",
  "activity",
  "time",
  "position",
  "delay",
  "options",
];
export const config = {
  redirect: "registers",
  uiName: "Registers",
  service: "register",
  displayedOptions: displayedOptions,
  displayedColumns: displayedColumns,
  dropdownOptions: dropdownOptions,
};
