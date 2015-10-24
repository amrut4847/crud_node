console.log('hello');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'crud-akproject.rhcloud.com',
  user     : 'adminN7BPCzL',
  password : '7qGxii1KRRgm',
  database :'crud'
});
connection.connect();
var express = require('express');
var app = express();
var expressHbs = require('express3-handlebars');
var bodyParser = require('body-parser')//npm install --save body-parser 
var Upload = require('upload-file');

app.engine('html', expressHbs({extname:'.html'}));
app.set('view engine', '.html');

app.use(bodyParser.urlencoded({    // to support URL-encoded bodies
  extended: true
}));

//Page Routes starts
//index page employee listing
app.get('/', function(req, res) {
  res.redirect('/employee');
});


app.post('/add/complete', function(req, res) {
  var upload = new Upload({
    dest: 'dest/path',
    maxFileSize: 100 * 1024 *1024,
    acceptFileTypes: /(\.|\/)(gif|jpe?g|png|mp4|psd)$/i,
    rename: function(name, file) {
      console.log(this.fields);
      return file.filename;
    }
  });
 
  /*upload.on('end', function(fields, files) {
    if (!fields.channel) {
      this.cleanup();
      this.error('Channel can not be empty');
      return;
    }
    res.send('ok')
  });*/
 
  upload.on('error', function(err) {
    res.send(err);
  });
 
  upload.parse(req);
});




//insert/update data into database
/*app.post('/add/complete', function(req, res) {
    // var Kitten = req.Kitten;

    var fname = req.body.fname;
    var email_id =req.body.email_id;

    var hiddenId =req.body.hiddenId;
    console.log('hiddenId = '+hiddenId);
    
    if(hiddenId!=""){
             connection.query("UPDATE  employee SET name='"+fname+"',email_id='"+email_id+"' WHERE id ="+hiddenId,function(err) {
    if (err) throw err;
       });
    console.log(fname); // PROBLEM: it returns empty, while I expect req.body
    console.log(email_id);
    res.redirect('/employee');
    }else{
       // var abc = req.query['fname'];
    connection.query("INSERT INTO employee (name,email_id) values ('"+fname+"','"+email_id+"')",function(err) {
     if (err) throw err;
    });
    console.log(fname); // PROBLEM: it returns empty, while I expect req.body
    console.log(email_id);
    res.redirect('/employee');   
    }
});
*/
//create view render route
app.get('/create', function(req, res){
  res.render('user/create');
});

//employee listing fetch from db
app.get('/employee', function(req, res){
	var thedata = "";
	 connection.query("SELECT * FROM employee ORDER BY date desc", function(error, results, fields) {
		var data = {list: results};
		res.render('user/employee', data);
		console.log(data);
	  });
});

//edit fetch records from db
app.get('/edit', function(req, res){
	var thedata = "";
	//console.log(req);
	 connection.query("SELECT * FROM employee where id="+req.query.id, function(error, results, fields) {
		var data = {list: results};
    res.render('user/create', data);
		console.log(data);
	  });
});

//update records in db
/*app.post('/edit/complete', function(req, res) {
    // var Kitten = req.Kitten;
    var hiddenId = req.body.hiddenId;
    var fname = req.body.fname;
    var email_id =req.body.email_id;
   // var abc = req.query['fname'];
     connection.query("UPDATE  employee SET name='"+fname+"',email_id='"+email_id+"' WHERE id ="+hiddenId,function(err) {
    if (err) throw err;
       });
    console.log(fname); // PROBLEM: it returns empty, while I expect req.body
    console.log(email_id);
    res.redirect('/employee');
});*/

//delete records in db
app.get('/delete', function(req, res){
   connection.query("DELETE FROM employee where id='"+req.query.id+"'", function(err) {
    if (err){ throw err;
       }else{
        res.redirect('/employee');
       }
    });
});
app.listen(4000);
