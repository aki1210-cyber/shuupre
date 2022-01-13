var express = require('express');
var router = express.Router();
const app = express();
/* GET users listing. */
router.get('/', function(req, res) {
    delete req.session.user_id
    delete req.session.user_name
    res.redirect("/")
});

module.exports = router;
