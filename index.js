const fs = require("fs");
const express = require("express");

var app = require("express")();
var http = require("http").Server(app);
var bodyParser = require("body-parser");

var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

const space = `
`;

var key = process.env.KEY;
var nodemailer = require('nodemailer');
var encryptor = require('simple-encryptor')(key);

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreplyimpala@gmail.com',
    pass: process.env.PWD
  }
});

var read_write;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  const static_file_dir = __dirname + "/public/static/index.html";

  res.sendFile(static_file_dir);
});

app.post("/create_account", function(req, res) {
  const new_account_name = req.body.account_name;
  const new_account_pwd = req.body.account_password;
  const new_account_email = req.body.account_email;

  const new_account_dir = __dirname + '/database/accounts/' + new_account_name + '/';
  const new_pwd_dir = new_account_dir + 'email.txt';
  const new_email_dir = new_account_dir + 'pwd.txt';

  const file_already_exists = __dirname + '/templates/errors/error1.html';

  if (fs.existsSync(new_account_dir)) {
    fs.readFile(__dirname + '/static/index.html', 'utf8', function(err, data) {
      if (err) {
        console.err;
      }
      else{
        read_write = data;

        fs.readFileSync(file_already_exists, 'utf8', function(err, data) {
          if (err) {
            console.err;
          }
          else{
            read_write = read_write + data;
          }
        });
      }
    });

    const error1_data = fs.readFileSync(__dirname + '/public/static/index.html', 'utf8') + fs.readFileSync(__dirname + '/templates/errors/error1.html');

    res.send(error1_data);
  }
  else {
    fs.mkdir(new_account_dir, function(err) {
      if (err) {
        console.err;
      }
      else{
        console.log("Account CREATED.");
      }
    });

    fs.appendFile(new_pwd_dir, encryptor.encrypt(new_account_pwd), function(err) {
      if (err) {
        console.err;
      }
      else {
        console.log("pass");
      }
    });

    fs.appendFile(new_email_dir, encryptor.encrypt(new_account_email), function(err) {
      if (err) {
        console.err;
      }
      else {
        console.log("pass");
      }
    });

    mailOptions = {
      from : "noreplyimpala@gmail.com",
      to : new_account_email,
      subject : "Welcome!",
      text : "Welcome to the Fictional Real Estate Trader!"
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      }
      else {
        console.log("Email sent: " + info.response);
      }
    });

    res.redirect("/dashboard");
  }
});

app.post("/login", function(req, res) {
  const login_account_name = req.body.account_name;
  const login_pwd = req.body.account_pwd;

  const login_dir = __dirname + '/database/accounts/' + login_account_name;
  const pwd_dir = __dirname + '/database/accounts/' + login_account_name + '/pwd.txt';

  if (fs.existsSync(login_dir)) {
    fs.readFile(pwd_dir, 'utf8', function(err, data) {
      if (err) {
        console.err;
      }
      else {
        if (encryptor.decrypt(data) == login_pwd) {
          res.send();
        }
        else {
          const error3 = fs.readFileSync(__dirname + '/public/static/index.html', 'utf8') + fs.readFileSync(__dirname + '/templates/errors/error3.html', 'utf8');

          res.send(error3);
        }
      }
    });
  }
  else{
    const error2 = fs.readFileSync(__dirname + '/public/static/index.html', 'utf8') + fs.readFileSync(__dirname + '/templates/errors/error2.html', 'utf8');

    res.send(error2);
  }
});

app.get("/recover", function(req, res) {
  res.sendFile(__dirname + '/public/static/recover.html');
});

