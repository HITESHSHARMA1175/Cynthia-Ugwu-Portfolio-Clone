const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity:0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

        .to(".boundingelem",{
            y:0,
            ease:Expo.easeInOut,
            duration:1.5,
            delay:-1,
            stagger:.2
        })
        .from("#herofooter",{
        y: -10,
        opacity:0,
        duration: 1.5,
        delay:-1,
        ease: Expo.easeInOut
    })
}


var timeout;

 function circleChapataKaro() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets) {
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8,1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;
        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform =`translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}



function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove",function(dets){
       document.querySelector("#minicircle").style.transform =`translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}

circleMouseFollower();
firstPageAnim();
circleChapataKaro();



document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot=0;

    elem.addEventListener("mouseleave", function (details) {
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease: "power3",
            duration: 0.5,
        })
    });

    elem.addEventListener("mousemove", function (details) {
       var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: "power3",
            top:diff,
            left: details.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrot*.2),
        });
    });
});



// for real date and time in footer
window.addEventListener("DOMContentLoaded", () => {
  updateDateTime();
  setInterval(updateDateTime, 60000);
});

// for real date and time in footer
function updateDateTime() {
  const now = new Date();

  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formatted = now.toLocaleString("en-US", options);
  const datetimeElement = document.getElementById("datetime");

  if (datetimeElement) {
    datetimeElement.textContent = formatted;
  }
}

updateDateTime();
setInterval(updateDateTime, 60000);



// a loading page 
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // Smooth fade-out using GSAP
  gsap.to(preloader, {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      preloader.style.display = "none";
    }
  });
});
// a loading page 