// CHECK IF THE ACCOUNT IS USER OR ADMIN (temporary)
var accountType = 'admin';
//const accountType = 'admin';

var cardData = [
    {
        date: 'October 15, 2024',
        time: '7:00 PM',
        seats: 'A12, A13',
        cinema: '1'
    },
    {
        date: 'October 16, 2024',
        time: '5:00 PM',
        seats: 'B5, B6',
        cinema: '2'
    },
    {
        date: 'October 17, 2024',
        time: '8:30 PM',
        seats: 'C7, C8',
        cinema: '3'
    },
    {
        date: 'October 18, 2024',
        time: '4:00 PM',
        seats: 'D9, D10',
        cinema: '4'
    },
    {
        date: 'February 10, 2025',
        time: '6:00 PM',
        seats: 'E1, E2',
        cinema: '5'
    }
];

//Movie Text Details
var initializeCardAction = document.querySelectorAll(".card-action");
var initializeCardContent = document.querySelectorAll(".card-content");

initializeCardAction.forEach(cardAction => {
    if (accountType === 'user') {
        cardAction.innerHTML = `
            <a href="#" class="btn-small red-color"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;&nbsp;Remind Me</a>            
        `;

        // Update Card Content
        initializeCardContent.forEach((cardContent, index) => {
            // Ensure the index is within the bounds of the cardData array
            if (index < cardData.length) {
                cardContent.innerHTML = `
                    <p><strong>Date:</strong> ${cardData[index].date}</p>
                    <p><strong>Time:</strong> ${cardData[index].time}</p>
                    <p><strong>Seats:</strong> ${cardData[index].seats}</p>
                    <p><strong>Cinema:</strong> ${cardData[index].cinema}</p>
                `;
            }
        });

    } else if (accountType === 'admin') {
        cardAction.innerHTML = `
            <a href="#" class="btn-small red-color"><i class="fa fa-ticket" aria-hidden="true"></i>&nbsp;&nbsp;Buy Tickets</a>            
        `;
    }
});