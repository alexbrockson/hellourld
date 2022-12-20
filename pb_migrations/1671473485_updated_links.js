migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z68y5m9hu48a985")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d42yucfo",
    "name": "expiration",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z68y5m9hu48a985")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d42yucfo",
    "name": "expiration",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
