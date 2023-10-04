const tlLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});
const tlEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

gsap.fromTo(
  ".image-container img",
  { y: 10 },
  { y: -10, duration: 5, yoyo: true, repeat: -1, ease: Linear.easeNone }
);

// funtions for leave and enter animations
const leaveAnimation = (done, current) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const arrow = current.querySelector(".showcase-arrow");
  const circles = current.querySelectorAll(".circle");
  return (
    tlLeave.fromTo(product, { opacity: 1, y: 0 }, { opacity: 0, y: 100 }),
    tlLeave.fromTo(text, { opacity: 1, y: 0 }, { opacity: 0, y: 100 }, "<"),
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }, "<"),
    tlLeave.fromTo(
      circles,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -200,
        stagger: 0.15,
        onComplete: done,
        ease: "black.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};

const enterAnimation = (done, current, gradient) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const arrow = current.querySelector(".showcase-arrow");
  const circles = current.querySelectorAll(".circle");
  return (
    gsap.fromTo(
      ".image-container img",
      { y: 10 },
      { y: -10, duration: 5, yoyo: true, repeat: -1, ease: Linear.easeNone }
    ),
    tlEnter.fromTo(product, { opacity: 0, y: 100 }, { opacity: 1, y: 0 }),
    tlEnter.fromTo(text, { opacity: 0, y: 100 }, { opacity: 1, y: 0 }, "<"),
    tlEnter.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, "<"),
    tlEnter.to("body", { background: gradient }, "<"),
    tlEnter.fromTo(
      circles,
      { opacity: 0, y: -200 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        onComplete: done,
        ease: "black.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};

//run animations
barba.init({
  preventRunning: true,
  transitions: [
    //showcase transitions
    {
      name: "default",
      once(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        gsap.to("body", { background: gradient });
        enterAnimation(done, next, gradient);
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        leaveAnimation(done, current);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        enterAnimation(done, next, gradient);
      },
    },
    //product-page animation
    {
      name: "product-transition",
      sync: true,
      from: { namespace: ["handbag", "product"] },
      to: { namespace: ["product", "handbag"] },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAnimation(done, next);
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        productLeaveAnimation(done, current);
      },
    },
  ],
});

function productEnterAnimation(done, next) {
  tlEnter.fromTo(next, { y: "100%" }, { y: "0%" });
  tlEnter.fromTo(
    ".card",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.05, onComplete: done },
    "<50%"
  );
}

function productLeaveAnimation(done, current) {
  tlLeave.fromTo(current, { y: "0%" }, { y: "100%", onComplete: done });
}

//changing gradients
function getGradient(name) {
  switch (name) {
    case "handbag":
      return "linear-gradient(260deg, #b75d62, #754d4f)";
    case "boot":
      return "linear-gradient(260deg, #5d8cb7, #4c4f70)";
    case "hat":
      return "linear-gradient(260deg, #b27a5c, #7f5450)";
  }
}
