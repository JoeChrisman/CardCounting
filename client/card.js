import {images} from './images.js';
import Sprite from './sprite.js';

export default class Card extends Sprite {
    static heart = 0;
    static club = 1;
    static diamond = 2;
    static spade = 3;

    static two = 0;
    static three = 1;
    static four = 2;
    static five = 3;
    static six = 4;
    static seven = 5;
    static eight = 6;
    static nine = 7;
    static ten = 8;
    static jack = 9;
    static queen = 10;
    static king = 11;
    static ace = 12;

    static cardScale = 50;
    static cardWidth = Card.cardScale * 2.5;
    static cardHeight = Card.cardScale * 3.5;

    static getCardName(rank, suit) {
        const suitNames = ['hearts', 'clubs', 'diamonds', 'spades'];
        const rankNames = [ 'two', 'three', 'four', 'five', 'six', 'seven', 
            'eight', 'nine', 'ten', 'jack', 'queen', 'king', 'ace'];

        return `${rankNames[rank]}_of_${suitNames[suit]}`;
    }

    constructor(rank, suit, x, y, isHidden=true) {
        super(x, y, Card.cardWidth, Card.cardHeight, 0);
        this.rank = rank;
        this.suit = suit;
        isHidden ? this.hide() : this.show();
    }

    hide() {
        this.image = images['back'];
    }

    show() {
        this.image = images[Card.getCardName(this.rank, this.suit)];
    }
}