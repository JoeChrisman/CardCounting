import Card from './card.js'

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

    for (let suit = Card.HEART; suit <= Card.SPADE; suit++) {
        for (let rank = Card.TWO; rank <= Card.ACE; rank++) {
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