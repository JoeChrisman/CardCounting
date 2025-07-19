import {loadImages} from './images.js';
import Shoe from './shoe.js';

async function init() {
    console.log('Dom loaded')
    const canvas = document.getElementById('canvas');    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    const shoe = new Shoe(canvas.width / 6, canvas.height / 4, 6);
    shoe.render(ctx);
    animate(canvas, ctx, shoe);
    await shoe.shuffle(canvas);
}

(async () => {
    await loadImages();
    console.log('All images loaded')
    if (document.readyState === 'loading') {
        console.log('Waiting for dom...')
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

function animate(canvas, ctx, shoe) {
    function frame() {
        ctx.fillStyle = '#024330';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        shoe.update();
        shoe.render(ctx);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}
  
