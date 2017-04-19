var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
router.get('/:id', function (req, res) {
    // Validate that req.params.id is 16 bytes hex string
    // Get the stored image type for this image
    var id = req.params.id;
    res.sendFile(path.resolve('./uploads/'+id));
});

module.exports = router;