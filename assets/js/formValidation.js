// ======== validation ========== //
const nameField = document.getElementById("name");
const email = document.getElementById("email");
// const subject = document.getElementById("subject");
const message = document.getElementById("message");
const form = document.getElementById("contact");
const button = document.getElementById("form-submit");

const error_name = document.getElementById("error_name");
const error_email = document.getElementById("error_email");
const error_phone = document.getElementById("error_phone");
const error_message = document.getElementById("error_message");
const email_check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function validationForm(event) {
    event.preventDefault();
    let isValid = true;
  
    if (nameField.value === "" || nameField.value === null) {
      error_name.innerHTML = "Valid name is required";
      nameField.style.outline = '1px solid red';
      error_name.style.margin = "5px";
      isValid = false;
    } else {
      error_name.innerHTML = "";
      nameField.style.outline = ''; 
      error_name.style.margin = "";
    }
  
    if (!email.value.match(email_check)) {
      error_email.innerHTML = "Valid email is required";
      email.style.outline = '1px solid red';
      error_email.style.margin = "5px";
      isValid = false;
    } else {
      error_email.innerHTML = "";
      email.style.outline = ''; 
      error_email.style.margin = "";
    }
  
    // Phone number validation
    const phoneRegex = /^\d{10}$/; // Regular expression to validate 10-digit phone numbers
    const phone = document.getElementById("phone")
    if (!phone.value.match(phoneRegex)) {
      error_phone.innerHTML = "Please enter a valid phone number";
      phone.style.outline = '1px solid red';
      error_phone.style.margin = "5px";
      isValid = false;
    } else {
      error_phone.innerHTML = "";
      error_phone.style.margin = "";
      phone.style.outline = '';

    }
  
    if (message.value === "" || message.value.length < 5) {
      error_message.innerHTML = "Message can't be less than 5 characters";
      message.style.outline = '1px solid red';
      error_message.style.margin = "5px";
      isValid = false;
    } else {
      error_message.innerHTML = "";
      message.style.outline = ''; 
      error_message.style.margin = "";
    }
  
    return isValid;
  }
  

const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if(validationForm(e)) {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
  
    result.innerHTML = "Please wait..."
  
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        // result.innerHTML = json.message;
        swal({
          title: "Good job!",
          text: json.message,
          icon: "success",
          button: "OK",
        })
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function() {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
  }
});

// Add event listener to the form submit button
// button.addEventListener('click', validationForm);