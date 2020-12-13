const displayedOptions = [
  {
    link: "/settings/location/",
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
    link: "/settings/location",
    text: "Add location",
  },
};
const displayedColumns =["name", "options"];
export const config = {
  redirect: "locations",
  uiName: "Locations",
  service: "location",
  displayedOptions: displayedOptions,
  displayedColumns: displayedColumns,
  dropdownOptions: dropdownOptions,
};
