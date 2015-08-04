/*jshint unused: true, node: true */
module.exports = function(mymodel) {
    var express    = require('express');
    var q = require('q'); 
    var router = express.Router();

    router.get('/',      clcomponents);    
    router.get('/:id',   clcomponentById);  

    function clcomponents(req, res) {
      res.send('root');
      /**
      q.when(service.getReport(), function (report) {
        res.json(report);
      }, function (reason) {
        res.json(reason);
      });
      */
  };
  function clcomponentById(req, res) {
      res.send('root/id1');
      /**
      // peel off /api/git/mergeReport/conflict
      var path = url.parse(req.url).pathname.substr(29);
      service.getConflict(path).then(function (result) {
        res.write(result);
        res.end();
      }, function (reason) {
        res.json(reason);
      }); */
    };
  return router;
};
