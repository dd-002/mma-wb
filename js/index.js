import { GooCursor } from './cursor.js';
import { gsap } from 'gsap'
const cursorEl = document.querySelector('.cursor');

// Initialize cursor
const goo = new GooCursor(cursorEl);

// Easter egg: click anywhere

document.getElementsByClassName('homepage')[0].addEventListener('click', () => {
    gsap.
        timeline()
        .addLabel('start', 0)
        .to(goo.DOM.cells, {
            duration: 1,
            ease: 'power4',
            opacity: 1,
            stagger: {
                from: [...goo.DOM.cells].indexOf(goo.getCellAtCursor()),
                each: 0.02,
                grid: [goo.rows, goo.columns]
            }
        }, 'start')
        .to(goo.DOM.cells, {
            duration: 1,
            ease: 'power1',
            opacity: 0,
            stagger: {
                from: [...goo.DOM.cells].indexOf(goo.getCellAtCursor()),
                each: 0.03,
                grid: [goo.rows, goo.columns]
            }
        }, 'start+=0.3')
});

