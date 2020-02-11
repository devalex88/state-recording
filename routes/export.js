var fs = require('fs');
var express = require('express');

var router = express.Router();
var { Client } = require('pg');

router.post('/', function (req, res, next) {
    var client = new Client();
    client.connect();
    client.query(
        "select b.sequence from (select a.page_session as id, array_agg(ARRAY[a.action || ' ' || a.target] order by a.time) as sequence from action a group by a.page_session) b",
        [],
        (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(result.rows)
            }
            var json = JSON.stringify(result.rows);
            fs.writeFileSync('C:\\tmp\\patterns.json', json);
            client.end();
            res.sendStatus(200);
        }
    );
});

module.exports = router;
