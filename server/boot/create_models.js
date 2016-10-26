'use strict';

var async = require('async');

module.exports = function (app) {
    var localMysqlDs = app.dataSources.localMysql;

    var treeModel = app.models.tree;
    var treeTypesModel = app.models.tree_types;

    async.parallel({
        treeTypes: async.apply(createTreeTypes),
        trees: async.apply(createTrees)
    }, function(err, results) {
        if (err) throw err;
        console.log(results);
        //createLinks(results.reviewers, results.coffeeShops, function(err) {
        //    console.log('> models created sucessfully');
        //});
    });

    function createTreeTypes(cb) {
        localMysqlDs.automigrate('tree_types', function (err) {
            if (err) throw err;

            treeTypesModel.create([
                {name: 'Персик'},
                {name: 'Орех'},
                {name: 'Яблоня'},
                {name: 'Мандарин'}
            ], cb);
        });
    }

    function createTrees(cb) {
        localMysqlDs.automigrate('tree', function (err) {
            if (err) throw err;

            treeModel.create([
                {name: 'oak north'},
                {name: 'apple south'}
            ], cb);
        });
    }

    function createLinks(xs, ys, cb) {

    }

};

