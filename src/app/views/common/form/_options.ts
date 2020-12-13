function msg(x) {
  return {
    success: {
      crated: `${x.uiName} created`,
      updated: `${x.uiName}  updated`,
      saved: `${x.uiName}  saved`,
      deleted: `${x.uiName}  deleted`,
    },
    error: {
      notFound: `${x.uiName} not found`,
      ups: "Ups..Something happend",
    },
  };
}
export {msg}
