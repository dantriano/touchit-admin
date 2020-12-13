const displayedOptions = [
  {
    link: "/settings/group/",
    class: "btn-warning",
    icon: "fa fa-pencil",
  },
  {
    class: "btn-danger",
    icon: "fa fa fa-trash-o",
    delete: "true",
  },
];
const dropdownOptions = {
  0: {
    link: "/settings/group",
    text: "Add group",
  },
};
const displayedColumns = ["name", "activities", "options"];
export const config = {
  redirect: "groups",
  uiName: "Groups",
  service: "group",
  displayedOptions: displayedOptions,
  displayedColumns: displayedColumns,
  dropdownOptions: dropdownOptions,
};
