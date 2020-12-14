const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId;

const dbURL = process.env.DB_URI || "mongodb://localhost";

var services = function (app) {
    app.post('/write-library', function (req, res) {
        console.log("here");
        var bookData= {
            bookTitle: req.body.bookTitle,
            author: req.body.author,
            publisher: req.body.publisher,
            yearPublished: req.body.yearPublished,
            isbn: req.body.isbn
        };

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err) {
                return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
            }else{
                var dbo = client.db("library");

                dbo.collection("books").insertOne(bookData, function (err) {
                    if(err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
                    }else{
                        client.close();
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS"}));
                    }
                });
            }
        });
    });
                  
    app.get('/read-records', function (req, res) {

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) { 
           if(err) {
                return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
            }else{
                var dbo = client.db("library");

                dbo.collection("books").find({}).toArray(function (err, docs) {
                    if(err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
                    }else{
                        console.log("i am here.");
                        client.close();
                        return res.status(200).send(docs);
                    }
                });
            } 
        });
        
   });
   
    app.delete('/delete-record', function(req, res) {
       var deleteID = req.body.deleteID;
       
       MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) { 
           if(err) {
                return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
            }else{
                var dbo = client.db("library");
                
                if (ObjectId.isValid()) {
                    return res.status(200).send(JSON.stringify({msg: "Error: invalid id " + deleteID}));
                }

                dbo.collection("books").deleteOne({_id: ObjectId(deleteID)}, function (err, data) {
                    if(err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
                    }else{
                        client.close();
                        return res.status(200).send("SUCCESS");
                    }
                });
            } 
        });
    });
}
module.exports = services;