import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import withLocalize, {withLocalizePropTypes} from '../withLocalize';
import Text from '../Text';
import Button from '../Button';
import styles from '../../styles/styles';

const GameSummary = props => (
    <View>
        <View style={[styles.gameSummaryContainer]}>
            <Text style={[styles.gameSummaryTitle]}>{props.translate('cardMemoryGame.nailedIt')}</Text>
            <Text>
                {props.translate('cardMemoryGame.totalClicks')}
                {' '}
                {props.totalClicks}
            </Text>
            <Text>
                {props.isNewRecord && props.translate('cardMemoryGame.new')}
                {props.translate('cardMemoryGame.lowScore')}
                {' '}
                {props.lowScore}
            </Text>
        </View>
        <Button onPress={props.onPlayAgain} text={props.translate('cardMemoryGame.playAgain')} success />
    </View>
);

GameSummary.propTypes = {
    totalClicks: PropTypes.number,
    lowScore: PropTypes.number,
    isNewRecord: PropTypes.bool,
    onPlayAgain: PropTypes.func,

    ...withLocalizePropTypes,
};
GameSummary.defaultProps = {
    totalClicks: 0,
    lowScore: 0,
    isNewRecord: false,
    onPlayAgain: () => {},
};
GameSummary.displayName = 'GameSummary';

export default withLocalize(GameSummary);
