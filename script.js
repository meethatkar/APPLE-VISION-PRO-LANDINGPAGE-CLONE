function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

locomotive();

gsap.to("#page-0>video",{
  scrollTrigger:{
    trigger: "#page-0>video",
    scroller: "#main",
    start: "1% top",
    end: "bottom top",
    // markers: true,
  },
  onStart:()=>{
    document.querySelector("#page-0>video").play();   //pale vidoe as soon as the gsap start is met
  }
})

gsap.to("#page-0",{
  scrollTrigger:{
    trigger:"#page-0",
    scroller:"#main",
    start: "top top",
    end: "bottom top",
    pin:true,
  }
})

gsap.to("#text-btm",{
  scrollTrigger:{
    trigger:"#page-0>video",
    scroller:"#main",
    start:"1% top",
    end:"bottom top"
  },
  onStart:()=>{
    let textBtmDiv = document.querySelector("#text-btm");
    textBtmDiv.style.opacity = "0";
    // textBtmDiv.style.width = "0%";
    textBtmDiv.style.zIndex = "0";
  }
})


// GSAP timeline works like function, in which we write scrollTrigger animation whihc we are going to use multiple time.

let t1 = gsap.timeline({
  scrollTrigger:{
    trigger: "#page-1",
    start:"top top",
    // end:"top bottom",
    scrub:1,
    scroller:"#main",
    pin:true,
  }
})

t1.to("#page-1>h1",{
  top: "-50%"
})

let t2 = gsap.timeline({
  scrollTrigger:{
    trigger: "#page-2",
    start:"top top",
    // end:"top bottom",
    scrub:1,
    scroller:"#main",
    pin:true,
  }
})

t2.to("#page-2>h1",{
  top: "-50%"
})
