const displayedOptions = [
  {
    link: "/employees/profile/",
    class: "btn-primary",
    icon: "fa fa-eye",
  },
  {
    link: "/employees/edit/",
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
    link: "/employees/edit",
    text: "Add employee",
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
  query: null,
  displayedOptions: displayedOptions,
  displayedColumns: displayedColumns,
  dropdownOptions: dropdownOptions,
};
