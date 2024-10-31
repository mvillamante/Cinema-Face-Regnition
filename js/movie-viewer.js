// DUMMY DATA FOR TABLE
const registeredSeatsData = [
    { name: 'Mewo Lee', facePhoto: '/images/stakeholder-melo.jpg', seatNo: 'G11', quantityNo: '1', timeAssigned: '5:20pm-7:00pm', dateAssigned: '2024-10-30'},
    { name: 'Meo Ling', facePhoto: '/images/stakeholder-melo.jpg', seatNo: 'G10, D13', quantityNo: '2', timeAssigned: '2:30pm-4:10pm', dateAssigned: '2024-10-30' },
    { name: 'Meyo Wii', facePhoto: '/images/stakeholder-melo.jpg', seatNo: 'G9, I12, J4', quantityNo: '3', timeAssigned: '2:30pm-4:10pm', dateAssigned: '2024-10-30' },
    { name: 'Me Lo', facePhoto: '/images/stakeholder-melo.jpg', seatNo: 'G8, A10, A13, B15', quantityNo: '4', timeAssigned: '5:20pm-7:00pm', dateAssigned: '2024-10-30' },
]; 

// CHECK IF THE ACCOUNT IS USER OR ADMIN (temporary)
var accountType = localStorage.getItem('accountType');

//Seating Arrangement
var initializeSeats = document.querySelector(".DivisionContainer");
initializeSeats.innerHTML = `
<div class="DivisionContainer">
    <div class="alpNum">
        <div class="numbering" data-row-size="2" data-col-size="1" data-top-gap-size="70" data-start-at="0" data-mode="alp"></div>
        <div class="numbering" data-row-size="4" data-col-size="1" data-top-gap-size="25" data-start-at="2" data-mode="alp"></div>
        <div class="numbering" data-row-size="4" data-col-size="1" data-top-gap-size="24" data-start-at="6" data-mode="alp"></div>
    </div>
    <div class="SeatContainer">

        <div class="numbering" data-row-size="1" data-col-size="18" data-gap-size="10" data-start-at="0" data-mode="num"></div>

        <div class="subSeatContainer" data-row-size="1" data-col-size="10" data-gap-size="10" data-bot-gap-size="0" data-start-number="5" data-start-letter="A"></div>
        <div class="subSeatContainer" data-row-size="1" data-col-size="12" data-gap-size="10" data-top-gap-size="10" data-start-number="4" data-start-letter="B"></div>
        
        <div class="subSeatWrapper" style="display: flex; justify-content: space-between; gap: 98px;">
            <div class="subSeatContainer" data-row-size="4" data-col-size="7" data-top-gap-size="10" data-bot-gap-size="25" data-start-number="2" data-start-letter="C"></div>
            <div class="subSeatContainer" data-row-size="4" data-col-size="7" data-top-gap-size="10" data-bot-gap-size="25" data-start-number="11" data-start-letter="C"></div>
        </div>

        <div class="subSeatContainer" data-row-size="4" data-col-size="18" data-start-number="1" data-start-letter="G"></div>

        <div class="numbering" data-row-size="1" data-col-size="18" data-gap-size="10" data-start-at="0" data-mode="num"></div>
    </div>
    <div class="alpNum">
        <div class="numbering" data-row-size="2" data-col-size="1" data-top-gap-size="70" data-start-at="0" data-mode="alp"></div>
        <div class="numbering" data-row-size="4" data-col-size="1" data-top-gap-size="25" data-start-at="2" data-mode="alp"></div>
        <div class="numbering" data-row-size="4" data-col-size="1" data-top-gap-size="24" data-start-at="6" data-mode="alp"></div>
    </div>
</div>
`

