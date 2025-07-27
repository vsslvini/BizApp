import { View, Platform } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Background } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

import { styles, PRIMARY_COLOR, SECUNDARY_COLOR } from './style';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {

                // console.log("Rota:", route);

                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                // const onLongPress = () => {
                //     navigation.emit({
                //         type: 'tabLongPress',
                //         target: route.key,
                //     });
                // };

                return (
                    <AnimatedTouchableOpacity
                        layout={LinearTransition.springify().mass(0.6)}
                        key={route.key}
                        // href={buildHref(route.name, route.params)}
                        // accessibilityState={isFocused ? { selected: true } : {}}
                        // accessibilityLabel={options.tabBarAccessibilityLabel}
                        // testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        // onLongPress={onLongPress}
                        style={[styles.tabItem, { backgroundColor: isFocused ? SECUNDARY_COLOR : "transparent" }]}
                        activeOpacity={0.5}
                    >
                        {getIconByRouteName(route.name, isFocused ? PRIMARY_COLOR : SECUNDARY_COLOR)}
                        {isFocused && <Animated.Text entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} style={styles.text}>
                            {/* {getIconByRouteName(route.name, "white")} */}
                            {label as string}
                        </Animated.Text>}
                    </AnimatedTouchableOpacity>
                );
            })}
        </View>
    );

    function getIconByRouteName(routeName: string, color: string) {
        switch (routeName) {
            case "index":
                return <FontAwesome name="home" size={28} color={color} />;
            case "produtosAdicionar/index":
                return <FontAwesome name="shopping-cart" size={28} color={color} />;
            case "clientes/index":
                return <FontAwesome name="user-circle" size={28} color={color} />;
            case "estoque/index":
                return <FontAwesome name="square" size={28} color={color} />;
            default:
                <FontAwesome name="home" size={28} color={color} />;
        }
    }
}