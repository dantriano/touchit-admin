"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.insert(
    "groups",
    [
      {
        _id: "5e623b316473f65caee4dd8d",
        name: "Tech",
        main: "5e602ff737bec312f566edb2",
        activities: [
          "5e68298c6fcfb9245c70bb55",
          "5f665723d626d41bc55449f8",
          "5f665837d626d41bc5544a0a",
        ],
        options: ["WORKERTIME"],
        __v: 0,
      },
    ],
    callback
  );
};

exports.down = function (db, callback) {
  db.dropCollection("groups", callback);
};

exports._meta = {
  version: 1,
};
