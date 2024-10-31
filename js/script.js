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
            body: JSON.stringify({username, password})
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
            window.location.href = 'homepage.html';
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
    } catch (err) {
        console.error('Error saving user:', err);
        alert('An error occurred while saving the user.');
    }
}
    
