import { AuthProvider, useAuth } from "../context/AuthContext";
import { AppDataProvider } from "../context/AppDataContext"; 
import { Stack } from "expo-router";
import { View, Text,  ActivityIndicator } from "react-native";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function Rotas() {
  const { user, loading } = useAuth(); //[cite: 7]

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF2D6F" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)/login" />
      )}
    </Stack>
  );
}

export default function Layout() {
  useEffect(() => {
    async function configurarNotificacoes() {
      const { status } = await Notifications.requestPermissionsAsync(); //[cite: 7]

      if (status !== "granted") {
        alert("Permita notificações para receber lembretes!"); //[cite: 7]
      }
    }

    configurarNotificacoes(); //[cite: 7]
  }, []);

  return (
    
    <AuthProvider>
      <AppDataProvider>
        <Rotas />
      </AppDataProvider>
    </AuthProvider>
  );
}