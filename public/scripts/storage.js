$("#signup-form").submit(function() {
  localStorage.setItem("username", document.getElementById("new_account_name").value);
  localStorage.setItem("password", document.getElementById("new_account_password"));

  alert(localStorage.getItem("username"));
});

$("#login-form").submit(function() {
  localStorage.setItem("username", document.getElementById("login_account_name").value);
  localStorage.setItem("password", document.getElementById("login_password_name").value);

  alert(localStorage.getItem("username"));
});

function signUp() {
  localStorage.setItem("username", document.getElementById("new_account_name").value);
  localStorage.setItem("password", document.getElementById("new_account_password"));
}

function logIn() {
  localStorage.setItem("username", document.getElementById("login_account_name").value);
  localStorage.setItem("password", document.getElementById("login_password_name").value);
}