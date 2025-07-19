import {images} from './images.js'

export default class Card {
    static HEART = 0;
    static CLUB = 1;
    static DIAMOND = 2;
    static SPADE = 3;

    static TWO = 0;
    static THREE = 1;
    static FOUR = 2;
    static FIVE = 3;
    static SIX = 4;
    static SEVEN = 5;
    static EIGHT = 6;
    static NINE = 7;
    static TEN = 8;
    static JACK = 9;
    static QUEEN = 10;
    static KING = 11;
    static ACE = 12;

    static DECK_SIZE = 52;

    static CARD_SCALE = 50;
    static CARD_WIDTH = Card.CARD_SCALE * 2.5;
    static CARD_HEIGHT = Card.CARD_SCALE * 3.5;

    static getCardName(rank, suit) {
        const suitNames = ['hearts', 'clubs', 'diamonds', 'spades'];
        const rankNames = [ 'two', 'three', 'four', 'five', 'six', 'seven', 
            'eight', 'nine', 'ten', 'jack', 'queen', 'king', 'ace'];

        return `${rankNames[rank]}_of_${suitNames[suit]}`;
    }

    constructor(rank, suit, x, y) {
        this.rank = rank;
        this.suit = suit;
        this.x = x;
        this.y = y;
        this.image = images[Card.getCardName(this.rank, this.suit)];

        if (!this.image) {
            console.error('Missing image.', this);
        }
    }

    hide() {
        this.image = images['back'];
    }

    show() {
        this.image = images[Card.getCardName(this.rank, this.suit)];
    }

    render(ctx) {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            Card.CARD_WIDTH,
            Card.CARD_HEIGHT);
    }
}