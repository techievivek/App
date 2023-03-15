import React, {useState} from 'react';
import {View} from 'react-native';
import styles from '../../styles/styles';
import Button from '../Button';
import withLocalize, {withLocalizePropTypes} from '../withLocalize';

function App(props) {
    const [shouldTheGameStart, setShouldTheGameStart] = useState(false);
    const [cards, setCards] = useState(
      () => shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
    );
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [moves, setMoves] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const timeout = useRef(null);

    // Check if both the cards have same type. If they do, mark them inactive
    const evaluate = () => {
      const [first, second] = openCards;
      if (cards[first].type === cards[second].type) {
        setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
        setOpenCards([]);
        return;
      }
      // Flip cards after a 500ms duration
      timeout.current = setTimeout(() => {
        setOpenCards([]);
      }, 500);
    };

    const handleCardClick = (index) => {
      // Have a maximum of 2 items in array at once.
      if (openCards.length === 1) {
        setOpenCards((prev) => [...prev, index]);
        // increase the moves once we opened a pair
        setMoves((moves) => moves + 1);
      } else {
        // If two cards are already open, we cancel timeout set for flipping cards back
        clearTimeout(timeout.current);
        setOpenCards([index]);
      }
    };

    const checkIsFlipped = (index) => {
      return openCards.includes(index);
    };

    const checkIsInactive = (card) => {
      return Boolean(clearedCards[card.type]);
    };

    useEffect(() => {
      if (openCards.length === 2) {
        setTimeout(evaluate, 500);
      }
    }, [openCards]);

    return (
      <div className="App">
        <header>
          <h3>Play the Flip card game</h3>
          <div>
            Select two cards with same content consecutively to make them vanish
          </div>
        </header>
        <View style={[styles.mt4]}>
            {shouldTheGameStart ? (
                <view className="container">
                {cards.map((card, index) => {
                  return (
                    <Card
                      key={index}
                      card={card}
                      index={index}
                      onClick={handleCardClick}
                      isDisabled={shouldDisableAllCards}
                      isInactive={checkIsInactive(card)}
                      isFlipped={checkIsFlipped(index)}
                    />
                  );
                })}
                The Game
              </view>
            ) : (
                <Button onPress={() => setShouldTheGameStart(true)} text={props.translate('cardMemoryGame.startTheGame')} success large />
            )}
        </View>
     </div>
    )
};

App.propTypes = {
    ...withLocalizePropTypes,
};

export default withLocalize(App);