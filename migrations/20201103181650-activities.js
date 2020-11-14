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
    db.insert('activities',[{
      _id: ObjectID('5e68298c6fcfb9245c70bb55'),
      name: 'Check-in',
      startTo: '9:00 AM',
      startFrom: '8:00 AM',
      duration: '01:03',
      days: [
          0,
          5,
          6
      ],
      locations: [],
      options: [
          'WORKERTIME'
      ],
      __v: 0
  },{
    _id: ObjectID('5f665837d626d41bc5544a0a'),
    name: 'Teletrabajo',
    startTo: '1:00 AM',
    startFrom: '1:00 AM',
    duration: '',
    days: [
        0,
        1
    ],
    locations: [],
    options: [],
    __v: 0
}], callback)
  }
  
  
  exports.down = function (db, callback) {
   db.dropCollection('activities', callback);
  };

exports._meta = {
  "version": 1
};
