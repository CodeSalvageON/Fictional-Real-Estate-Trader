console.log("pass");

axios.post("/check_login", {
  fetch_username : localStorage.getItem("username"),
  fetch_password : localStorage.getItem("password")
})
.then(function(response) {
  this.info = response.data;

  console.log(this.info);

  if (this.info == "exists?=false") {
    location = "https://FRET.codesalvageon.repl.co";
  }
  else if (this.info == "check?=failed") {
    location = "https://FRET.codesalvageon.repl.co";
  }
  else if (this.info == "check?=passed") {
    console.log("based");

    return false;
  }
  else{
    console.log("pass");

    return false;
  }
})
.catch(function(error) {
  if (error) {
    console.log(error);
  }
});