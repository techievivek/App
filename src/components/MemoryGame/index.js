import React, {Component} from 'react';
import {View} from 'react-native';
import styles from '../../styles/styles';
import Button from '../Button';
import * as Cards from './Cards';
import Card from './Card';

function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        swap(array, currentIndex, randomIndex);
    }
    return array;
}

export default class MemoryGame extends Component {
    state = {
        current_selection: [],
        foundCards: [],
        cardsInPlay: [],
        gameWon: false,
        gameStarted: false,
    };

    constructor() {
        super();
        const cards = [
            {
                src: Cards.Mayor,
                id: 0,
            },
            {
                src: Cards.BottleGuy,
                id: 1,
            },
            {
                src: Cards.BottleGuy,
                id: 2,
            },
            {
                src: Cards.BottleGuy,
                id: 3,
            },
            {
                src: Cards.BottleGuy,
                id: 4,
            },
            {
                src: Cards.BottleGuy,
                id: 5,
            },
            {
                src: Cards.BottleGuy,
                id: 6,
            },
            {
                src: Cards.BottleGuy,
                id: 7,
            },
        ];

        const doubleCards = cards.concat(JSON.parse(JSON.stringify(cards)));
        this.setState({
            cards: shuffleCards(doubleCards),
        });
    }

    handleCardClick(id) {
        const current_selection = this.state.current_selection;
        const index = this.state.cards.findIndex(card => card.id === id);

        if (this.state.cardsInPlay[index].is_open === false) {
            this.state.cardsInPlay[index].is_open = true;
            current_selection.push({...this.state.cardsInPlay[index], index});
        }

        if (current_selection.length === 2) {
            if (current_selection[0].id === current_selection[1].id) {
                this.state.foundCards.push(current_selection[0]);
                this.state.foundCards.push(current_selection[1]);
            } else {
                this.state.cardsInPlay[current_selection[0].index].is_open = false;
                this.state.cardsInPlay[current_selection[1].index].is_open = false;
            }
        }
        if (this.state.foundCards.length === this.state.cardsInPlay.length) {
            this.setState({
                gameWon: true,
            });
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="App">
                <header>
                    <h3>Play the Flip card game</h3>
                    <div>Select two cards with same content consecutively to make them vanish</div>
                </header>
                <View style={[styles.mt4]}>
                    {this.state.gameStarted ? (
                        <div className="container">
                            {this.state.cardsInPlay.map((card, index) => (
                                <Card key={index} card={card} index={index} onClick={id => this.handleCardClick(id)} />
                            ))}
                            {' '}
                            }
                        </div>
                    ) : (
                        <Button onPress={() => this.setState({gameStarted: true})} text="start game" success large />
                    )}
                </View>
            </div>
        );
    }
}
