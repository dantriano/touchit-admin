const displayedOptions = [
  {
    link: "/settings/schedule/",
    class: "btn-warning",
    icon: "fa fa-pencil",
  },
  {
    class: "btn-danger",
    icon: "fa fa fa-trash-o",
    delete: "true",
  },
];
const dropdownOptions = [
  {
    link: "/settings/schedule",
    text: "Add schedule",
  },
];
const displayedColumns = ["name", "locations", "options"];
export const config = {
  redirect: "schedules",
  uiName: "Schedules",
  service: "schedule",
  displayedOptions: displayedOptions,
  displayedColumns: displayedColumns,
  dropdownOptions: dropdownOptions,
};