app.post("/sendrecoveryemail", function(req, res) {
  const account_recovery_name = req.body.recovery_account;
  const account_recovery_email = req.body.recovery_email;

  const account_recovery_dir = __dirname + '/database/accounts/' + account_recovery_name + '/';
  const account_recovery_email_dir = account_recovery_dir + 'email.txt';
  const account_recovery_pwd_dir = account_recovery_dir + 'pwd.txt';

  if (fs.existsSync(account_recovery_dir)) {
    var decrypted_recovery_email = fs.readFileSync(account_recovery_email_dir, 'utf8');

    decrypted_recovery_email = encryptor.decrypt(decrypted_recovery_email);

    if (encryptor.decrypt(decrypted_recovery_email) == account_recovery_email) {
      const verified_pwd_recover = encryptor.decrypt(fs.readFile(account_recovery_pwd_dir, 'utf8', function(err, data) {
        if (err) {
          console.err;
        }
        else{
          console.log(encryptor.decrypt(data));
        }
      }));

      recoveryEmail = {
        from : "noreplyimpala@gmail.com",
        to : account_recovery_email,
        subject : "Account Recovery",
        text : "Your password is: " + verified_pwd_recover
      };

      transporter.sendMail(recoveryEmail, function(error, info) {
        if (error) {
          console.log(error);
        }

        else {
          console.log("Recovery email sent: " + info.response);

          const recovery_status_send = fs.readFileSync(__dirname + '/public/static/recover.html', 'utf8') + fs.readFileSync(__dirname + '/templates/responses/response1.html', 'utf8');

          res.send(recovery_status_send);
        }
      });
    }
    
    else {
      const error5 = fs.readFileSync(__dirname + '/public/static/recover.html', 'utf8') + fs.readFileSync(__dirname + '/templates/errors/error5.html', 'utf8');

      res.send(error5);
    }
  }
  else {
    const error4 = fs.readFileSync(__dirname + '/public/static/recover.html', 'utf8') + fs.readFileSync(__dirname + '/templates/errors/error4.html', 'utf8');

    res.send(error4);
  }
});

app.get("/account-recovery", function(req, res) {
  res.sendFile(__dirname + '/public/static/recover.html');
});

app.post("/send-recovery-email", function(req, res) {
  const recovery_account_backup_name = req.body.recovery_account;

  const recovery_account_backup_dir = __dirname + '/database/accounts/' + recovery_account_backup_name + '/';
  const recovery_account_backup_email_dir = recovery_account_backup_dir + 'email.txt';
  const recovery_account_backup_pwd_dir = recovery_account_backup_dir + 'pwd.txt';

  if (fs.existsSync(recovery_account_backup_dir)) {
    const backup_email_contents = fs.readFileSync(recovery_account_backup_email_dir, 'utf8');
    const backup_pwd_contents = fs.readFileSync(recovery_account_backup_pwd_dir, 'utf8');

    const backup_email_decipher = encryptor.decrypt(backup_email_contents);
    const backup_pwd_decipher = encryptor.decrypt(backup_pwd_contents);

    const backupRecovery = {
      from : "noreplyimpala@gmail.com",
      to : backup_pwd_decipher,
      subject : "Account Recovery",
      text : "Your Account's password: " + backup_email_decipher
    }

    transporter.sendMail(backupRecovery, function(error, info) {
      if (error) {
        console.log(error);
      }
      else {
        console.log("Recovery email sent: " + info.response);
      }
    });

    const response1 = fs.readFileSync(__dirname + '/public/static/recover.html', 'utf8') + fs.readFileSync(__dirname + '/templates/responses/response1.html', 'utf8');

    res.send(response1);
  }
  else {
    const error4 = fs.readFileSync(__dirname + '/public/static/recover.html', 'utf8') + fs.readFileSync(__dirname + '/templates/errors/error4.html', 'utf8');

    res.send(error4);
  }
});

app.get("/dashboard", function(req, res) {
  const view1 = fs.readFileSync(__dirname + '/templates/views/view1.html', 'utf8');

  res.sendFile(__dirname + '/templates/views/view1.html');
});

app.post("/check_login", function(req, res) {
  const fetched_username = req.body.fetch_username;
  const fetched_password = req.body.fetch_password;

  const fetched_dir = __dirname + '/database/accounts/' + fetched_username + '/';
  const fetched_password_dir = fetched_dir + '/pwd.txt';

  if (fs.existsSync(fetched_dir)) {
    const deciphered_fetch_pwd = encryptor.decrypt(fs.readFileSync(fetched_password_dir, 'utf8'));

    if (deciphered_fetch_pwd == fetched_password) {
      res.send("check?=passed");
    }
    else {
      res.send("check?=failed");
    }
  }
  else {
    const error6 = fs.readFileSync(__dirname + '/templates/errors/error6.html');

    res.send(error6);
  }
});

http.listen(port, function(){
  console.log("listening on *:" + port);
});