// Only Show Specific Functions if (Admin or User)
var initializeShowcase = document.querySelector(".cinema-details");
var initializeSeatDetails = document.querySelector(".seating-details");
var initializeSidepageSummary = document.querySelector(".sidepage-summary");
if (accountType === 'user') {
    initializeSeatDetails.style.display = 'none';
    initializeSidepageSummary.style.display = 'none';
    initializeShowcase.innerHTML = `
    <div class="cinema-content">
        <div>
            <label>Available Seats:</label><label class="availableSeats"></label>
        </div>
        <div>
            <label>Total Seats:</label><label class="totalSeats"></label> 
        </div>
    </div>
    `
} else if (accountType === 'admin'){
    var labels1 = document.querySelectorAll(".sidepage-margin-text");
    var labels2 = document.querySelectorAll(".sidepage-center-text");
    var btn1 = document.querySelector(".btnSeats");

    labels1.forEach(label => { label.style.display = 'none'; });
    labels2.forEach(label => { label.style.display = 'none'; });
    btn1.style.display = 'none';

    initializeShowcase.style.display = 'none';
    initializeSidepageSummary.innerHTML = `
        <div>
            <label class="sidepage-text">Available Seats:</label><br/><label class="availableSeats"></label>
        </div>
        <div>
            <label class="sidepage-text">Total Seats:</label><br/><label class="totalSeats"></label> 
        </div>
    `
}

// Initialize selected date and time
let selectedDate = document.getElementById("date-select").value;
let selectedTime = document.querySelector(".timeslot.active").innerText;

// Update selected date on change
document.getElementById("date-select").addEventListener("change", function() {
    document.querySelector(".selectedSeats").innerHTML = 0;
    selectedDate = this.value;

    if (accountType === 'admin') {
        updateSeatingTable(selectedDate, selectedTime);
    }

    updateSeatingDisplay(selectedDate, selectedTime); //Update Seating Display Colors
    clearSeatDisplay(); //clear selected seats display

    updateSeating(selectedDate, selectedTime); //Update Total And Available Text

});

// Handle timeslot clicks
document.querySelector(".timeslots-content").addEventListener("click", function(e) {
    if (e.target.classList.contains("timeslot")) {
        document.querySelector(".selectedSeats").innerHTML = 0;
        document.querySelector(".timeslot.active").classList.remove("active");
        e.target.classList.add("active");
        selectedTime = e.target.innerText;

        if (accountType === 'admin') {
            updateSeatingTable(selectedDate, selectedTime);
        }

        updateSeatingDisplay(selectedDate, selectedTime); //Update Seating Display Colors
        clearSeatDisplay(); //clear selected seats display

        updateSeating(selectedDate, selectedTime); //Update Total And Available Text

    }
});


// Function to update the seating display based on taken seats
function updateSeatingDisplay(selectedDate, selectedTime) {
    var takenSeats = extractTakenSeats(selectedDate, selectedTime); 
    const allSeatElements = document.querySelectorAll('.seatCon');

    allSeatElements.forEach(seat => {
        const seatNumber = seat.getAttribute('data-seat-pos'); 
        if (takenSeats.includes(seatNumber)) {
            seat.setAttribute('data-seat-status', 'Occupied'); // Mark seat as occupied
            seat.classList.add('occupied');
        } else {
            seat.setAttribute('data-seat-status', 'Free'); // Mark seat as free
            seat.classList.remove('occupied'); // Remove occupied styling
        }
    });

    // Disable seats based on their status if the user is an admin
    if (accountType === 'admin') {
        const allSeats = document.querySelectorAll('.seatCon');
        allSeats.forEach(seat => {
            const seatStatus = seat.getAttribute('data-seat-status');
            if (seatStatus === 'Free' || seatStatus === 'Selected') {
                seat.classList.add('disabled-seat');
            } else {
                seat.classList.remove('disabled-seat'); // Ensure it is not disabled if occupied
            }
        });
    }
}
// Function to extract all seat numbers from registeredSeatsData
function extractTakenSeats(selectedDate, selectedTime) {
    // Filter registeredSeatsData based on selectedDate and selectedTime
    const matchedSeats = registeredSeatsData.filter(seat => {
        const assignedDates = seat.dateAssigned.split(',').map(s => s.trim());
        const assignedTimes = seat.timeAssigned.split(',').map(s => s.trim());

        return assignedDates.includes(selectedDate) && assignedTimes.includes(selectedTime);
    });

    // Extract seat numbers from the matched data
    return matchedSeats.flatMap(seat => seat.seatNo.split(',').map(s => s.trim()));
}


