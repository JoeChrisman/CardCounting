import Card from './card.js';

export default class Shoe {
    static shuffleSpeed = 18;
    static shuffleSpread = 7; // canvas.width/spread is max spread, for x axis, etc
    static shuffleTimes = 6;

    constructor(x, y, numDecks) {
        this.x = x;
        this.y = y;
        this.cards = [];
        this.coords = [];

        const numCards = numDecks * 52;
        this.createCoords(numCards)
        this.createShoe(numDecks);
    }

    createCoords(numCards) {
        let y = this.y;
        while (numCards--) {
            this.coords.push({x: this.x, y: y});
            y -= 0.3;
        }
    }

    // build the shoe - but all the cards are at (0,0)
    createShoe(numDecks) {
        while (numDecks--) {
            for (let rank = Card.two; rank <= Card.ace; rank++) {
                for (let suit = Card.heart; suit <= Card.spade; suit++) {
                    const card = new Card(rank, suit, 0, 0);
                    card.hide();
                    this.cards.push(card);
                }
            }
        }
    }

    // KICK ASS shuffling animation
    async shuffle(canvas) {

        // change the card ordering in memory - this is the actual shuffle
        const numCards = this.cards.length;
        for (let i = 0; i < numCards; i++) {
            const chosen = Math.floor(Math.random() * numCards);
            const swapped = this.cards[chosen];
            this.cards[chosen] = this.cards[i];
            this.cards[i] = swapped;
        }

        // move all the cards to the center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        console.log('Moving cards to the center');
        await Promise.all(this.cards.map(card => {
            return card.moveTo(
                centerX, centerY, 0, Shoe.shuffleSpeed);
        }))

        // begin visually shuffling. has no effect on actual card ordering
        console.log('Shuffling cards');
        for (let i = 0; i < Shoe.shuffleTimes; i++) {
            await Promise.all(this.cards.map(card => {
                const angle = Math.random() * 2 * Math.PI; 
                const distance = canvas.width / Shoe.shuffleSpread * Math.sqrt(Math.random()); 
                return card.moveTo(
                    centerX + distance * Math.cos(angle),
                    centerY + distance * Math.sin(angle),
                    Math.random() * 2 * Math.PI, Shoe.shuffleSpeed);
            }))
        }

        // put the cards back in the shoe
        console.log('Putting cards in the shoe');
        await Promise.all(this.cards.map((card, i) => {
            return card.moveTo(
                this.coords[i].x, this.coords[i].y, 0, Shoe.shuffleSpeed);
        }))
    }

    update() {
        this.cards.forEach(card => card.update());
    }

    render(ctx) {
        this.cards.forEach(card => card.render(ctx));
    }
}