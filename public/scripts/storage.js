$("#signup-form").submit(function() {
  localStorage.setItem("username", document.getElementById("new_account_name").value);
  localStorage.setItem("password", document.getElementById("new_account_password"));
});

$("#login-form").submit(function() {
  localStorage.setItem("username", document.getElementById("login_account_name").value);
  localStorage.setItem("password", document.getElementById("login_password_name").value);
});