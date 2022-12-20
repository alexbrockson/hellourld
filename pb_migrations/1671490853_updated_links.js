migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z68y5m9hu48a985")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ni9eaxql",
    "name": "shorturl",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z68y5m9hu48a985")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ni9eaxql",
    "name": "shorturl",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
