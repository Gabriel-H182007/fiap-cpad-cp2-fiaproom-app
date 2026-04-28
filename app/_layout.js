import { AuthProvider, useAuth } from "../context/AuthContext";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

function Rotas() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <Text>Carregando...</Text>
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
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
}