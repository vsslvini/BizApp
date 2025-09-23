import { View, StyleSheet } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

import { styles, PRIMARY_COLOR, SECUNDARY_COLOR } from './style';
import { gradientes } from "@/utils/colors"; // Assumindo que seu arquivo de gradientes está aqui
import FontAwesome from '@expo/vector-icons/FontAwesome';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { buildHref } = useLinkBuilder();

    function getIconByRouteName(routeName: string, color: string) {
        switch (routeName) {
            case "index":
                return <FontAwesome name="home" size={28} color={color} />;
            case "vendas/index":
                return <FontAwesome name="shopping-cart" size={28} color={color} />;
            case "clientes/index":
                return <FontAwesome name="user-circle" size={28} color={color} />;
            case "estoque/index":
                return <FontAwesome name="inbox" size={28} color={color} />;
            default:
                return <FontAwesome name="home" size={28} color={color} />;
        }
    }

    function getColorByRouteName(routeName: string) {
        switch (routeName) {
            case "index":
                return gradientes.g1;
            case "vendas/index":
                return gradientes.g3;
            case "clientes/index":
                return gradientes.g4;
            case "estoque/index":
                return gradientes.g2;
            default:
                return gradientes.g1;
        }
    }

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {

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

                return (
                    <AnimatedTouchableOpacity
                        // layout={LinearTransition.springify().mass(0.6)}
                        layout={LinearTransition.easing(Easing.elastic(0.6))}
                        key={route.key}
                        onPress={onPress}
                        style={styles.tabItem}
                        activeOpacity={0.5}
                    >
                        {/* Fundo em gradiente condicional */}
                        {isFocused && (
                            <LinearGradient
                                colors={getColorByRouteName(route.name)}
                                end={{ x: 1, y: 0 }} // Inicia na direita
                                start={{ x: 0, y: 0 }}   // Termina na esquerda
                                style={[StyleSheet.absoluteFill, { borderRadius: 30 }]}
                            />
                        )}

                        {/* Ícone */}
                        {getIconByRouteName(route.name, isFocused ? PRIMARY_COLOR : SECUNDARY_COLOR)}

                        {/* Texto */}
                        {isFocused && <Animated.Text entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} style={styles.text}>
                            {label as string}
                        </Animated.Text>}
                    </AnimatedTouchableOpacity>
                );
            })}
        </View>
    );
}