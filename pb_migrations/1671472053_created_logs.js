migrate((db) => {
  const collection = new Collection({
    "id": "7nvs71lq2ex8n8g",
    "created": "2022-12-19 17:47:33.678Z",
    "updated": "2022-12-19 17:47:33.678Z",
    "name": "logs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ktnlrsxi",
        "name": "link_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "z68y5m9hu48a985",
          "cascadeDelete": true
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7nvs71lq2ex8n8g");

  return dao.deleteCollection(collection);
})
