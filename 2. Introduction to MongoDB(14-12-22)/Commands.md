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
This operation will insert a new document in the collection "myCollection". If this collection is not present in the db, mongodb will create a fresh collection with this name.

> show collections
This will list all collections in the db.

> db.myCollection.drop()
This is to drop the particular collection.

## CRUD Document Operations

> db.myCollection.insertMany([, , ...])
This inserts many documents in myCollection collection.

> db.myCollection.insertOne()
This inserts a single document in the collection.

> db.myCollection.find(, )
This can read a bunch of documents from the collection.

> db.myCollection.deleteMany(, )
This will delete all the documents that match the filter.

> db.myCollection.updateMany(, , )
This will perform the update on all the documents that match the filter.

There are also deleteOne and updateOne

Here are some operators you can use in filters and update: 
$set : set a value for a field 
$in : search for a value in a list of values 
$lt : less than and so on.

## GeoJSON

A typical GeoJSON field looks like: : { : , coordinates : }

{ 
    "_id": { 
        "$oid": "639a04633c1f9b7df56d8d86" 
        }, 
    "name": "Likhith", 
    "address": { 
        "type": "Point", 
        "coordinates": [ 17.708018, 83.302324 ] 
        } 
}

Before searching for nearby location you need to create an index using the GeoJSON field. Later you can do find using $near operator.