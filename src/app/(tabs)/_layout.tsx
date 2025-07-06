import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function Layout() {
    return (
        <Tabs initialRouteName="index" screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome name="home" size={28} color={color} />
                }}
                
            />
            <Tabs.Screen name="produtosAdicionar/index"
                options={{
                    title: "Novo produto",
                    tabBarIcon: ({ color }) => <FontAwesome name="shopping-cart" size={28} color={color} />
                }}
            />
        </Tabs>
    )
}