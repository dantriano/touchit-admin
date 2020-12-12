export const listOptions = {
  0: {
    link: "/employees/profile/",
    class: "btn-primary",
    icon: "fa fa-eye",
  },
  1: {
    link: "/employees/edit/",
    class: "btn-warning",
    icon: "fa fa-pencil",
  },
  2: {
    class: "btn-danger",
    icon: "fa fa fa-trash-o",
    click: true,
  },
};

export const displayedColumns = ["firstName", "lastName", "groups", "options"];
export const config = {
  redirect: "employees",
  uiName: "Employees",
  service: "employee",
};
