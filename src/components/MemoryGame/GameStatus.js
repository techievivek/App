import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/styles';
import Text from '../Text';

const GameStatus = props => (
    <View style={[styles.gameStatusContainer]}>
        <View style={[styles.flex1, styles.gameStatusScoreContainer]}>
            <Text>Low score: </Text>
            <Text>{props.lowScore ? props.lowScore : 'N/A' }</Text>
        </View>
        <View style={[styles.flex1, styles.gameStatusScoreContainer]}>
            <Text>Total Clicks: </Text>
            <Text>{props.totalClicks}</Text>
        </View>
    </View>
);

GameStatus.propTypes = {
    lowScore: PropTypes.number,
    totalClicks: PropTypes.number,
};
GameStatus.defaultProps = {
    lowScore: undefined,
    totalClicks: 0,
};
GameStatus.displayName = 'GameStatus';

export default GameStatus;
