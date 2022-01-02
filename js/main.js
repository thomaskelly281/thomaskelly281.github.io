/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "clamp(200px,18vw,900px)";
    document.getElementById("main").style.marginLeft = "20vw";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  // document.getElementById('greeting').innerHTML = new Date().getHours() >= 8 ? 'Good Evening.' : 'Good Afternoon.' , 'Good Morning.';


  document.getElementById('greeting').innerHTML = new Date().getHours() <= 12 ? 'Good Afternoon.' : 'Good Evening.';