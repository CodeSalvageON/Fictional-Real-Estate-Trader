var balance_url = "https://FRET.codesalvageon.repl.co/check_balance";

fetch(balance_url, {
  method : "POST",
  headers: {  
    "Content-type": "application/x-www-form-urlencoded"  
  },  
  body : "checking_username=" + localStorage.getItem("username")
})
.then(function(data) {
  return data.text();
})
.then(function(response) {
  console.log(response);

  document.getElementById("buy-balance").innerText = document.getElementById("buy-balance").innerText + response + " " + "Rafts";
})
.catch(function(err) {
  if (err) {
    console.err;
  } 
});