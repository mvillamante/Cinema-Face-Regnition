const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach(inp => {
    inp.addEventListener("focus", () => {
        inp.classList.add("active"); 
    });
    inp.addEventListener("blur", () => {
        if(inp.value != "") return;
        inp.classList.remove("active");
    });
});

toggle_btn.forEach(btn => {
    btn.addEventListener("click", () => {
        main.classList.toggle("sign-up-mode");
    });
});

function moveSlider(){
    let index = this.dataset.value;
    
    let currentImage = document.querySelector(`.img-${index}`)
    images.forEach(img => img.classList.remove("show"));
    currentImage.classList.add("show");

    const textSlider = document.querySelector(".text-group");
    textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    bullets.forEach(bull => bull.classList.remove("active"));
    this.classList.add("active");
}

bullets.forEach(bullet => {
    bullet.addEventListener("click", moveSlider);
});


//login password
const passwordInput = document.getElementById('signInPassword');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    if (type === 'password') {
        togglePassword.classList.remove('fa-eye');
        togglePassword.classList.add('fa-eye-slash');
    } else {
        togglePassword.classList.remove('fa-eye-slash');
        togglePassword.classList.add('fa-eye');
    }
});

//sign-up password
const signUpInput = document.getElementById('signUpPassword');
const toggleSignUpPassword = document.getElementById('toggleUpPassword'); 

toggleSignUpPassword.addEventListener('click', function() {
    const type = signUpInput.getAttribute('type') === 'password' ? 'text' : 'password';
    signUpInput.setAttribute('type', type);

    if (type === 'password') {
        toggleSignUpPassword.classList.remove('fa-eye');
        toggleSignUpPassword.classList.add('fa-eye-slash');
    } else {
        toggleSignUpPassword.classList.remove('fa-eye-slash');
        toggleSignUpPassword.classList.add('fa-eye');
    }
});

//confirm password
const confirmPassword = document.getElementById('confirmPassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword'); 

toggleConfirmPassword.addEventListener('click', function() {
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);

    if (type === 'password') {
        toggleConfirmPassword.classList.remove('fa-eye');
        toggleConfirmPassword.classList.add('fa-eye-slash');
    } else {
        toggleConfirmPassword.classList.remove('fa-eye-slash');
        toggleConfirmPassword.classList.add('fa-eye');
    }
});