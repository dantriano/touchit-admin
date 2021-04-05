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
    "connections",
    [
      {
        _id: "6a7KGy5BcuwmsAQob",
        servers: [
          {
            host: "mongo",
            port: 27017,
          },
        ],
        connectionName: "Touchit",
        url: "mongodb://devroot:devroot@mongo:27017/touch_it?authSource=admin",
        authenticationType: "scram_sha_1",
        databaseName: "touch_it",
        scram_sha_1: {
          username: "devroot",
          password: "devroot",
          authSource: "admin",
        },
        options: {
          connectionTimeout: "",
          socketTimeout: "",
          readPreference: "primary",
          connectWithNoPrimary: false,
          replicaSetName: "",
        },
      },
    ],
    callback
  );
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
