'use strict'

const ds_conf = require('./config');
const store = require('./store');


/**
 * Get User UID
* @param {*} ns
 * @param {*} session_id
 */
const getBySessionId = (ns, session_id) => {
  return new Promise((resolve, reject) => {
    const result = store.getEntityByKey(
      ns,
      ds_conf.KIND.SESSION,
      session_id,
      true
    )
    .catch(err => {
      console.log(err)
      reject(err)
    })
    resolve(result)
  });
}
module.exports.getBySessionId = getBySessionId;


/**
 * Get session
 * @param {text} ns
 * @param {int} mtime
 * @param {text} eqsign ('lt','gt','eq','le','ge') 
 * @param {int} qty
 */
const getByFilter = (ns, filtername, filtervalue, str=false) => {

  if (str) {
    filtervalue = String(filtervalue)
  } else {
    filtervalue = Number(filtervalue)
  }
  
  return new Promise((resolve, reject) => {
    //set namespace
    store.datastore.namespace = ns
    //set query
    const query = store.datastore
      .createQuery(ds_conf.KIND.SESSION)
      .filter(filtername, '=', filtervalue)
      .filter('dflg', '=', null)
      //.order('udt', { descending: true })
      .limit(1);
    //run query
    store.datastore.runQuery(query)
      .then(results => {
        const entities = results[0];
        resolve(entities);
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    });
}
module.exports.getByFilter = getByFilter;