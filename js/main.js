const authLink = document.getElementById("auth-link");
if (authLink) {
  authLink.textContent = "Login";
}
document.querySelectorAll('.copy-btn')?.forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.file || 'download.txt').then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = orig, 1500);
    });
  });
});
