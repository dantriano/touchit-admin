const customOptions = [
  { value: "on", label: "btn btn-success", span: "fa fa-check" },
  { value: "default", label: "btn btn-secondary", span: "fa fa-circle-o" },
  { value: "off", label: "btn btn-danger", span: "fa fa-close" },
];
const daysWeek: any = [
  { _id: 0, name: "Monday" },
  { _id: 1, name: "Tuesday" },
  { _id: 2, name: "Wensday" },
  { _id: 3, name: "Thursday" },
  { _id: 4, name: "Friday" },
  { _id: 5, name: "Saturday" },
  { _id: 6, name: "Sunday" },
];
const displayedColumns = ["status", "name", "options"];
export const config = {
  _id: null,
  redirect: "settings",
  uiName: "Activities",
  service: "activity",
  daysWeek: daysWeek,
  displayedColumns: displayedColumns,
  customOptions: customOptions,
};
