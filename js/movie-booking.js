var accountType = localStorage.getItem('accountType');

//for movie booking page
var initializeMainContainer = document.querySelector(".MainContainer");

// Movies Interface (USER)
if(accountType == 'user' ){
    // Initial Display
    initializeMainContainer.innerHTML = `
        <div class="bookings-container">
            <!-- Inside Out 2 Booking -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="./images/movies/inside-out-2-poster.jfif" alt="Inside Out 2">
                        <span class="card-title"><strong>Inside Out 2</strong></span>
                    </div>
                    <div class="card-action">
                        <a href="movie-viewer.html" class="btn-small red-color">
                            <i class="fas fa-ticket-simple" style="font-size: 14px;"></i>&nbsp;&nbsp;Buy Ticket
                        </a>            
                    </div>
                </div>
            </div>
        
            <!-- Deadpool and Wolverine Booking -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="./images/movies/deadpool-and-wolverine-poster.png" alt="Deadpool and Wolverine">
                        <span class="card-title"><strong>Deadpool and Wolverine</strong></span>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn-small red-color" style="cursor: not-allowed;">
                            <i class="fas fa-ticket-simple" style="font-size: 14px;"></i>&nbsp;&nbsp;Buy Ticket
                        </a>            
                    </div>
                </div>
            </div>
            
            <!-- Despicable Me 4 Booking -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="./images/movies/despicable-me-4-poster.jfif" alt="Despicable Me 4">
                        <span class="card-title"><strong>Despicable Me 4</strong></span>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn-small red-color" style="cursor: not-allowed;">
                            <i class="fas fa-ticket-simple" style="font-size: 14px;"></i>&nbsp;&nbsp;Buy Ticket
                        </a>            
                    </div>
                </div>
            </div>
    
            <!-- Smile 2 Booking -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="./images/movies/smile-2-poster.jpg" alt="Smile 2">
                        <span class="card-title"><strong>Smile 2</strong></span>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn-small red-color" style="cursor: not-allowed;">
                            <i class="fas fa-ticket-simple" style="font-size: 14px;"></i>&nbsp;&nbsp;Buy Ticket
                        </a>            
                    </div>
                </div>
            </div>
    
            <!-- Anyone But You Booking -->
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="./images/movies/anyone-but-you-poster.jpg" alt="Anyone But You">
                        <span class="card-title"><strong>Anyone But You</strong></span>
                    </div>
                    <div class="card-action">
                        <a href="#" class="btn-small red-color" style="cursor: not-allowed;">
                            <i class="fas fa-ticket-simple" style="font-size: 14px;"></i>&nbsp;&nbsp;Buy Ticket
                        </a>            
                    </div>
                </div>
            </div>
        </div>
    `;

} else if(accountType == 'admin'){ // Movies Interface (ADMIN)
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
                        <a href="movie-viewer.html" class="btn-small red-color"><i class="fas fa-clapperboard"></i>&nbsp;&nbsp;Manage Movie</a>            
                    </div>
                </div>
            </div>
        </div>
    `
});