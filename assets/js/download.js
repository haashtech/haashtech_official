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