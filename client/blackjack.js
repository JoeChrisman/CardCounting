import Card from './card.js';
import {images, loadImages} from './images.js';

function init() {
    console.log('Dom loaded')
    const canvas = document.getElementById('canvas');    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#024330';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const deck = [];
    let x = 10;
    let y = 10;
    for (let suit = Card.HEART; suit <= Card.SPADE; suit++) {
        for (let rank = Card.TWO; rank <= Card.ACE; rank++)
        {
            deck.push(new Card(rank, suit, x, y));
            x += 30;
            y += 15;
        }
    }
    const back = new Card(0, 0, x, y);
    back.hide();
    deck.push(back);
    for (const card of deck)
    {
        card.render(ctx);
    }
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


