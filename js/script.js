//signup function
async function signUp(event) {
    event.preventDefault();

    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;

    const passwordRegEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    //password validation
    if (!passwordRegEx.test(password)) {
        alert('Password must contain at least one uppercase letter, one number, and be at least 8 characters long.');
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
            body: JSON.stringify({username, password})
        });
        
        const result = await res.text();

        if (!res.ok) {
            alert(result)
        } else {
            //papalitan ng function na pagswitch sa 2nd form
            window.location.href = 'homepage.html';
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
            window.location.href = 'homepage.html';
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again later.');
    }
}



    
