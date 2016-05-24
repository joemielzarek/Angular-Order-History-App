var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {


  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT addresses.customer_id, orders.id, order_date, street, city, state, zip, line_items.unit_price, line_items.quantity, description  FROM orders ' +
                  'JOIN addresses ON orders.address_id = addresses.id ' +
                  'JOIN line_items ON line_items.order_id = orders.id ' +
                  'JOIN products ON line_items.product_id = products.id ' +
                  'ORDER BY order_date ASC',
      function(err, result) {
      done();
      console.log(result.rows);

      res.send(result.rows);

    });
  });
});

module.exports = router;
