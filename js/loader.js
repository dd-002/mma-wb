import { gsap } from 'gsap';
gsap.fromTo(
    ".loading-page",
    { opacity: 1 },
    {
        opacity: 0,
        display: "none",
        duration: 3,
        delay: 2,
    }
);
