var button_check_url = "https://fret.codesalvageon.repl.co/check_login";

fetch(button_check_url, {
  method : "POST",
  headers: {  
    "Content-type" : "application/x-www-form-urlencoded"  
  },  
  body : "fetch_username=" + localStorage.getItem("username") + "&fetch_password=" + localStorage.getItem("password")
})
.then(function(data) {
  return data.text();
})
.then(function(response) {
  var x = response;

  console.log(x);

  if (x == "check?=failed") {
    return false;
  }
  else if (x == "check?=passed") {
    document.getElementById("buttons").innerHTML = "<button class='box'>Buy</button><button class='box'>Sell</button><button class='box'>Other</button>";
  }
  else if (x == "exists?=false") {
    return false;
  }
});