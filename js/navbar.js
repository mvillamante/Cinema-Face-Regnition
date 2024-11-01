// CHECK IF THE ACCOUNT IS USER OR ADMIN (temporary)
var accountType = localStorage.getItem('accountType');
var currentUser = localStorage.getItem('currentUser');

var initializeNavbar = document.querySelector(".NavBarContainer");

function initializeAutocomplete() {
    let availKeyWords = [
        'Anyone but You',
        'Deadpool and Wolverine',
        'Despicable Me 3',
        'Inside Out 2',
        'Smile 2',
    ];

    const resultBox = document.querySelector(".result-box");
    const inputBox = document.getElementById("input-box");

    if (inputBox && resultBox) {
        inputBox.onkeyup = function() {
            let result = [];
            let input = inputBox.value;

            if (input.length) {
                result = availKeyWords.filter((keyword) => {
                    return keyword.toLowerCase().includes(input.toLowerCase());
                });

                resultBox.innerHTML = "";

                result.forEach((item) => {
                    const div = document.createElement("div");
                    div.textContent = item;
                    resultBox.appendChild(div);
                });

                console.log(result);
                display(result);

                if (!result.length) {
                    resultBox.innerHTML = "";
                }

            } else {
                resultBox.innerHTML = "";
            }
        }

        function display(result) {
            const content = result.map((list) => {
                return "<li onclick=selectInput(this)>" + list + "</li>";
            });
            resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
        }

        function selectInput(list) {
            inputBox.value = list.innerHTML;
        }
    }
}

// log out function 
function logOut() {
    localStorage.clear();
    window.location.href='index.html';
}

if (accountType === 'user') {
    initializeNavbar.innerHTML = `
    <header>
        <link rel="stylesheet" href="css/navbar.css">
        <a href="index.html" class="logo">CineBio</a>
        <ul class="nav">
            <li><a href="homepage.html">Home</a></li>
            <li><a href="movie-booking.html" id="buyticket-link">Movies</a></li>
            <li><a href="movie-booking.html" id="remindMe-link">Bookings</a></li>
            <li><a href="profile.html">Profile</a></li>
        </ul>
        <div class="search">
            <input type="text" id="input-box" placeholder="Search" autocomplete="off">
            <i class="fa fa-search" aria-hidden="true"></i>
            <div class="result-box"></div>
        </div>
        <div class="user-greeting">
            <span id="username-display">Greetings, ${currentUser}!</span><i class="fa fa-chevron-down" aria-hidden="true"></i>
        <div class="dropdown">
            <button onclick="logOut()">Logout</button>
        </div>
        </div>
    </div>
    </header>
    `;

} else if (accountType === 'admin') {
    initializeNavbar.innerHTML = `
    <header>
        <link rel="stylesheet" href="css/navbar.css">
        <a href="index.html" class="logo">CineBio</a>
        <ul class="nav">
        <li><a href="#">About Us</a></li>
        </ul>
        <div class="search">
            <input type="text" id="input-box" placeholder="Search" autocomplete="off">
            <i class="fa fa-search" aria-hidden="true"></i>
            <div class="result-box"></div>
        </div>
        <div class="user-greeting">
            <span id="username-display">Greetings, ${currentUser}!</span><i class="fa fa-chevron-down" aria-hidden="true"></i>
        <div class="dropdown">
            <button onclick="logOut()">Logout</button>
        </div>
        </div>
    </header>
    `;
    
    console.log(currentUser);
}

// function displayUsername() {
//     var username = localStorage.getItem('username');

//     var usernameDisplay = document.querySelector("#username-display");
//     usernameDisplay.textContent = username;
// }

// Initialize autocomplete after injecting navbar content
initializeAutocomplete();