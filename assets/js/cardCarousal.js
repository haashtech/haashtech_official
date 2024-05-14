
let items = document.querySelectorAll('.slider .item');
let active = 3;

function loadShow() {
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    
    for (let i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${70 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    
    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-70 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

function animateSlider() {
    nextSlide();
    setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

function nextSlide() {
    // Move the first image to the end
    let firstItem = items[0].cloneNode(true); // Clone the first item
    items[0].remove(); // Remove the original first item
    document.querySelector('.slider').appendChild(firstItem); // Append the cloned item to the end
    items = document.querySelectorAll('.slider .item'); // Update the items array
    
    loadShow();
}

// Start animation
animateSlider();


// animation script for event in button click
// let items = document.querySelectorAll('.slider .item');
//     let next = document.getElementById('next');
//     let prev = document.getElementById('prev');
    
//     let active = 3;
//     function loadShow(){
//         let stt = 0;
//         items[active].style.transform = `none`;
//         items[active].style.zIndex = 1;
//         items[active].style.filter = 'none';
//         items[active].style.opacity = 1;
//         for(var i = active + 1; i < items.length; i++){
//             stt++;
//             items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
//             items[i].style.zIndex = -stt;
//             items[i].style.filter = 'blur(5px)';
//             items[i].style.opacity = stt > 2 ? 0 : 0.6;
//         }
//         stt = 0;
//         for(var i = active - 1; i >= 0; i--){
//             stt++;
//             items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
//             items[i].style.zIndex = -stt;
//             items[i].style.filter = 'blur(5px)';
//             items[i].style.opacity = stt > 2 ? 0 : 0.6;
//         }
//     }
//     loadShow();
//     next.onclick = function(){
//         active = active + 1 < items.length ? active + 1 : active;
//         loadShow();
//     }
//     prev.onclick = function(){
//         active = active - 1 >= 0 ? active - 1 : active;
//         loadShow();
//     }

