var express = require('express');
var uuidv4 = require('uuid/v4');
var { Client } = require('pg');

var router = express.Router();

router.post('/', function (req, res, next) {
    console.log(req.body);
    var client = new Client();
    client.connect();
    var data = req.body;
    var id = uuidv4();
    client.query(
        'INSERT INTO action(id, action, target, page_session, time) VALUES($1, $2, $3, $4, to_timestamp($5)) RETURNING *',
        [id, data.action, data.target, data.page_session, data.time / 1000],
        (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(result.rows[0])
            }
            client.end();
            res.sendStatus(200);
        }
    );
});

module.exports = router;
