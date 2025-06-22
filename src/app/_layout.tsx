import { InitializeDb } from "@/storage/initializeDb";
import { Slot, Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
export default function Layout() {
    return (
        <SQLiteProvider databaseName="sqlite.db" onInit={InitializeDb}>
        
                <Slot />
          
        </SQLiteProvider>
    )
} 