'use strict';

function clickHandler (db) {
    var clicks = db.collection('clicks');

    // get
    this.getClicks = (req, res) => {
        var clickProjection = { '_id': false };
        clicks.findOne({}, clickProjection, (err, result) => {
            if(err) {
                throw err;
            } 
            if(result) {
                res.json(result);
            } else {
                clicks.insert({ 'clicks': 0 }, (err, ) => {
                    if(err) {
                        throw err;
                    }
                    clicks.findOne({}, clickProjection, (err, doc) => {
                        if(err) { throw err; }
                        res.json(doc);
                    })
                });
            }
        });
    };
    // add
    this.addClick = function (req, res) {
        clicks.findAndModify(
            {},
            { '_id': 1 },
            { $inc: { 'clicks': 1 } }, // ++1
            function (err, result) {
                if (err) { throw err; }

                res.json(result);
            }
        );
    };
    // update 0
    this.resetClicks = function (req, res) {
        clicks.update(
            {},
            { 'clicks': 0 },
            function (err, result) {
                if (err) { throw err; }

                res.json(result);
            }
        );
    }; 
}

export default clickHandler