

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
            window.location.href = 'booking-history.html';
        } else {
            console.error('Error booking tickets:', await res.text());
        }

    } catch (err) {
        console.error('Error booking tickets:', err);
        alert('An error occurred while booking the tickets.');
    }
}

//reflect on booking history
async function fetchBooking(event) {
    event.preventDefault();

    const username = localStorage.getItem('currentUser');

    try {
        const res = await fetch('http://localhost:3000/api/getLatestBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username })
        });
        
        if (res.ok) {
            const bookingDetails = await res.json();
            const seatingTableBody = document.querySelector('#seatingTable tbody');

            // Clear existing rows (except for the placeholder row)
            seatingTableBody.innerHTML = '';

            bookingDetails.forEach(booking => {
                const row = document.createElement('tr');

                const movieTitleCell = document.createElement('td');
                movieTitleCell.textContent = booking.movieTitle;

                const seatNoCell = document.createElement('td');
                seatNoCell.textContent = booking.seatNo;

                const bookingTime = booking.bookingTime;
                let convertedTime = bookingTime === '14:30:00' ? "2:30pm-4:10pm" : "5:20pm-7:00pm";

                const movieTimeCell = document.createElement('td');
                movieTimeCell.textContent = convertedTime;

                const seatCountCell = document.createElement('td');
                seatCountCell.textContent = booking.seatNo.split(',').length;

                const remindButtonCell = document.createElement('td');
                const remindButton = document.createElement('button');
                remindButton.classList.add('btn-small', 'red-color');
                remindButton.innerHTML = '<i class="far fa-bell" style="font-size: 14px;"></i>&nbsp;&nbsp;Remind Me';
                remindButtonCell.appendChild(remindButton);

                row.append(movieTitleCell, seatNoCell, movieTimeCell, seatCountCell, remindButtonCell);
                seatingTableBody.appendChild(row);
            });
        } else {
            console.error('Error fetching booking history:', await res.text());
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

//Seating Information Dropdown
async function toggleDropdown() {
    const content = document.querySelector('.seating-content');
    const title = document.querySelector('.seating-title');

    // Toggle between adding/removing the "open" class to seating-content
    content.classList.toggle('open');

    let selectedDate = document.querySelector('.date-select');
    if (content.classList.contains('open') &&  selectedDate.value ==='') {
        title.innerHTML = 'Seating Information ▲';
        await fetchSeatingInfo();
    } else {
        title.innerHTML = 'Seating Information ▼';
        const seatingTableBody = document.querySelector('#seatingTable tbody');
        console.log("Dropdown closed, clearing table.");
        seatingTableBody.innerHTML = ''; // Clear the table content when closing
    }
}



//fetch seating info
async function fetchSeatingInfo() {
    console.log("executed");
    try {
        const res = await fetch('http://localhost:3000/api/getSeatingInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (res.ok) {
            console.log("Response:", res);
            const bookings = await res.json();
            console.log("Book:", bookings);
            const seatingTableBody = document.querySelector('#seatingTable tbody');
            seatingTableBody.innerHTML = '';

            // Clear the registeredSeatsData
            registeredSeatsData.length = 0;

            // Populate registeredSeatsData with bookings
            bookings.forEach(booking => {
                registeredSeatsData.push({
                    name: booking.fullName,
                    seatNo: booking.seatNo,
                    quantityNo: booking.quantityNo || booking.seatNo.split(',').length, // Count of seats
                    timeAssigned: booking.bookingTime === '14:30:00' ? "2:30pm-4:10pm" : "5:20pm-7:00pm", // Adjust time format
                    dateAssigned: booking.bookingDate
                });
            });

            // Render the updated registeredSeatsData
            registeredSeatsData.forEach(entry => {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = entry.name;

                const dateCell = document.createElement('td');
                dateCell.textContent = entry.dateAssigned;

                const timeCell = document.createElement('td');
                timeCell.textContent = entry.timeAssigned;

                const seatNoCell = document.createElement('td');
                seatNoCell.textContent = entry.seatNo;

                const quantityCell = document.createElement('td');
                quantityCell.textContent = entry.quantityNo;

                row.append(nameCell, dateCell, timeCell, seatNoCell, quantityCell);
                seatingTableBody.appendChild(row);
            });
        } else {
            console.error('Error fetching booking data:', await res.text());
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

document.addEventListener('DOMContentLoaded', fetchBooking);