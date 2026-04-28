import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#E83D84' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'FiapRoom',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="salas"
        options={{
          title: 'Salas Disponíveis',
          tabBarIcon: ({ color }) => <Ionicons name="school" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reservas"
        options={{
          title: 'Reservar salas',
          tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}