// Extracting all seat numbers from registeredSeatsData
const takenSeats = extractTakenSeats(selectedDate, selectedTime);

// Initialize seating
var seatElements = document.querySelectorAll(".subSeatContainer");
var availableSeats = 150;
var selectedSeats = 0;

// Initialize Available and Total Seats Text
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".totalSeats").innerHTML = "150";
    updateAvailableSeatsDisplay();
});

function initializeSeating() {
    seatElements.forEach(function (seatElement) {
        var rowSize = seatElement.dataset.rowSize;
        var colSize = seatElement.dataset.colSize;
    
        seatElement.style.gridTemplateColumns = `repeat(${colSize}, 1fr)`;
        seatElement.style.gridTemplateRows = `repeat(${rowSize}, 1fr)`;
        seatElement.style.margin = `${seatElement.dataset.gapSize}px`;
        seatElement.style.marginTop = `${seatElement.dataset.topGapSize}px`;
        seatElement.style.marginBottom = `${seatElement.dataset.botGapSize}px`;
    
        var startNumber = parseInt(seatElement.dataset.startNumber);
        var startLetter = seatElement.dataset.startLetter.charCodeAt(0);
    
        for (let i = 0; i < rowSize; i++) {
            for (let j = 0; j < colSize; j++) {
                const seatNum = startNumber + j;
                const seatChar = String.fromCharCode(startLetter + i);
    
                var seat = document.createElement("div");
                seat.setAttribute("class", "seatCon");
                seat.setAttribute("data-seat-status", `${takenSeats.includes(seatChar + seatNum) ? (() => {
                    availableSeats -= 1;
                    return 'Occupied';
                })() : 'Free'}`);
                seat.setAttribute("data-seat-pos", `${seatChar}${seatNum}`);
                seat.innerHTML = `${seatChar}${seatNum}`;
    
                seat.addEventListener("click", handleSeatClick);
                seatElement.appendChild(seat);
    
                if (accountType === 'admin') {
                    const allSeats = document.querySelectorAll('.seatCon');
                    allSeats.forEach(seat => {
                        const seatStatus = seat.getAttribute('data-seat-status');
                        if (seatStatus === 'Free' || seatStatus === 'Selected') {
                            seat.classList.add('disabled-seat');
                        }
                    });
                }
            }
        }
    });
}
// Initialize numbering and letters on the side
var numbering = document.querySelectorAll(".numbering");
numbering.forEach(function (numbering) {
    var rowSize = numbering.dataset.rowSize;
    var colSize = numbering.dataset.colSize;

    numbering.style.gridTemplateColumns = `repeat(${colSize}, 1fr)`;
    numbering.style.gridTemplateRows = `repeat(${rowSize}, 1fr)`;
    numbering.style.margin = `${numbering.dataset.gapSize}px`;
    numbering.style.marginTop = `${numbering.dataset.topGapSize}px`;
    numbering.style.marginBottom = `${numbering.dataset.botGapSize}px`;

    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < colSize; j++) {
            var nums = document.createElement("div");
            nums.setAttribute('class', 'numbers');
            nums.innerHTML = (numbering.dataset.mode === 'num') ? j + 1 : String.fromCharCode('A'.charCodeAt(0) + parseInt(numbering.dataset.startAt) + i);
            numbering.appendChild(nums);
        }
    }
});

