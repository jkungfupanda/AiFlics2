const express = require('express'); //importing express module
const { generateImage } = require('../controllers/openaiController'); //importing generateImage function from openaiController
const router = express.Router(); //create new instance of express Router

router.post('/generateimage', generateImage); //creating a post route for '/generateimage' endpoint and calling generateImage function

module.exports = router; //exporting the router
