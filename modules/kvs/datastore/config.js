'use strict';

const KIND = {
  ID :              `ID`,              //ID採番用
  SEED :            `Seed`,            //Seed格納用
  SESSION :         `Session`,         //Session情報格納用
};
module.exports.KIND = KIND;

const session = require(`./queries.session`)
module.exports.session = session

const store = require(`./store`)
module.exports.store = store
