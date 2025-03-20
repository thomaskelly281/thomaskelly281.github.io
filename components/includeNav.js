document.addEventListener('DOMContentLoaded', function() {
    fetch('/components/nav.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('nav-component').innerHTML = data;
      });
  }); 