function handleSeatClick() {
    const currentStatus = this.dataset.seatStatus;
    const seatPos = this.dataset.seatPos;

    // Array to store selected seats
    let selectedSeatList = document.getElementById('selectedSeatDisplay').textContent.split(', ').filter(seat => seat !== 'None');
    
    // Find the seating content element
    const content = document.querySelector('.seating-content');

    if (currentStatus === 'Occupied') {
        // Only toggle dropdown when it is close
        if (!content.classList.contains('open')) {
            toggleDropdown();
        }

        // Find the corresponding row in the seating information table
        const rowToScrollTo = Array.from(document.querySelectorAll('#seatingTable tbody tr')).find(row => {
            const seatCell = row.cells[3]; // The seat number is in the 4th cell (index 3)
            return seatCell.textContent === seatPos; // Match seat position
        });

        if (rowToScrollTo) {
            // Scroll to the row if found
            rowToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'center' });
            console.log('Navigated to taken seat information:', seatPos);
            
            // Highlight the row
            rowToScrollTo.classList.add('highlight');
            
            // Remove highlight after 1s
            setTimeout(() => {
                rowToScrollTo.classList.remove('highlight');
            }, 1000);
        }
    } else if(accountType === 'user') {
        this.dataset.seatStatus = (currentStatus === 'Free') ? (() => {
            document.querySelector(".selectedSeats").innerHTML = ++selectedSeats;
            console.log('clicked');
            
            // Add the clicked seat to selectedSeatList
            selectedSeatList.push(seatPos);
            
            // Update the display
            updateSeatDisplay(selectedSeatList);

            return 'Selected';
        })() : (currentStatus === 'Selected') ? (() => {
            document.querySelector(".selectedSeats").innerHTML = --selectedSeats;
            
            // Remove the seat from selectedSeatList
            selectedSeatList = selectedSeatList.filter(seat => seat !== seatPos);
            
            // Update the display
            updateSeatDisplay(selectedSeatList);

            return 'Free';
        })() : currentStatus;

        const hiddenField = document.querySelector(".HiddenFieldDataHere");
        let seatList = hiddenField.innerHTML.split(',');
        seatList = (currentStatus === 'Free') ? (() => {
            seatList.push(seatPos);
            return seatList;
        })() : (() => {
            const index = seatList.indexOf(seatPos);
            if (index !== -1) {
                seatList.splice(index, 1);
            }
            return seatList;
        })();

        hiddenField.innerHTML = seatList.join(',');
        localStorage.setItem("selectedSeats", seatList.join(','));
    } 
}


// Function to sort seat numbers
function sortSeatList(seatList) {
    return seatList.sort((a, b) => {
        const letterA = a.charAt(0);
        const numberA = parseInt(a.slice(1));
        const letterB = b.charAt(0);
        const numberB = parseInt(b.slice(1));

        // Sort first by letter, then by number
        if (letterA === letterB) {
            return numberA - numberB;
        }
        return letterA.localeCompare(letterB);
    });
}


// Function to update the 'Selected Seats' and 'Price' in sidepage
function updateSeatDisplay(selectedSeatList) {
    if (selectedSeatList.length === 0) {
        document.getElementById('selectedSeatDisplay').textContent = 'None';
        return;
    }

    //update the displayed PRICE
    updatePrice(selectedSeatList.length);

    // Sort the selected seats
    selectedSeatList = sortSeatList(selectedSeatList);

    // Update the display
    document.getElementById('selectedSeatDisplay').textContent = selectedSeatList.join(', ');
}
function clearSeatDisplay() {
    let selectedSeatList = document.getElementById('selectedSeatDisplay').textContent.split(', ').filter(seat => seat !== 'None');
    selectedSeatList.length = 0;
    document.getElementById('selectedSeatDisplay').textContent = 'None';

    //reset the displayed PRICE
    updatePrice(0);
}


// Function to update the 'Available Seats' in sidepage
function updateSeating(selectedDate, selectedTime) {
    const takenSeats = extractTakenSeats(selectedDate, selectedTime);
    availableSeats = 150 - takenSeats.length; 
    
    // Update the available seats display
    updateAvailableSeatsDisplay();
}
function updateAvailableSeatsDisplay() {
    const availableSeatsElements = document.querySelectorAll(".availableSeats");

    availableSeatsElements.forEach(element => {
        element.innerHTML = availableSeats;
    });
}


