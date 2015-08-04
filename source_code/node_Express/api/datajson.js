/*jshint unused: true, node: true */
module.exports = function(mymodel) {
  var express    = require('express');
  var url = require('url');
  var fs = require('fs');
  var jf = require('jsonfile');
  var router = express.Router();

  router.get('/*',      datajsona);    

  function datajsona(req, res) {
    // peel off /data/ (to get the filename to load, silly!)
    var pathname = url.parse(req.url).pathname,
    path = pathname,
    //file_name = __dirname + '/data' + path;
    file_name =  'data' + path;    

    console.log(file_name);
    
    fs.exists(file_name, function (exists) {
      if (exists) {
      console.log("exists");
      /*jslint stupid: true */
      var object = jf.readFileSync(file_name);
      console.log("iam here");
      console.log(object);
      res.json(object);
      /*jslint stupid: false */
      }else{
        console.log("does not exists");
      }
    });
  };
  return router;
};
