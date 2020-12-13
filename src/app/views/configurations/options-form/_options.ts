const customOptions = [
  { value: "on", label: "btn btn-success", span: "fa fa-check" },
  { value: "default", label: "btn btn-secondary", span: "fa fa-circle-o" },
  { value: "off", label: "btn btn-danger", span: "fa fa-close" },
];
export const config = {
  redirect: "configurations",
  uiName: "Configurations",
  service: "configuration",
  query: {},
  customOptions: customOptions,
};
