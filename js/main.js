const isLoggedIn = false;
const authLink = document.getElementById("auth-link");
if (authLink) {
  authLink.textContent = isLoggedIn ? "Logout" : "Login";
  authLink.setAttribute("href", isLoggedIn ? "logout.html" : "login.html");
}

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.file).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = orig, 1500);
    });
  });
});
