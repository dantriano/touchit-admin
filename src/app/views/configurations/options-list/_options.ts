const displayedOptions = [
  {
    link: "/configurations/options/profile/",
    class: "btn-primary",
    icon: "fa fa-eye",
  },
  {
    link: "/configurations/options/edit/",
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
    link: "/configurations/options/edit",
    text: "Add option",
  },
};
const displayedColumns =[
  "id",
  "desc",
  //"companies",
  "status",
  "options",
];
export const config = {
  company:null,
  redirect: "configurations",
  uiName: "Configurations",
  service: "configuration",
  query: {},
  displayedOptions: displayedOptions,
  displayedColumns: displayedColumns,
  dropdownOptions: dropdownOptions,
};
