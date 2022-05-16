import chatSchema from './chatSchema'

import { createRxDatabase, addRxPlugin } from 'rxdb'

import { addPouchPlugin, getRxStoragePouch } from 'rxdb/plugins/pouchdb'

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
addRxPlugin(RxDBDevModePlugin)

import { RxDBValidatePlugin } from 'rxdb/plugins/validate'
addRxPlugin(RxDBValidatePlugin)

import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'
addRxPlugin(RxDBLeaderElectionPlugin)

import { RxDBReplicationCouchDBPlugin } from 'rxdb/plugins/replication-couchdb'
addRxPlugin(RxDBReplicationCouchDBPlugin)

import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb'
addPouchPlugin(PouchdbAdapterIdb)
const useAdapter = 'idb'

/**
 * creates the database
 */
async function _create() {
  const db = await createRxDatabase({
    name: 'chatroom',
    storage: getRxStoragePouch(useAdapter)
  })
  console.log('DatabaseService: created database')
  // write to window for debugging

  // create collections
  console.log('DatabaseService: create collections')
  await db.addCollections({
    chatinfo: {
      schema: chatSchema
    }
  })
  return db
}

const DatabaseService = {
  DB_CREATE_PROMISE: _create(),
  get() {
    return this.DB_CREATE_PROMISE
  }
}

export default DatabaseService