// Function to update the 'Price' in sidepage
function updatePrice(noOfSeats) {
    const defaultPricePerSeat = 345;
    const totalPrice = noOfSeats * defaultPricePerSeat;

    const formattedPrice = `₱${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.querySelector(".price-textcontent").innerHTML = formattedPrice;
}

// Toggle Active in Time Slot
const timeslots = document.querySelectorAll('.timeslot');
timeslots.forEach(slot => {
    slot.addEventListener('click', function() {
        // Remove 'active' class from all timeslots
        timeslots.forEach(s => s.classList.remove('active'));

        // Add 'active' class to the clicked timeslot
        this.classList.add('active');
    });
});

// Update Seating Information Details (Admin)
function updateSeatingTable(selectedDate, selectedTime) {
    const takenSeats = extractTakenSeats(selectedDate, selectedTime);
    const seatingTableBody = document.querySelector('#seatingTable tbody');
    seatingTableBody.innerHTML = ''; // Clear previous entries

    // Create a mapping to group seat entries by name
    const groupedSeats = {};

    // Loop through each seat in registeredSeatsData
    registeredSeatsData.forEach(seat => {
        // Split seat numbers in case of multiple seats booked
        const seatNumbers = seat.seatNo.split(',').map(s => s.trim());

        // Check if any of the booked seat numbers are in the list of taken seats
        const matchedSeats = seatNumbers.filter(seatNumber => takenSeats.includes(seatNumber));
        
        if (matchedSeats.length > 0) {
            // If the name already exists, append the matched seats
            if (groupedSeats[seat.name]) {
                groupedSeats[seat.name].seats.push(...matchedSeats);
            } else {
                // Initialize a new entry for this name
                groupedSeats[seat.name] = {
                    facePhoto: seat.facePhoto,
                    quantityNo: seat.quantityNo,
                    seats: matchedSeats,
                };
            }
        }
    });

    // Now add rows to the seating table body
    Object.entries(groupedSeats).forEach(([name, data]) => {
        // Sort the seats to be displayed
        data.seats = sortSeatList(data.seats);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td><img src="${data.facePhoto}" alt="Face Photo"></td>
            <td>${data.seats.join(', ')}</td> <!-- Display all matched seat numbers -->
            <td>${data.quantityNo}</td>
        `;
        seatingTableBody.appendChild(row);
    });
}

//Seating Information Dropdown
function toggleDropdown() {
    const content = document.querySelector('.seating-content');
    const title = document.querySelector('.seating-title');

    // Toggle between adding/removing the "open" class to seating-content
    content.classList.toggle('open');

    // Change the arrow in the title based on dropdown state
    if (content.classList.contains('open')) {
        title.innerHTML = 'Seating Information ▲';
    } else {
        title.innerHTML = 'Seating Information ▼';
    }
}

//PAYMENT (BOOK SEATS)
function BookTickets(){
    // Retrieving multiple items from localStorage
    const userName = localStorage.getItem("userName"); // "Melo Lee"
    const bookedSeats = localStorage.getItem("bookedSeats"); // "A1,A2,B1"
    const bookingDate = localStorage.getItem("bookingDate"); // "2024-10-30"
    const bookingTime = localStorage.getItem("bookingTime"); // "2:30pm-4:10pm"

    let convertedTime = '';
    //Change time text to its equivalent time format 
    if(bookingTime == '2:30pm-4:10pm'){
        convertedTime = '14:30:00';
    } else if(bookingTime == '5:20pm-7:00pm'){
        convertedTime = '17:20:00';
    }
    const bookingDateTime = `${bookingDate} ${convertedTime}`;

    //gawa ka pop-up na ididisplay mga values na 'to
    //irerekta na sa DB afterwards
    // insert/update userName, bookedSeats, bookingDateTime

    localStorage.setItem("userName", "John Doe");
    localStorage.setItem("bookedSeats", seatList.join(','));
    localStorage.setItem("bookingDate", "2024-10-30");
    localStorage.setItem("bookingTime", "2:30pm-4:10pm");
    //di pa nalalagay to sa mga dapat nilang pwesto ehehe

}


//Display Initial Seating
initializeSeating();

updateSeatingTable(selectedDate, selectedTime);