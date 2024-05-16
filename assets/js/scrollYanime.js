window.addEventListener('scroll',reveal);
function reveal(){
    var reveals = document.querySelectorAll('.reveal');
    for(var i = 0; i < reveals.length; i++){
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 100
        if(revealTop < windowHeight - revealPoint){
            reveals[i].classList.add('active')
        } else {
            reveals[i].classList.remove('active')

        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// ============================
// document.addEventListener("DOMContentLoaded", function () {
//     const sections = document.querySelectorAll("section");
//     const images = [
//       "assets/imgs/logo/flotingpieces.png",
//       "assets/imgs/logo/flotingpieces2.png",
//     ];

//     sections.forEach((section, index) => {
//       if (index === 6) return; // Skip section 6
//       if (index === 4) return;
//       const imgCount = index < images.length ? 2 : 1; // Limit 2 images per section

//       for (let i = 0; i < imgCount; i++) {
//         const img = document.createElement("img");
//         img.src = images[i];
//         img.alt = "Floating Pieces Logo";
//         img.classList.add(i === 0 ? "bottom-left" : "bottom-right"); // Alternate positioning
//         section.appendChild(img);
//       }
//     });
//   });