/*Package declaration for usage*/
var express = require('express');
var app = express();

var router = express.Router();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

/*Loads routes defined in the below modules.*/
var painService = require('./routes/pain-entry');
var userService = require('./routes/user-entry');
var activityService = require('./routes/activity-entry');
var assesmentService = require('./routes/assessment-entry');
var adminService = require('./routes/admin-entry');
var authService = require('./routes/addUser-entry');
var addUserService = require('./routes/user-details');
var api = '/api/v1';
var db = require('./modals/database');
/*Configuring the app to use bodyParser, which lets us get the data from a POST*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*Enabling CORS -- Cross-Origin Resource Sharing*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*Services, defines the endpoints PATH's to access the RESTful resources*/
router.use('/pain-entries', painService);
router.use('/user', userService);
router.use('/authentication', authService);
router.use('/userDetails', addUserService);
router.use('/activity-entries',activityService);
router.use('/assessment-entries',assesmentService);
router.use('/admin', adminService);
app.use(api, router);


app.get('/', function (req, res, next) {
    res.sendFile( __dirname + '/public/index.html');
});

app.get('/admin', function (req, res, next) {
    res.sendFile( __dirname + '/public/admin_page.html');
});


//app.use(express.static(__dirname + "/public"));

app.get('/login',function (req,res) {
    console.log("Received GET request");
});

app.post('/login',function (req,res) {
        console.log(req.body);
    db.query("SELECT user_name FROM admin WHERE user_name='" + req.body.user_name + "' AND password='" + req.body.password + "'", function (err, doc) {
        try {
            console.log('Data received from Db:\n');
            console.log(doc[0]);
            if (doc[0] != undefined)
                res.json(true);
            else
                res.json(null)
        } catch (err) {
            console.log("error  while fetching from db:", err.stack);
        }
    });
});


app.listen(3000);
console.log("server running on port 3000");

