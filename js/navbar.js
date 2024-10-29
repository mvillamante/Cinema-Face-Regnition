//Seating Arrangement
var initializeNavbar = document.querySelector(".NavBarContainer");
initializeNavbar.innerHTML = `
<header>
    <link rel="stylesheet" href="css/navbar.css">
    <a href="index.html" class="logo">CineBio</a>
    <ul class="nav">
        <li><a href="index.html">Home</a></li>
        <li><a href="movie-viewer.html">Movies</a></li>
        <li><a href="movie-booking.html">Bookings</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">About Us</a></li>
    </ul>
    <div class="search">
        <input type="text" placeholder="Search">
        <i class="fa fa-search" aria-hidden="true"></i>
    </div>
</header>
`