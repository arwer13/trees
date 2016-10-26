'use strict';

module.exports = function(app) {
  app.dataSources.localMysql.automigrate('tree', function(err) {
    if (err) throw err;

    app.models.tree.create([
        {name: 'oak north'},
        {name: 'apple south'}
    ], function(err, tree) {
      if (err) throw err;
      console.log('Models created: \n', tree);
    });
  });
};

