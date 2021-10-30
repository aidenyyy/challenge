'use strict';
const _ = require('lodash');
const { itemsOfUserByUsername } = require('./db.js');
const db = require('./db.js');

// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataAccessMethod());
    }, 500);
  });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
  const dataAccessMethod = () => _.map(db.usersById, (userInfo) => userInfo);
  return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
  const dataAccessMethod = () => {
    const users = _.map(db.usersById, (userInfo) => userInfo);
    const usersWithItem = _.filter(users, (user) =>
      db.itemsOfUserByUsername[user.username].includes(item)
    );
    return _.map(usersWithItem, (userWithItem) => userWithItem.age);
  };
  return mockDBCall(dataAccessMethod);
};

module.exports = {
  getUsers,
  getListOfAgesOfUsersWith,
};
