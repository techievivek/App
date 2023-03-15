import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/styles';
import Text from '../Text';
import withLocalize, {withLocalizePropTypes} from '../withLocalize';

const GameStatus = props => (
    <View style={[styles.gameStatusContainer]}>
        <View style={[styles.flex1, styles.gameStatusScoreContainer]}>
            <Text>
                {props.translate('cardMemoryGame.lowScore')}
                {' '}
            </Text>
            <Text>{props.lowScore ? props.lowScore : 'N/A' }</Text>
        </View>
        <View style={[styles.flex1, styles.gameStatusScoreContainer]}>
            <Text>
                {props.translate('cardMemoryGame.totalClicks')}
                {' '}
            </Text>
            <Text>{props.totalClicks}</Text>
        </View>
    </View>
);

GameStatus.propTypes = {
    lowScore: PropTypes.number,
    totalClicks: PropTypes.number,

    ...withLocalizePropTypes,
};
GameStatus.defaultProps = {
    lowScore: undefined,
    totalClicks: 0,
};
GameStatus.displayName = 'GameStatus';

export default withLocalize(GameStatus);
