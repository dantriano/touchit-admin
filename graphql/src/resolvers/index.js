//import locationResolver from "./location.resolver";
import userResolver from "./user.resolver";
import employeeResolver from "./employee.resolver";
import configurationResolver from "./configuration.resolver";
//import activityResolver from "./activity.resolver";
//import groupResolver from "./group.resolver";
import registerResolver from "./register.resolver";
import companyResolver from "./company.resolver";
//import scheduleResolver from "./schedule.resolver";

export default [
  userResolver,
  companyResolver,
  employeeResolver,
  //locationResolver,
  configurationResolver,
  //activityResolver,
  //groupResolver,
  registerResolver,
  //scheduleResolver,
];
