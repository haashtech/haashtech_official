document.addEventListener("DOMContentLoaded", function () {
  // Code inside this function will be executed after the HTML content is fully loaded
  // Add click event listener to the download button
  document
    .getElementById("downloadButton")
    .addEventListener("click", function () {
      // Define the URL of the PDF file
      var pdfUrl = "assets/pdf/haash.tech.pdf";

      // Create a new anchor element
      var link = document.createElement("a");

      // Set the href attribute of the anchor element to the PDF URL
      link.href = pdfUrl;

      // Set the download attribute to force download the file
      link.download = "haash.tech.pdf";

      // Trigger a click event on the anchor element to start the download
      link.click();
    });
});

// ============================
