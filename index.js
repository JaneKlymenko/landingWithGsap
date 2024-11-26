const burger = document.querySelector(".toggle-menu");
const sidebar = document.querySelector(".sidebar");
const menuItems = document.querySelectorAll(".sidebar ul li");
const contacts = document.querySelector(".sidebar-contacts");

// header onscroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});

// menu effects with gsap
const timeline = gsap.timeline({ paused: true, reversed: true });

var tl = gsap.timeline({ paused: true });
tl.to(sidebar, {
  duration: 1,
  opacity: 1,
  right: 0,
  ease: "expo.inOut",
});

tl.to(menuItems, {
  duration: 1,
  opacity: 1,
  stagger: 0.2,
  ease: "expo.inOut",
});

tl.to(contacts, {
  duration: 1,
  opacity: 1,
  ease: "expo.inOut",
});

tl.reverse();

burger.addEventListener("click", () => {
  tl.reversed(!tl.reversed());
  burger.classList.toggle("active");
});

// card effects with gsap
gsap.registerPlugin(ScrollTrigger);

let card = gsap.utils.toArray(".about-block_container");

function initCards() {
  animation.clear();
  cardHeight = cards[0].offsetHeight;
  cards.forEach((card, index) => {
    if (index === 0) {
      gsap.set(card, {
        y: 0,
        opacity: 1,
        duration: 0.1,
      });
      animation.to(
        card,
        {
          y: 10 * cards.length,
          duration: 0.1,
          opacity: 0,
        },
        0
      );
    } else if (index === 1) {
      gsap.set(card, {
        y: cardHeight,
        opacity: 1,
        duration: 1,
      });
      animation.to(
        card,
        {
          y: -20 * cards.length,
          opacity: 0,
          duration: 0.4,
        },
        0
      );
    } else {
      gsap.set(card, {
        y: cardHeight * 2,
        opacity: 0,
        duration: 0.1,
      });
      animation.to(
        card,
        {
          y: 0,
          duration: 4,
          opacity: 1,
        },
        0
      );
    }
  });
}

ScrollTrigger.create({
  trigger: ".section",
  start: "top",
  pin: ".section",
  scrub: true,
  animation,
  pinSpacing: true,
  markers: true,
  invalidateOnRefresh: true,
  onLeave: (e) => console.log(e),
  ease: "Power2.out",
  toggleActions: "restart none restart none",
});

// Phone mask custom
const phoneInput = document.querySelector("#phone");
phoneInput.addEventListener("input", function () {
  let value = this.value.replace(/\D/g, "");

  if (value.length === 0) {
    this.value = "";
    return;
  }

  if (!value.startsWith("38")) {
    value = "38" + value;
  }

  if (value.length > 12) {
    value = value.slice(0, 12);
  }

  const countryCode = "+38";
  const operatorCode = value.substring(2, 5);
  const mainNumber = value.substring(5);

  let formattedValue = countryCode;

  if (operatorCode) {
    formattedValue += `(${operatorCode}) `;
  }
  if (mainNumber) {
    formattedValue += mainNumber.replace(/(\d{3})(\d+)/, "$1 $2");
  }

  const cursorPosition = this.selectionStart;
  this.value = formattedValue.trim();

  let newCursorPosition = formattedValue.length;

  if (mainNumber.length === 0) {
    newCursorPosition = formattedValue.indexOf(")");
  }

  this.setSelectionRange(newCursorPosition, newCursorPosition);
});
