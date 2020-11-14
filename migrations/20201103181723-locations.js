'use strict';

const { ObjectID } = require("mongodb");

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  //  db.createCollection('users');
    db.insert('locations', [{
      _id: ObjectID('5e66204823f1de12a8b03342'),
      name: 'Prueba',
      zones: [
          {
              name: 'noname',
              latsLngs: [
                  {
                      lat: '33.64149463021332',
                      lng: '-112.1739309828125'
                  },
                  {
                      lat: '33.49960971965071',
                      lng: '-112.0311087171875'
                  },
                  {
                      lat: '33.719203413336736',
                      lng: '-111.9651907484375'
                  }
              ]
          }
      ],
      options: [
          'WORKERTIME'
      ],
      __v: 0
  }], callback)
  }
  
  
  exports.down = function (db, callback) {
   db.dropCollection('locations', callback);
  };

exports._meta = {
  "version": 1
};
