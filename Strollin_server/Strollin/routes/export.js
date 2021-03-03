var express = require('express');
var router = express.Router();

const {
  UserModel
} = require("../models/user")


router.get('/export', async function(req, res) {

    getDocuments(db, function(docs) {
    
        console.log('Closing connection.');
        client.close();
        
        // Write to file
        try {
            fs.writeFileSync('out_file.json', JSON.stringify(docs));
            console.log('Done writing to file.');
        }
        catch(err) {
            console.log('Error writing to file', err)
        }
    });
    return res.status(200).send({status: "Account created successfully.", access_token: token});
    return res.status(400).send({status: "The entry is invalid."});
});

const getDocuments = function(db, callback) {
    const query = { };  // this is your query criteria
    db.collection("inCollection")
      .find(query)
      .toArray(function(err, result) { 
          if (err) throw err; 
          callback(result); 
    }); 
};
