import { find } from "@utils/commons.service";

/**
 * Foreach available service returns its status for the current users depending on his group and custom option
 * @param id Service ID
 * @param userCustomActivities List of the status of all the activities for the current user
 * @param userGroups List of all the user's groups
 * @param companyGroups List of all the company groups
 */
function getCustomStatus(id, userCustomActivities, userGroups, companyGroups) {
  var customStatus = find(userCustomActivities, id).status || "default";
  var activitiesByGroup = false;
  companyGroups
    ?.filter((item) => userGroups.includes(item._id))
    .filter((item) => item.activities.includes(id))
    .forEach(function (item) {
      activitiesByGroup = true;
    }, activitiesByGroup);
  return (
    (customStatus === "on" || activitiesByGroup) && !(customStatus === "off")
  );
}

export { getCustomStatus };
