

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
        inputBox.onkeyup = function () {
            let result = [];
            let input = inputBox.value;

            if (input.length) {
                result = availKeyWords.filter((keyword) => {
                    return keyword.toLowerCase().includes(input.toLowerCase());
                });

                resultBox.innerHTML = "";
                display(result);

                if (!result.length) {
                    resultBox.innerHTML = "";
                }

            } else {
                resultBox.innerHTML = "";
            }
        }

        function display(result) {
            const content = result.map((item) => {
                return `<li>${item}</li>`;
            });
            resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";

            // Add click event listeners to each item
            const listItems = resultBox.querySelectorAll("li");
            listItems.forEach(item => {
                item.onclick = function() {
                    inputBox.value = item.textContent; // Set the input box value to the clicked item

                    // Check if the clicked item is 'Inside Out 2' to redirect
                    if (item.textContent === 'Inside Out 2') {
                        window.location.href = 'movie-viewer.html';
                    }
                };
            });
        }
        
    }
}

// log out function 
function logOut() {
    localStorage.clear();
    window.location.href = 'index.html';
}

if (accountType === 'user') {
    initializeNavbar.innerHTML = `
    <header>
        <link rel="stylesheet" href="css/navbar.css">
        <a href="index.html" class="logo">CineBio</a>
        <ul class="nav">
            <li><a href="homepage.html">Home</a></li>
            <li><a href="movie-booking.html">Movies</a></li>
            <li><a href="booking-history.html">Bookings</a></li>
            <li><a href="profile.html" onclick="sessionStorage.setItem('loadProfile', 'true')">Profile</a></li>
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

} else if (accountType === 'admin') {
    initializeNavbar.innerHTML = `
    <header>
        <link rel="stylesheet" href="css/navbar.css">
        <a href="index.html" class="logo">CineBio</a>
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

// Initialize autocomplete after injecting navbar content
initializeAutocomplete();

//profile function
async function viewProfile() {
    event.preventDefault();
    const username = localStorage.getItem('currentUser');
    const userName = document.getElementById('profile-uName');
    const fName = document.getElementById('profile-fName');
    const lName = document.getElementById('profile-lName');
    const email = document.getElementById('profile-email');
    const cellNo = document.getElementById('profile-cellNo');

    try {
        const res2 = await fetch('http://localhost:3000/api/retrieveInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username })
        });
        const response = await res2.json();

        const fullName = response[2].split(' ');
        response.splice(2, 1, ...fullName);

        userName.textContent = response[0];
        fName.textContent = response[2];
        lName.textContent = response[3];
        email.textContent = response[1];
        cellNo.textContent = response[4];

    } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again later.');
    }
}

window.onload = function() {
    if (sessionStorage.getItem('loadProfile') === 'true') {
        viewProfile();
        sessionStorage.removeItem('loadProfile'); // Clear the flag after loading
    }
};