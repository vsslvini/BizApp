import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CustomTabBar } from "@/components/customTabBar";



export default function Layout() {
    return (
        <Tabs initialRouteName="index" screenOptions={{
            headerShown: false
        }}
            tabBar={prop => <CustomTabBar {...prop} />}
        >
            <Tabs.Screen name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome name="home" size={28} color={color} />
                }}

            />
            <Tabs.Screen name="estoque/index"
                options={{
                    title: "Produtos",
                    tabBarIcon: ({ color }) => <FontAwesome name="square" size={28} color={color} />
                }}
            />
            <Tabs.Screen name="produtosAdicionar/index"
                options={{
                    title: "Vendas",
                    tabBarIcon: ({ color }) => <FontAwesome name="shopping-cart" size={28} color={color} />
                }}
            />
            <Tabs.Screen name="clientes/index"
                options={{
                    title: "Clientes",
                    tabBarIcon: ({ color }) => <FontAwesome name="user-circle" size={28} color={color} />
                }}
            />

        </Tabs>
    )
}