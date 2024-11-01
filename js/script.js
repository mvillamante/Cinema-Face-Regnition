

// switch to homepage
function switchToHomePage() {

    const username = localStorage.getItem('currentUser');
    const adminPattern = /^admin-\d+$/;
    let accountType;

    if (username && adminPattern.test(username.toLowerCase())) {
        accountType = 'admin';
    } else {
        accountType = 'user';
    }

    localStorage.setItem('accountType', accountType);
    console.log(accountType);
    if (accountType === 'user') {
        window.location.href = 'homepage.html';
    } else if (accountType === 'admin') {
        window.location.href = 'movie-booking.html';
    }
}


//signup function
async function signUp(event) {
    event.preventDefault();

    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const passwordRegEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    //password validation
    if (!passwordRegEx.test(password)) {
        alert('Password must contain at least one uppercase letter, one number, and be at least 8 characters long.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Password does not match.');
        return;
    }

    const adminPattern = /^admin-\d+$/;

    if (adminPattern.test(username.toLowerCase())) {
        alert("This username is reserved. Please choose another username.")
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const result = await res.text();

        if (!res.ok) {
            alert(result)
        } else {
            alert(result);
            localStorage.setItem('currentUser', username);
            setTimeout(() => {
                window.location.href = 'user-info.html';
            }, 500);
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again later.');
    }
}

//signin function
async function signIn(event) {
    event.preventDefault();

    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;

    try {
        const res = await fetch('http://localhost:3000/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const result = await res.text();

        if (!res.ok) {
            alert(result)
        } else {
            alert(result);
            localStorage.setItem('currentUser', username);
            switchToHomePage();
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again later.');
    }
}

// save user info
async function saveUser(event) {
    event.preventDefault();

    const username = localStorage.getItem('currentUser');
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const cellphoneNum = document.getElementById('cellphoneNum').value;

    try {
        const res = await fetch('http://localhost:3000/api/saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, firstName, lastName, email, cellphoneNum })
        });
        const result = await res.text();
        alert(result);
        switchToHomePage();
    } catch (err) {
        console.error('Error saving user:', err);
        alert('An error occurred while saving the user.');
    }
}

// handle timeslot
function handleTimeslotClick(event) {

    const timeslots = document.querySelectorAll('.timeslot');
    let selectedTime; // Variable to store the selected time slot

    timeslots.forEach(slot => {
        slot.addEventListener('click', function () {
            // Remove 'active' class from all timeslots
            timeslots.forEach(s => s.classList.remove('active'));

            // Add 'active' class to the clicked timeslot
            this.classList.add('active');

            // Update the selectedTime variable with the clicked timeslot's text content
            selectedTime = this.textContent;
        });
    });
}

// book a ticket function
async function bookTickets(event) {
    event.preventDefault();

    const username = localStorage.getItem('currentUser');
    let selectedSeatList = document.getElementById('selectedSeatDisplay').textContent.split(', ').filter(seat => seat !== 'None');
    let fullName = '';
    const movieId = "M00001";
    const selectedDate = document.getElementById('date-select').value;
    const movieTitle = "Inside Out 2";

    try {
        const res = await fetch('http://localhost:3000/api/retrieveFullName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username })
        });

        if (res.ok) {
            const data = await res.json();
            fullName = data.join(' ');
        } else {
            const errorText = await res.text();
            console.error('Error retrieving user:', errorText);
            alert('An error occurred while retrieving the user.');
            return;
        }

    } catch (err) {
        console.error('Error retrieving user:', err);
        alert('An error occurred while retrieving the user.');
    }

        let convertedTime = '';
        //Change time text to its equivalent time format 
        if (selectedTime == '2:30pm-4:10pm') {
            convertedTime = '14:30:00';
        } else if (selectedTime == '5:20pm-7:00pm') {
            convertedTime = '17:20:00';
        }

        if (!selectedSeatList || !selectedDate) {
            alert("Booking details are incomplete.");
            return;
        }

        const bookingDateTime = `${selectedDate} ${convertedTime}`;

        const confirmationMessage = `
            Booking Confirmation:
            ---------------------
            Name: ${fullName}
            Movie: ${movieTitle} 
            Seats: ${selectedSeatList}
            Date & Time: ${bookingDateTime}
        `;

        if (!confirm(confirmationMessage + "\n\nDo you want to proceed?")) {
            return;
    }
    try {
        const requestBody = {
            username, 
            movieId,
            selectedSeats: selectedSeatList,
            bookingDateTime
        };

        console.log(requestBody);

        const res = await fetch('http://localhost:3000/api/bookTickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody), // Use the defined body object here
        });

        if (res.ok) {
            const result = await res.text();
            alert(result);
            window.location.href = 'movie-booking.html';
        } else {
            console.error('Error booking tickets:', await res.text());
        }

    } catch (err) {
        console.error('Error booking tickets:', err);
        alert('An error occurred while booking the tickets.');
    }
}