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
    "employees",
    [
      {
        _id: "5f665509d626d41bc55449cf",
        groups: [],
        mainActivity: null,
        customActivities: [],
        employeeCode: "",
        firstName: "Laura",
        lastName: "Sanchez",
        email: "laura.sanchez@gmail.com",
        isLinked: false,
        linkCode: "Uh8P",
        options: [],
        __v: 0,
      },
      {
        _id: "5e5c5a040df856de0fef8b94",
        employeeCode: "",
        firstName: "Alfred",
        lastName: "Smith",
        email: "dan@dan.es",
        isLinked: false,
        linkCode: "e2Xv",
        avatar: "/assets/images/nick.png",
        groups: ["5e623b316473f65caee4dd8d"],
        status: "active",
        customActivities: [
          {
            _id: "5e602ff737bec312f566edb2",
            status: "deny",
          },
          {
            _id: "5e623b316473f65caee4dd8d",
            status: "null",
          },
          {
            _id: "5e68298c6fcfb9245c70bb55",
            status: "allow",
          },
        ],
        __v: 0,
        mainActivity: [
          {
            _id: "5e623b316473f65caee4dd8d",
            type: "group",
          },
        ],
        options: null,
        company: "5e6acf4e2a94ac32a586eafa",
      },
    ],
    callback
  );
};

exports.down = function (db, callback) {
  db.dropCollection("employees", callback);
};

exports._meta = {
  version: 1,
};
