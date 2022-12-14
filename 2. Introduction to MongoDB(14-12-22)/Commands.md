# Commands and Operations on MongoDB

## Outline
    - Database Operations
    - Collections Operations
    - CRUD Operations on Documents
    - _id/Objectid
    - Query and Projection Operations
    - GeoJSON

## Database Operations

> show dbs
The above operation will show all the db on our MongoDB server.

> use <db_name>
This will switch to the db whose name you have used. If the db is not present, it will create a new db with the given name.

> db.dropDatabase()
This operation is going to drop the current db.

## Collections Operations

> db.createCollection("<collection_name>")
This operation will create a new collection with the given name.

> db.<collection_name>.insertOne({"name" : "Hari"})