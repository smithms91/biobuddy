migrate((db) => {
  const collection = new Collection({
    "id": "s6sxm4d7dobhomd",
    "created": "2023-02-01 22:37:10.786Z",
    "updated": "2023-02-01 22:37:10.786Z",
    "name": "likes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vunofzcl",
        "name": "likes",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("s6sxm4d7dobhomd");

  return dao.deleteCollection(collection);
})
