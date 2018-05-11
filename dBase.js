var mongo=require('mongodb');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://admin:omarwas98@ds117200.mlab.com:17200/users';

function check(user,pass,callback) {
	connect('users',(collection)=>{
		collection.find({"user":user,"pass":pass}).toArray((err,docs)=>{
  		assert.equal(null, err);
  		var result=docs.length;
  		if (result==1) {
		  	callback(true,docs[0])
		  }else {
		  	callback(false,null);
		  }
		});
	})
}

function checkById(id,callback) {
	connect('users',(collection)=>{
		var o_id = new mongo.ObjectID(id);
		collection.find({"_id":o_id}).toArray((err,docs)=>{
  		assert.equal(null, err);
  		var result=docs.length;
  		if (result==1) {
		  	callback(true,docs[0]);
		  }else {
		  	callback(false,null);
		  }
		});
	})
}

function connect(colName,callback) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		var collection=db.collection(colName)
		callback(collection);
		db.close();
	})
}

module.exports={
	"Check":check,
	"CheckById":checkById
}