// DUMMY DATA FOR TABLE
const registeredSeatsData = [
    { name: 'Mewo Lee', facePhoto: '/images/stakeholder-melo.jpg', seatNo: 'G11', quantityNo: '1', timeAssigned: '5:20pm-7:00pm', date: '2024-10-29'},
    { name: 'Meo Ling', facePhoto: '/images/stakeholder-melo.jpg', seatNo: 'G10, D13', quantityNo: '2', timeAssigned: '2:30pm-4:10pm', date: '2024-10-30' },
    { name: 'Meyo Wii', facePhoto: '/images/stakeholder-melo.jpg', seatNo: 'G9, I12, J4', quantityNo: '3', timeAssigned: '2:30pm-4:10pm', date: '2024-10-29' },
    { name: 'Me Lo', facePhoto: '/images/stakeholder-melo.jpg', seatNo: 'G8, A10, A13, B15', quantityNo: '4', timeAssigned: '5:20pm-7:00pm', date: '2024-11-01' },
]; 

// CHECK IF THE ACCOUNT IS USER OR ADMIN (temporary)
var currentAccountNo = 'USR-0001';
//var currentAccountNo = 'ADM-0001';

// Function to check the account type (admin or user)
function checkAccountType(currentAccountNo) {
    return currentAccountNo.startsWith('ADM') ? 'admin' : 'user';
}
var accountType = checkAccountType(currentAccountNo);


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


// Extracting all seat numbers from registeredSeatsData
const takenSeats = registeredSeatsData.flatMap(seat => seat.seatNo.split(',').map(s => s.trim()));
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

