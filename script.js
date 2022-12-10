const form = document.getElementById('form');
const password1Element = document.getElementById('password1');
const password2Element = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');
const allInputs = document.querySelectorAll('input');

const passwordToggleIcon = document.querySelectorAll('#toggle-password');
const allPasswords = [password1Element, password2Element];

let valid = false;
let passwordMatch = false;

// Password fields border color for valid/ invalid
const passwordColor = function (color) {
  password1Element.style.borderColor = `${color}`;
  password2Element.style.borderColor = `${color}`;
};

// Message fields border and message text for valid/ invalid
const messageColorAndText = function (color, text) {
  messageContainer.style.borderColor = `${color}`;
  message.style.color = `${color}`;
  message.textContent = `${text}`;
};

// Chevcking for valid/ invalid form
const validateForm = function () {
  // Checking validity unsing constraint API
  valid = form.checkValidity();
  console.log(valid);
  // Error message and container for invalid form
  if (!valid) {
    messageColorAndText('red', 'Please fill all the required fields');
    return;
  }
  // Check password match and style corresponding elements
  if (password1Element.value === password2Element.value) {
    passwordMatch = true;
    passwordColor('green');
  } else {
    passwordMatch = false;
    passwordColor('red');
    messageColorAndText('red', 'Please make sure passwords match');
    return;
  }
  // Succes message and container for valid form
  if (valid && passwordMatch) {
    messageColorAndText('green', 'You have been registered!');
  }
};

// Storing the form inpur data
const storeUserData = function () {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };
  console.log(user);
};

// Validate form and store data on submit click
const submit = function (event) {
  event.preventDefault();
  validateForm();
  if (valid && passwordMatch) storeUserData();
};

// Change icon and display/ hide password
const togglePassword = function (event) {
  event.preventDefault();
  passwordToggleIcon.forEach(function (icon) {
    if (icon.className === 'fa-regular fa-eye') {
      icon.className = 'fa-regular fa-eye-slash';
      allPasswords.forEach(password => password.setAttribute('type', 'text'));
    } else {
      icon.className = 'fa-regular fa-eye';
      allPasswords.forEach(password =>
        password.setAttribute('type', 'password')
      );
    }
  });
};

// Password strength check
const indicator = document.querySelector('.indicator');
const input = document.getElementById('password1');
const weak = document.querySelector('.weak');
const medium = document.querySelector('.medium');
const strong = document.querySelector('.strong');
const text = document.querySelector('.text');

let regExpWeak = /[a-z]/;
let regExpMedium = /\d+/;
let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
let no = '';

function trigger() {
  if (input.value != '') {
    indicator.style.display = 'block';
    indicator.style.display = 'flex';
    if (
      input.value.length <= 3 &&
      (input.value.match(regExpWeak) ||
        input.value.match(regExpMedium) ||
        input.value.match(regExpStrong))
    )
      no = 1;
    if (
      input.value.length >= 6 &&
      ((input.value.match(regExpWeak) && input.value.match(regExpMedium)) ||
        (input.value.match(regExpMedium) && input.value.match(regExpStrong)) ||
        (input.value.match(regExpWeak) && input.value.match(regExpStrong)))
    )
      no = 2;
    if (
      input.value.length >= 6 &&
      input.value.match(regExpWeak) &&
      input.value.match(regExpMedium) &&
      input.value.match(regExpStrong)
    )
      no = 3;
    if (no == 1) {
      weak.classList.add('active');
      text.style.display = 'block';
      text.textContent = 'Your password is too weak';
      text.classList.add('weak');
    }
    if (no == 2) {
      medium.classList.add('active');
      text.textContent = 'Your password is medium';
      text.classList.add('medium');
    } else {
      medium.classList.remove('active');
      text.classList.remove('medium');
    }
    if (no == 3) {
      weak.classList.add('active');
      medium.classList.add('active');
      strong.classList.add('active');
      text.textContent = 'Your password is strong';
      text.classList.add('strong');
    } else {
      strong.classList.remove('active');
      text.classList.remove('strong');
    }
  } else {
    indicator.style.display = 'none';
    text.style.display = 'none';
  }
}

// Event listeners
form.addEventListener('submit', submit);
passwordToggleIcon.forEach(icon =>
  icon.addEventListener('click', togglePassword)
);
