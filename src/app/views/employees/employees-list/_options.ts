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
const displayedColumns = ["firstName", "lastName", "groups", "options"];
export const config = {
  redirect: "employees",
  uiName: "Employees",
  service: "employee",
  displayedOptions: displayedOptions,
  displayedColumns: displayedColumns,
  dropdownOptions: dropdownOptions,
};
