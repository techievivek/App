import * as React from 'react';
import {StyleSheet, Pressable, Image} from 'react-native';

import Animated, {
    useSharedValue, useAnimatedStyle, withRepeat, withTiming,
} from 'react-native-reanimated';

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
        swap(array, currIndex, randomIndex);
    }
    return array;
}

export default function Card({
    index, key, card, onPress, isDisabled, isInactive, isFlipped, img,
}) {
    console.log('index');
    const [isOn, setIsOn] = React.useState(false);

    const sv = useSharedValue(0);

    const handlePress = () => {
        console.log('flip', isOn);
        setIsOn(!isOn);

        if (onPress) {
            onPress();
        }
    };

    React.useEffect(() => {
        sv.value = withRepeat(withTiming(90, {duration: 500}), 2, true);
    }, [isOn]);

    const style = useAnimatedStyle(() => ({
        transform: [{rotateY: `${-sv.value}deg`}],
    }));

    return (
        <Animated.View style={style}>
            <Pressable disabled={isDisabled} style={[styles.container]} onPress={handlePress}>
                <Image source={card.src} style={{height: 100, width: 100}} />
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        backgroundColor: 'green',
    },
});
