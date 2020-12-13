const displayedOptions = [
  {
    link: "/settings/activity/",
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
    link: "/settings/activity",
    text: "Add activity",
  },
];
const displayedColumns = ["name", "locations", "options"];
export const config = {
  redirect: "activities",
  uiName: "Activities",
  service: "activity",
  displayedOptions: displayedOptions,
  displayedColumns: displayedColumns,
  dropdownOptions: dropdownOptions,
};
