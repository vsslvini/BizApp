import CustomHeader from "@/components/customHeader";
import { HeaderProvider } from "@/contexts/contextCustomHeader";
import { InitializeDb } from "@/storage/initializeDb";
import { Tabs, Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function Layout() {
    return (
        <SQLiteProvider databaseName="sqlite.db" onInit={InitializeDb}>
            <SafeAreaProvider>
                <HeaderProvider>
                    <Stack screenOptions={{
                        headerShown: true,
                        header: CustomHeader,
                        // headerTransparent: true
                    }}>
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="teste" />

                    </Stack>
                </HeaderProvider>
            </SafeAreaProvider>



        </SQLiteProvider>
    )
} 