// CHECK IF THE ACCOUNT IS USER OR ADMIN (temporary)
var accountType = 'user';


// Movie Links
const buyTicketLink = document.querySelector('#buyticket-link');
const remindMeLink = document.querySelector('#remindMe-link');

// Movies Section Content (USERS)
function getMovieBookingsHTML() {
    return `
        <div class="bookings-container">
            <!-- Inside Out 2 Booking -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="./images/movies/inside-out-2-poster.jfif" alt="Inside Out 2">
                        <span class="card-title">Inside Out 2</span>
                    </div>
                    <div class="card-action">
                        <a href="movie-viewer.html" class="btn-small red-color">
                            <i class="fa-solid fa-ticket-simple" style="font-size: 14px;"></i>&nbsp;&nbsp;Buy Ticket
                        </a>            
                    </div>
                </div>
            </div>
        
            <!-- Deadpool and Wolverine Booking -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="./images/movies/deadpool-and-wolverine-poster.png" alt="Deadpool and Wolverine">
                        <span class="card-title">Deadpool and Wolverine</span>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn-small red-color" style="cursor: not-allowed;">
                            <i class="fa-solid fa-ticket-simple" style="font-size: 14px;"></i>&nbsp;&nbsp;Buy Ticket
                        </a>            
                    </div>
                </div>
            </div>
            
            <!-- Despicable Me 4 Booking -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="./images/movies/despicable-me-4-poster.jfif" alt="Despicable Me 4">
                        <span class="card-title">Despicable Me 4</span>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn-small red-color" style="cursor: not-allowed;">
                            <i class="fa-solid fa-ticket-simple" style="font-size: 14px;"></i>&nbsp;&nbsp;Buy Ticket
                        </a>            
                    </div>
                </div>
            </div>
    
            <!-- Smile 2 Booking -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="./images/movies/smile-2-poster.jpg" alt="Smile 2">
                        <span class="card-title">Smile 2</span>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn-small red-color" style="cursor: not-allowed;">
                            <i class="fa-solid fa-ticket-simple" style="font-size: 14px;"></i>&nbsp;&nbsp;Buy Ticket
                        </a>            
                    </div>
                </div>
            </div>
    
            <!-- Anyone But You Booking -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="./images/movies/anyone-but-you-poster.jpg" alt="Anyone But You">
                        <span class="card-title">Anyone But You</span>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn-small red-color" style="cursor: not-allowed;">
                            <i class="fa-solid fa-ticket-simple" style="font-size: 14px;"></i>&nbsp;&nbsp;Buy Ticket
                        </a>            
                    </div>
                </div>
            </div>
        </div>
    `;
}

var initializeMainContainer = document.querySelector(".MainContainer");
// Movies Interface (USER)
if(accountType == 'user' ){
    // Initial Display
    initializeMainContainer.innerHTML = getMovieBookingsHTML();

    //If Movies NavBar is clicked
    buyTicketLink.addEventListener('click', function(event) {
        //event.preventDefault(); // Prevent the default link behavior
        initializeMainContainer.innerHTML = getMovieBookingsHTML();
    });
    //If Bookings NavBar is clicked
    remindMeLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        initializeMainContainer.innerHTML = `
            <div class="bookings-container">
                <!-- Inside Out 2 Booking -->
                <!--<div class="col s12 m6 l4">
                    <div class="card">
                        <div class="card-image">
                            <img src="./images/movies/inside-out-2-poster.jfif" alt="Inside Out 2">
                            <span class="card-title">Inside Out 2</span>
                        </div>
                        <div class="card-content">
                            <p><strong>Date:</strong> October 15, 2024</p>
                            <p><strong>Time:</strong> 7:00 PM</p>
                            <p><strong>Seats:</strong> A12, A13</p>
                            <p><strong>Cinema:</strong> 1</p>
                        </div>
                        <div class="card-action">
                            <a href="#" class="btn-small red-color"><i class="fa-regular fa-bell" style="font-size: 14px;"></i>&nbsp;&nbsp;Remind Me</a>            
                        </div>
                    </div>
                </div>-->
            </div>
        `
    });
} else if(accountType == 'admin'){ // Movies Interface (USER)
    // Display Cinema Number Options
    initializeMainContainer.innerHTML = `
        <div class="bookings-container">
            <!-- THEATER 1 -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image" id="choosecinema-link" style="cursor: pointer;">
                        <img src="images/cinema-coverphoto.jpeg" alt="Cinema 1">
                        <span class="card-title" style="font-weight: bold;">Cinema 1</span>
                    </div>
                </div>
            </div>
    
            <!-- THEATER 2 -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image" >
                        <img src="images/cinema-coverphoto.jpeg" alt="Cinema 2">
                        <span class="card-title" style="font-weight: bold;">Cinema 2</span>
                    </div>
                </div>
            </div>
            
            <!-- THEATER 3 -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="images/cinema-coverphoto.jpeg" alt="Cinema 3">
                        <span class="card-title" style="font-weight: bold;">Cinema 3</span>
                    </div>
                </div>
            </div>
    
            <!-- THEATER 4 -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="images/cinema-coverphoto.jpeg" alt="Cinema 4">
                        <span class="card-title" style="font-weight: bold;">Cinema 4</span>
                    </div>
                </div>
            </div>
    
            
        </div>
    `;
}
// Direct User to Inside Out for Booking
const chooseCinemaLink = document.querySelector('#choosecinema-link');
chooseCinemaLink.addEventListener('click', function(event) {
    //event.preventDefault(); // Prevent the default link behavior
    initializeMainContainer.innerHTML = `
        <div class="bookings-container">
            <!-- Inside Out 2 Booking -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="./images/movies/inside-out-2-poster.jfif" alt="Inside Out 2">
                        <span class="card-title">Inside Out 2</span>
                    </div>
                    <div class="card-action">
                        <a href="movie-viewer.html" class="btn-small red-color"><i class="fa-solid fa-clapperboard"></i>
&nbsp;&nbsp;Manage Movie</a>            
                    </div>
                </div>
            </div>
        </div>
    `
});

