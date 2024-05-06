document.getElementById('downloadButton').addEventListener('click', function() {
    // Define the URL of the PDF file
    var pdfUrl = 'assets/pdf/MUHAMMED SAFVAN KV_CV_2024.pdf';
    
    // Create a new anchor element
    var link = document.createElement('a');
    
    // Set the href attribute of the anchor element to the PDF URL
    link.href = pdfUrl;
    
    // Set the download attribute to force download the file
    link.download = 'MUHAMMED SAFVAN KV_CV_2024.pdf';
    
    // Trigger a click event on the anchor element to start the download
    link.click();
  });


  // ============================
  // Get the current URL
const currentUrl = window.location.href;

// Get all nav-links
const navLinks = document.querySelectorAll('.nav-link');

// Loop through each nav-link
navLinks.forEach(navLink => {
  // Get the href attribute of the nav-link
  const href = navLink.getAttribute('href');

  // Check if the current URL contains the href
  if (currentUrl.includes(href)) {
    // Add the 'active' class to the nav-link
    navLink.classList.add('active');
  }
});

// ===============================
$(window).scroll(function () {
  const navbar = $(".navbar");

  // Add glass effect to navbar when scrolling
  if ($(window).scrollTop()) {
    navbar.addClass("glass");
  } else {
    navbar.removeClass("glass");
  }
});

$("#offcanvasNavbar").on("show.bs.offcanvas", function () {
  const navbar = $(".navbar");
  navbar.removeClass("glass");
});

// document.addEventListener('scroll',()=>{
//   const nav = document.querySelector('nav');
//   if(window.scrollY > 0){
//     nav.classList.add('scrolled')
//   } else {
//     nav.classList.remove('scrolled')
//   }
// })