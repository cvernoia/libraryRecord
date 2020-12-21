const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId;

const dbURL = process.env.DB_URI || "mongodb://localhost";

var services = function (app) {
    app.post('/write-library', function (req, res) {
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
   
    app.get('/type-records', function (req, res) {
        console.log(req.query.author)
        
        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) { 
           if(err) {
                return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
            }else{
                var dbo = client.db("library");

                dbo.collection("books").find({author: req.query.author}).toArray(function (err, docs) {
                    if(err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
                    }else{
                        console.log(docs);
                        client.close();
                        return res.status(200).send(docs);
                    }
                });
            } 
        });
    
    });
   
    app.delete('/delete-record', function(req, res) {
       var deleteID = req.query.deleteID;
       console.log(req.query);
       
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
    
    app.put('/update-record', function (req, res) {
        var deleteID = req.query.deleteID;
        let updateParams = {};
        if (req.query.bookTitle) updateParams.bookTitle = req.body.bookTitle;
        if (req.query.author) updateParams.author = req.body.author;
        if (req.query.publisher) updateParams.publisher = req.body.publisher;
        if (req.query.yearPublished) updateParams.yearPublished = req.body.yearPublished;
        if (req.query.isbn) updateParams.isbn = req.body.isbn;


        console.log(req.body)
        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err) {
                return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
            }else{
                var dbo = client.db("library");

                dbo.collection("books").updateOne({_id: ObjectId(deleteID)}, { $set: updateParams }, function (err) {
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
}
module.exports = services;