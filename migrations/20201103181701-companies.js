'use strict';

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
    db.insert('companies', [{
      _id: '5e6acf4e2a94ac32a586eafa',
      name: 'Test',
      __v: 0
  },{
    _id: '5f56acfce7c49a64dac61e5f',
    name: 'Test',
    __v: 0
}], callback)
  }
  
  
  exports.down = function (db, callback) {
   db.dropCollection('companies', callback);
  };

exports._meta = {
  "version": 1
};
