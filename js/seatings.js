
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
        <div class="numbering" data-row-size="4" data-col-size="1" data-top-gap-size="25" data-start-at="3" data-mode="alp"></div>
        <div class="numbering" data-row-size="4" data-col-size="1" data-top-gap-size="24" data-start-at="7" data-mode="alp"></div>
    </div>
</div>
`

var initializeShowcase = document.querySelector(".cinema-details");
initializeShowcase.innerHTML = `
<div class="cinema-content">
    <div>
        <label>Selected Seats: </label><label class="selectedSeats">0</label>
    </div>
    <div>
        <label>Available Seats:</label><label class="availableSeats"></label>
    </div>
    <div>
        <label>Total Seats:</label><label class="totalSeats"></label> 
    </div>
</div>
`

// DUMMY DATA FOR TABLE
const registeredSeatsData = [
    { regisNo: 'USR-A12345', facePhoto: '/images/stakeholder-melo.jpg', name: 'Mewo Lee', seatNo: 'G11' },
    { regisNo: 'USR-B67890', facePhoto: '/images/stakeholder-melo.jpg', name: 'Meo Ling', seatNo: 'G10' },
    { regisNo: 'USR-A12345', facePhoto: '/images/stakeholder-melo.jpg', name: 'Meyo Wii', seatNo: 'G9' },
    { regisNo: 'USR-B67890', facePhoto: '/images/stakeholder-melo.jpg', name: 'Me Lo', seatNo: 'G8' }
];


// (Occupied Seats) Variables:
//const takenSeats = document.querySelector('.HiddenFieldDataHere3').innerHTML.split(',');
const takenSeats = registeredSeatsData.map(seat => seat.seatNo);
console.log(takenSeats); 

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


// Initialize seating
var seatElements = document.querySelectorAll(".subSeatContainer");
var availableSeats = 150;
var selectedSeats = 0;

seatElements.forEach(function (seatElement) {
    var rowSize = seatElement.dataset.rowSize;
    var colSize = seatElement.dataset.colSize;

    seatElement.style.gridTemplateColumns = `repeat(${colSize}, 1fr)`;
    seatElement.style.gridTemplateRows = `repeat(${rowSize}, 1fr)`;
    seatElement.style.margin = `${seatElement.dataset.gapSize}px`;
    seatElement.style.marginTop = `${seatElement.dataset.topGapSize}px`;
    seatElement.style.marginBottom = `${seatElement.dataset.botGapSize}px`;

    // Starting points for numbers and letters
    var startNumber = parseInt(seatElement.dataset.startNumber);
    var startLetter = seatElement.dataset.startLetter.charCodeAt(0);

    // Add seats
    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < colSize; j++) {
            // Calculate the seat position based on row, column, and starting values
            const seatNum = startNumber + j; // Seat number
            const seatChar = String.fromCharCode(startLetter + i); // Seat letter

            var seat = document.createElement("div");
            seat.setAttribute("class", "seatCon");
            // Use the existing takenSeats array to check if this seat is taken
            seat.setAttribute("data-seat-status", `${takenSeats.includes(seatChar + seatNum) ? (() => {
                availableSeats -= 1;
                return 'Occupied';
            })() : 'Free'}`);
            seat.setAttribute("data-seat-pos", `${seatChar}${seatNum}`);

            // Display the seat identifier (letter + number)
            seat.innerHTML = `${seatChar}${seatNum}`;  

            seat.addEventListener("click", handleSeatClick);
            seatElement.appendChild(seat);

            // If the seat is occupied, mark it as red
            if (takenSeats.includes(`${seatChar}${seatNum}`)) {
                seat.style.backgroundColor = 'red'; // Change color to red for occupied seats
            }
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
    } else {
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

// Function to update the seat display
function updateSeatDisplay(selectedSeatList) {
    if (selectedSeatList.length === 0) {
        document.getElementById('selectedSeatDisplay').textContent = 'None';
        return;
    }

    // Sort the selected seats
    selectedSeatList.sort((a, b) => {
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

    // Update the display
    document.getElementById('selectedSeatDisplay').textContent = selectedSeatList.join(', ');
}



// Text
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".totalSeats").innerHTML = "150";
    document.querySelector(".availableSeats").innerHTML = availableSeats;
});

const timeslots = document.querySelectorAll('.timeslot');

timeslots.forEach(slot => {
    slot.addEventListener('click', function() {
        // Remove 'active' class from all timeslots
        timeslots.forEach(s => s.classList.remove('active'));

        // Add 'active' class to the clicked timeslot
        this.classList.add('active');
    });
});

// Get reference to the table body
const seatingTableBody = document.querySelector('#seatingTable tbody');

// Loop through each seat that is taken and add a row to the table
registeredSeatsData.forEach(seat => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${seat.regisNo}</td>
        <td><img src="${seat.facePhoto}" alt="Face Photo"></td>
        <td>${seat.name}</td>
        <td>${seat.seatNo}</td>
    `;
    
    seatingTableBody.appendChild(row);
});

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


