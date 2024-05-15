// ======== validation ========== //
const Firstname = document.getElementById("Firstname");
const Lastname = document.getElementById("Lastname");

const email = document.getElementById("email");
// const subject = document.getElementById("subject");
const message = document.getElementById("message");
const cbname = document.getElementById("cbname");
const form = document.getElementById("contact");
const button = document.getElementById("form-submit");

const error_fname = document.getElementById("error_fname");
const error_cbname = document.getElementById("error_cbname");
const error_lname = document.getElementById("error_lname");
const error_email = document.getElementById("error_email");
const error_phone = document.getElementById("error_phone");
const error_message = document.getElementById("error_message");
const email_check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function validationForm(event) {
    event.preventDefault();
    let isValid = true;
  
    if (Firstname.value === "" || Firstname.value === null || Lastname.value === "" || Lastname.value === null) {
      error_fname.innerHTML = "Enter First name is required";
      error_lname.innerHTML = "Enter Last name is required";
      Firstname.style.outline = '0.1px solid red';
      Lastname.style.outline = '0.1px solid red';
      // error_fname.style.margin = "5px";
      // error_lname.style.margin = "5px";
      isValid = false;
    } else {
      error_fname.innerHTML = "";
      error_lname.innerHTML ="";
      Firstname.style.outline = ''; 
      Lastname.style.outline = ''; 
      error_fname.style.margin = "";
      error_lname.style.margin = "";
    }

    if (cbname.value === "" || cbname.value === null ) {
      error_cbname.innerHTML = "Enter company name";
      cbname.style.outline = '0.1px solid red';
      // error_cbname.style.margin = "5px";
      isValid = false;
    } else {
      error_cbname.innerHTML = "";
      cbname.style.outline = ''; 
      error_cbname.style.margin = "";
    }
  
  
    if (!email.value.match(email_check)) {
      error_email.innerHTML = "Valid email is required";
      email.style.outline = '0.1px solid red';
      // error_email.style.margin = "5px";
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
      phone.style.outline = '0.1px solid red';
      // error_phone.style.margin = "5px";
      isValid = false;
    } else {
      error_phone.innerHTML = "";
      error_phone.style.margin = "";
      phone.style.outline = '';

    }
  
    if (message.value === "" || message.value.length < 5) {
      error_message.innerHTML = "Message can't be less than 5 characters";
      message.style.outline = '0.1px solid red';
      // error_message.style.margin = "5px";
      isValid = false;
    } else {
      error_message.innerHTML = "";
      message.style.outline = ''; 
      error_message.style.margin = "";
    }
  
    return isValid;
  }
  

const result = document.getElementById('result');
// Function to handle form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if(validationForm(e)) {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    
    // Get the input element for the phone number
    const phoneInput = document.getElementById('phone');
    
    // Get the intlTelInput instance
    const intlTelInput = window.intlTelInputGlobals.getInstance(phoneInput);
    
    // Get the selected country's dial code
    const countryCode = intlTelInput.getSelectedCountryData().dialCode;
    
    // Append the country code to the phone number
    object.phone = `+${countryCode}${object.phone}`;
    
    // Convert the object to JSON
    const json = JSON.stringify(object);
    
    result.innerHTML = "Please wait...";
    
    // Send the form data to the server
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

// form.addEventListener('submit', function(e) {
//   e.preventDefault();
//   if(validationForm(e)) {
//     const formData = new FormData(form);
//     const object = Object.fromEntries(formData);
//     const json = JSON.stringify(object);
  
//     result.innerHTML = "Please wait..."
  
//     fetch('https://api.web3forms.com/submit', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: json
//     })
//     .then(async (response) => {
//       let json = await response.json();
//       if (response.status == 200) {
//         // result.innerHTML = json.message;
//         swal({
//           title: "Good job!",
//           text: json.message,
//           icon: "success",
//           button: "OK",
//         })
//       } else {
//         console.log(response);
//         result.innerHTML = json.message;
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       result.innerHTML = "Something went wrong!";
//     })
//     .then(function() {
//       form.reset();
//       setTimeout(() => {
//         result.style.display = "none";
//       }, 3000);
//     });
//   }
// });

// Add event listener to the form submit button
// button.addEventListener('click', validationForm);