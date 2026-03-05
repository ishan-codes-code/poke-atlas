import { ReactNode } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";

// type Props = {
//     children: ReactNode;
//     pressableStyles?: StyleProp<ViewStyle>;
//     viewStyles?: StyleProp<ViewStyle>;
//     onPress?: () => void;
//     layout?: LayoutAnimationBuilder | BaseAnimationBuilder;
//     entering?: BaseAnimationBuilder;
//     exiting?: BaseAnimationBuilder;
// }

type AnimatedViewProps = React.ComponentProps<typeof Animated.View>;

type Props = AnimatedViewProps & {
    children: ReactNode;
    pressableStyles?: StyleProp<ViewStyle>;
    viewStyles?: StyleProp<ViewStyle>;
    onPress?: () => void;
};



const AnimatedPressable = ({ children, pressableStyles, viewStyles, onPress, ...rest }: Props) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });


    const handlePressIn = () => {
        scale.value = withSpring(0.95, {
            stiffness: 400,
            damping: 20,
            mass: 0.5,
        });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            stiffness: 350,
            damping: 18,
            mass: 0.5,
        });
    };


    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={pressableStyles}
        >
            <Animated.View {...rest} style={[animatedStyle, viewStyles]}>
                {children}
            </Animated.View>
        </Pressable>
    );
};

export default AnimatedPressable