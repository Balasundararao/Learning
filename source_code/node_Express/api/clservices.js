/*jshint unused: true, node: true */
module.exports = function(mymodel) {
    var express    = require('express'), 
    fs    = require("fs"),
    q     = require('q'), 
    path  = require("path"),
    jsdom = require('jsdom'),
    router= express.Router();

    router.get('/',      clcomponents);    
    router.get('/:id',   clcomponentById);  

    function findComponentVariations(path, regex, filename){
      	var variations   = "";
      	var variationsArr= [];
      	var jsStr        = "";
      	
      	try { 
        		var data      = fs.readFileSync(path, 'utf-8');
        		variations    = data.match(regex);
        		for(var i=0;i<variations.length;i++){
        			if(variationsArr.indexOf(variations[i])==-1){
      				variationsArr.push(variations[i]);	  				
        			}else{}
        		}
        	}catch(err){
      		variationsArr.push(filename);
      	}	
      	try{
      		jsStr += "\""+ filename+"\":[";
      		if(typeof variationsArr === 'object'){
      			for(var j=0; j<variationsArr.length;j++){
      				jsStr +="\""+ variationsArr[j] +"\"";
      				if(j != (variationsArr.length - 1)){
      					jsStr +=",";
      				} 	
      			}
      		}else{
      			jsStr +="\""+ variationsArr +"\"";
      		}
      		jsStr += "],";	
      	}catch(err){
      	}
      	return jsStr;
    }

    function clcomponents(req, res) {
        //var assetPath = "/etc/designs/cdc/fw/w/cl";
        var assetPath="/Applications/XAMPP/htdocs/Projects_Current/jmincluder/includer/etc/designs/cdc/fw/w/clw";
        var lookforcomponents = /[a-zA-Z]+/;
        var cmpArr   = [];
        var str_json, successJsonResponse, errorJsonResponse = "";
        
        try{
  		  stats = fs.lstatSync(assetPath);
  		  if(stats.isDirectory()){
          filenames = fs.readdirSync(assetPath);
          str_json="{";
          for( i = 0; i < filenames.length; i++) {
              if(filenames[i].indexOf('.') !== -1 || filenames[i].indexOf('CVS') !== -1) {
              } else {
                  cmpName = filenames[i].match(lookforcomponents);
                  var RegExp       = eval('/'+filenames[i]+'v\\d/g');
                  var pathq      = assetPath +'/'+filenames[i]+'/'+filenames[i]+'.css';
                  if(cmpArr.indexOf(cmpName[0]) == -1){
                      cmpArr.push(cmpName[0]);
                      if(cmpArr.length  > 1) {str_json =  str_json.substr( 0, str_json.length-1); str_json += "},"; }
                      str_json       += "\"" +cmpName[0] +"\":" +"{";
                      str_json       += findComponentVariations(pathq, RegExp ,filenames[i]);
                  }else{
                      str_json       += findComponentVariations(pathq, RegExp ,filenames[i]);
                  }
                  if( i==( filenames.length-1) ) { str_json =  str_json.substr( 0, str_json.length-1);}
              }
          }// end for ... 
          str_json += "}}";
          
          successJsonResponse = '{"clservice":{"resultCode":0,"resultMsg":"Success", "list":';
          successJsonResponse += str_json;        
          successJsonResponse += '}}';
          res.jsonp(successJsonResponse);
  		  }	
  		  }catch(e)
  		  {
          errorJsonResponse = '{"clservice":{"resultCode":1,"resultMsg":"Failure"' + e + '"}}"';
          res.jsonp(errorJsonResponse);
          }
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
