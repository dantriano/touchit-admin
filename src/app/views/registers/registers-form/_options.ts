const customOptions = [
  { value: "on", label: "btn btn-success", span: "fa fa-check" },
  { value: "default", label: "btn btn-secondary", span: "fa fa-circle-o" },
  { value: "off", label: "btn btn-danger", span: "fa fa-close" },
];
const displayedColumns = ["status", "name", "options"];
export const config = {
  _id: null,
  redirect: "registers",
  uiName: "Register",
  service: "register",
  displayedColumns: displayedColumns,
  customOptions: customOptions,
};
