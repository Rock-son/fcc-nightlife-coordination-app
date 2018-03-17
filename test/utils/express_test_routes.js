"use strict"

const app = require("../../server").app;

    app.get('/', function(req, res) {
        res.status(404).send({
              error: "Page not found.",
              name: "Todo App v1.0"
         });
      });

    app.get('/users', function(req, res) {
          res.status(200).json([
              {
                name: "Mike",
                age: 27
            },
            {
                name: "Andrew",
                age: 25
            },
            {
                name: "Jen",
                age: 30
            }
        ]);
    });

    app.get('/user', function(req, res) {
        res.status(200).json(
            {
              name: "Andrew",
              age: 27,
              profession: "financial advisor"
          }
      );
    });

module.exports.app = app;
