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
    "users",
    {
      _id: "5e48a86d13fa17500da14f74",
      id: "1",
      firstName: "Dan",
      email: "admin@admin.com",
      lastName: "Triano",
      password: "$2b$12$U20zDbCRyHV3B5.zBQNiS.0JF/Z79qlhB30NIXoSC1KbHV2UIT7QO",
      picture: "nick.png",
      companies: [
        {
          employee: "5e5c5a040df856de0fef8b94",
          company: "5e6acf4e2a94ac32a586eafa",
        },
      ],
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropCollection("users", callback);
};

exports._meta = {
  version: 1,
};
