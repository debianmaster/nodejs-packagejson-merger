#! /usr/bin/env node
var fs = require("fs"),
    path = require("path"),
    async = require('async'),
    objectMerge = require('object-merge');

var cwd = process.cwd();
var masterPackageJson={
    "name": "package-merger-dummy",
    "version": "1.0.0",
    "dependencies":{

    }
};

fs.readdir(cwd, function (err, files) {
    var folders=[];
    if (err) {
        throw err;
    }
    async.each(files,function(file,cb){
        if(fs.statSync(file).isDirectory() && fs.existsSync(path.join(cwd,file,"package.json"))){
            masterPackageJson.dependencies  = objectMerge(objectMerge.dependencies,require(path.join(cwd,file,"package.json")).dependencies);
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