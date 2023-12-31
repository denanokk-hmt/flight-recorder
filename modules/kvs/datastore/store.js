'use strict'

// Instantiate a datastore client
//gcloud beta emulators datastore start --data-dir /Users/tahi/watson/datastore/emulator_data
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();
module.exports.datastore = datastore;

/**
 * Insert/Update session
 * @param {*} entity
 */
const putEntity = entity => {
  return datastore.save(entity)
    .then(() => {
      console.log("<<<<<<<<STORE putEntity RESULT>>>>>>>>>", JSON.stringify(entity))
      return entity;
    })
    .catch(err => {
      console.log("<<<<<<<<STORE putEntity ERROR>>>>>>>>>", err)
      return err;
    });
}

module.exports.putEntity = putEntity;

/**
 * Update session
 * @param {*} entity
 */
const updateEntity = entity => {
  return datastore.update(entity)
    .then(() => {
      return entity;
    })
    .catch(err => {
      return err;
    });
};

module.exports.updateEntity = updateEntity;

/**
 * Delete
 * @param {*} entity 
 */
const deleteEntity = key => {
  return datastore.delete(key)
    .then(() => {
      return key;
    })
    .catch(err => {
      return err;
    });
}
module.exports.deleteEntity = deleteEntity;

/**
 * Get entity by Ancestor key
 * @param {*} ns
 * @param {*} pKind 
 * @param {*} key 
 * @param {*} cKind
 */
const getByAncestorKey = (ns, pKind, key, cKind) => {

  datastore.namespace = ns

  const ancestorKey = datastore.key([ pKind, key, ])

  const query = datastore.createQuery(cKind).hasAncestor(ancestorKey);

  return datastore.runQuery(query)
    .then((results) => {
      const entities = results[0];
      return entities;
    })
    .catch(err => {
      return err;
    });
}
module.exports.getByAncestorKey = getByAncestorKey;

/**
 * Get entity by key
 * @param {*} ns
 * @param {*} kind 
 * @param {*} key
 * @param {*} customNm (true/false)
 */
const getEntityByKey = (ns, kind, key, customNm) => {

  const key_val = (customNm)? String(key) : Number(key)

  datastore.namespace = ns
  
  const query = datastore
    .createQuery(kind)
    .filter('__key__', '=', datastore.key([kind, key_val]));
  
  return datastore.runQuery(query)
    .then((values) => {
      const entity = values[0];
      if (entity.length == 0) {
        return null;
      } else {
        return entity
      }
    })
    .catch(err => {
      throw new Error(err);
    });
}
module.exports.getEntityByKey = getEntityByKey;