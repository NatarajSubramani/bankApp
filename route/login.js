var bodyParser = require('body-parser');
var storage = require('node-persist');
storage.initSync();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var accountsArray = [];
module.exports = function (app) {
    //login route
    app.post('/login', urlencodedParser, function (req, res) {
        var user = getAccount(req.body.username, req.body.password);
        if (user === 'Please signup your details!') {
            res.render('signup.ejs');
        };//end of if statement
        res.send('Welcome ' + user + '!');
    })//end of post route
    
    //Signup route
    app.get('/signup', function (req, res) {
        res.render('signup.ejs');
    })

    app.post('/register', urlencodedParser, function (req, res) {
        var account = new CREATEACCOUNT(req.body.firstname, req.body.lastname, req.body.email, req.body.username, req.body.password);
        var saveAccountMsg = saveAccount(account);
        res.send(saveAccountMsg);
    })
    
    //Create new object using function construction
    function CREATEACCOUNT(firstname, lastname, email, username, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
    }
    
    //save account function
    function saveAccount(account) {
        accountsArray.push(account);
        storage.setItem('accountDetails', accountsArray);
        return 'Your details registered successfully!';
    }

    //get account function
    function getAccount(username, password) {
        var accounts = storage.getItem('accountDetails');

        if (typeof accounts === 'undefined') {
            return 'Please signup your details!'
        }//end of if statement
        else {
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i].username === username && accounts[i].password === password) {
                    return accounts[i].username;
                }//end of if statement
            
            }//end of for loop
            return 'Invalid Username and Password, Try again! '
        }//end of else statement
    }
}//end of module.exports function