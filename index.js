#! /usr/bin/env node
var fs = require("fs"),
    path = require("path"),
    async = require('async');

var cwd = process.cwd();

var masterPackageJson={
    "name": "package-merger-dummy",
    "version": "1.0.0",
    "dependencies":{

    }
};

function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

fs.readdir(cwd, function (err, files) {
    var folders=[];
    if (err) {
        throw err;
    }
    async.each(files,function(file,cb){
        if(fs.statSync(file).isDirectory() && fs.existsSync(path.join(cwd,file,"package.json"))){
            masterPackageJson.dependencies  = merge_options(masterPackageJson.dependencies,require(path.join(cwd,file,"package.json")).dependencies);
            cb(null);
        }
        else{
            cb(null);
        }
    }, function (err) {
        delete masterPackageJson.createOptions;
        console.log(JSON.stringify(masterPackageJson,0,4));
    })
});
