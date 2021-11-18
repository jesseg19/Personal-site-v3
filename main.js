//typing animation from codepen via https://codepen.io/CheeseTurtle/pen/jzdgI
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};

//mobile menu
let hamburger = document.querySelector(".mobile-menu");
let mobileMenuElements = document.querySelector("ul");
let mobileMenuLis = document.querySelectorAll("li");

let nav = document.querySelector("nav");
let mainSection = document.querySelector("#main-section");
let sticky = nav.offsetTop;

hamburger.addEventListener("click", mobileMenu);

//close the menu when any one the elements are clicked
for (let x = 0; x < mobileMenuLis.length; x++) {
  mobileMenuLis[x].addEventListener("click", mobileMenu);
}

function mobileMenu() {
  mobileMenuElements.classList.toggle("open-mobile-menu");
}

window.onscroll = function () {
  scrolled();
};

function scrolled() {
  if (window.scrollY != 0) {
    nav.classList.add("sticky");
    mainSection.classList.add("sticky-main-section");
  } else {
    nav.classList.remove("sticky");
    mainSection.classList.remove("sticky-main-section");
  }
}
