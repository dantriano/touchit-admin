'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
 exports.up = function (db, callback) {
  //  db.createCollection('users');
    db.insert('registers', [{
      _id: '5e66db39449292e4b853cef0',
      activity: '5e68298c6fcfb9245c70bb55',
      __v: 0,
      employee: '5e5c5a040df856de0fef8b94'
  },{
    _id: '5e6c2505c77482baeeab0370',
    activity: '5e68298c6fcfb9245c70bb55',
    employee: '5e5c5a040df856de0fef8b94',
    __v: 0
}], callback)
  }
  
  
  exports.down = function (db, callback) {
   db.dropCollection('registers', callback);
  };

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
