'use strict';

//Environment
const ds_conf = require('../kvs/datastore/config.js');


/**
 * Recorder functions
 */
class Recorder {

  /**
   *  Session recorder 
   * @param {JSON} data {
   * headers, logiD, kind, ns, session_id, client, api, customer_uuid}
   */
  Session = async (data) => {

    //Get session entity
    let result = await ds_conf.session.getBySessionId(data.ns, data.session_id)
    .catch(err=>{
      throw new Error(err)
    })

    //Recording
    if (result[0].length != 0) {
      result[0].headers = data.headers
      result[0].logiD = data.logiD
      result[0].api = data.api
      result[0].kind = data.kind
      result[0].client = data.client
      result[0].session_id = data.session_id
      result[0].customer_uuid = data.customer_uuid || null
      console.log(JSON.stringify(result[0]))
      return true
    } else {
      console.error(`Not Found session. ${data.session_id}`)
      return false
    }
  }

  /**
   *  Boarding api reqest & response recorder 
   * @param {JSON} data {
  */
  Boarding = async (data) => {
    //Recording
    console.log(JSON.stringify(data))
    return true
  }

  /**
   *  Keel api reqest & response recorder
   * @param {JSON} data {
  */
   Keel = async (data) => {
    //Recording
    console.log(JSON.stringify(data))
    return true
  }

  /**
   *  [Another recorder template]
   * @param {JSON} data 
      kind : 'CallName',
      logiD: req.logiD,
      customer_uuid: req.customer_uuid,
      :
   */
  CallName = async (data) => {
    //console.log(JSON.stringify(data))
    return true
  }
}

module.exports = {
  Recorder,
}