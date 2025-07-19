import Card from './card.js';

let images = {};

async function loadImages() {
    async function loadImage(path) {
        return new Promise((resolve, reject) => {
            console.log(`Loading image ${path}...`);
            const img = new Image();
            img.onload = () => {
                console.log(`Loaded image ${path}`);
                resolve(img);
            }
            img.onerror = () => reject(new Error(`Failed to load image ${path}`));

            img.src = path;
        });
    }

    const loading = [];
    loading.push((async () => {
        const image = await loadImage('images/back.png');
        images['back'] = image;
    })());

    for (let suit = Card.heart; suit <= Card.spade; suit++) {
        for (let rank = Card.two; rank <= Card.ace; rank++) {
            loading.push((async () => {
                const name = Card.getCardName(rank, suit);
                const image = await loadImage(`images/${name}.png`);
                images[name] = image;
            })());
        }
    }
    await Promise.all(loading);
}

export {
    images, loadImages
}