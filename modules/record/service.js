'use strict';

const {Recorder} = require('./recorder');
const recorder = new Recorder()

/**
 * Recording Service
 * 
 * data_sample = [{
    kind: 'Session',
    api: 'put_signin',
    logiD: '12345678zxy',
    ns: 'WhatYa-svc-dev',
    session_id: '0GMhYjA0XWUNEPGokmSCwC2NNKl8vE2RjOXAEwEAwC1ibEwnB9UfU/s5GxcBOIVVCqkD0I7FC8a6pplgPStjssHHxMCt51aB',
    customer_uuid: 'e193c86d-4748-4de8-b708-ca705076b657',
  }]
 */
class RecordService {

  //Set recording func & data
  constructor(data) {
    this.func = []
    data.forEach(d => {
      this.func[d.kind] = d
    });
  }

  //Do recording func
  async doFunc() {
    try {
      for(let f in this.func) {
        //exec func
        const data = this.func[f]
        let result = await recorder[f](data)
        //logging result
        result = {
          result: (result)? 'record' : 'nonecord',
          logiD: data.logiD || null,
          customer_uuid: data.customer_uuid || null
        }
        console.log(JSON.stringify(result))
      }
    } catch(err) {
      throw new Error(err)
    }
  }
}

module.exports = {
  RecordService,
}