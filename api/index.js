import express from 'express';
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mickey:mickey3108@ds129540.mlab.com:29540/askin";

var dbo;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database connected!");
  dbo = db.db("askin");
});

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ data: [] });
});

router.get('/get-data/:offset', (req, res) => {
	console.log('Streaming data API called');
	var offset =  parseInt(req.params.offset);
	dbo.collection("data").count({}, function(error, numOfDocs){
        if(error) return callback(error);
        var docLimit = numOfDocs/2;
        offset += docLimit;
        console.log('Offset: ' + offset);
        dbo.collection("data").find().skip(offset).limit(1).toArray(function(err, result) {
			if (err) throw err;
			if (typeof result !== 'undefined' && result.length > 0) {
				res.send(result[0]);
			}
			else{
				res.send(false);
			}
		});
    });
});

router.get('/get-data',(req,res) =>{
	console.log('Initial get data API called');
	dbo.collection("data").count({}, function(error, numOfDocs){
        if(error) return callback(error);
        var docLimit = numOfDocs/2;
        console.log('Document Limit:' + docLimit);
        dbo.collection("data").find().limit(docLimit).toArray(function(err, result) {
			if (err) throw err;
			res.send(result);
		});
    });
});

// function insertData(data){
// 	dbo.collection("data").insertOne(data, function(err, res) {
// 	    if (err) return err;
// 	    return true;
//   	});
// }

// router.post('/insert-data', (req, res) => {
// 	var arrayData = req.body;
// 	var resultData = arrayData.map(insertData);
// 	console.log(resultData);
//   	res.send(resultData);
// });


export default router;
