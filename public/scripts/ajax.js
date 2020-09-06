function json(response) {
  return response.json();
}

var request_url = "https://fret.codesalvageon.repl.co/check_login";

fetch(request_url, {
  method : "POST",
  headers : {  
    "Content-type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin" : "no-cors"
  }, 
  body : "fetch_username=" + localStorage.getItem("username") + "&fetch_password=" + localStorage.getItem("password")
})
.then(function (response) {
  return response.text();
})
.then(function (data) {
  console.log(data);

  even_more_parsed_data = data;

  console.log(even_more_parsed_data);

  if (even_more_parsed_data == "exists?=false") {
    location.href = "https://fret.codesalvageon.repl.co/";
  }
  else if (even_more_parsed_data == "check?=pass") {
    console.log("pass");
  }
  else if (even_more_parsed_data == "check?=failed") {
    location.href = "https://fret.codesalvageon.repl.co/";
  }
})
.catch(function (error) {
  console.log("Failed, ", error);
});