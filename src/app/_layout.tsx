import CustomHeader from "@/components/customHeader";
import { HeaderProvider } from "@/contexts/contextCustomHeader";
import { InitializeDb } from "@/storage/initializeDb";
import { Tabs, Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();


export default function Layout() {

    const [fontsLoaded] = useFonts({
        "Roboto_Regula": Roboto_400Regular,
        "Roboto_Bold": Roboto_700Bold
    })


    useEffect(() => {
        if (fontsLoaded) {
        }
    }, [fontsLoaded])

    const onLayoutRootView = React.useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
        </View>
    )
} 