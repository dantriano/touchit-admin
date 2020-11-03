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
    db.insert('configurations',[{
      _id: '5e6177bf26ad06680e102d42',
      type: 'options',
      id: 'activityOptions',
      desc: 'Is included in worker time',
      status: 'active',
      value: [
          {
              _id: 'WORKERTIME',
              desc: 'Is included in worker time',
              status: 'active'
          }
      ]
  },{
    _id: '5e6178eb26ad06680e102d43',
    type: 'options',
    id: 'locationOptions',
    desc: 'Is included in worker time',
    status: 'active',
    value: [
        {
            _id: 'WORKERTIME',
            desc: 'Is included in worker time',
            status: 'active'
        }
    ]
},{
  _id: '5e61a32d26ad06680e102d44',
  type: 'options',
  id: 'groupOptions',
  desc: 'Is included in worker time',
  status: 'active',
  value: [
      {
          _id: 'WORKERTIME',
          desc: 'Is included in worker time',
          status: 'active'
      }
  ]
}], callback)
  }
  
  
  exports.down = function (db, callback) {
   db.dropCollection('configurations', callback);
  };

exports._meta = {
  "version": 1
};
