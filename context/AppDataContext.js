import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Criamos e exportamos o Contexto (é isso que o useContext vai procurar nas telas)
export const AppDataContext = createContext({});

// 2. Criamos o Provider que vai gerenciar os estados e o AsyncStorage
export function AppDataProvider({ children }) {
  const [reservas, setReservas] = useState([]);

  // Lê os dados salvos quando o app inicia
  useEffect(() => {
    async function carregarDados() {
      try {
        const reservasSalvas = await AsyncStorage.getItem('@FiapRoom:reservas');
        if (reservasSalvas) {
          setReservas(JSON.parse(reservasSalvas));
        }
      } catch (error) {
        console.error("Erro ao carregar reservas:", error);
      }
    }
    carregarDados();
  }, []);

  // Adiciona uma nova reserva e salva no AsyncStorage
  async function addReserva(novaReserva) {
    try {
      const novasReservas = [...reservas, novaReserva];
      setReservas(novasReservas);
      await AsyncStorage.setItem('@FiapRoom:reservas', JSON.stringify(novasReservas));
    } catch (error) {
      console.error("Erro ao salvar reserva:", error);
    }
  }

  // Remove uma reserva e atualiza o AsyncStorage
  async function removeReserva(id) {
    try {
      const novasReservas = reservas.filter(reserva => reserva.id !== id);
      setReservas(novasReservas);
      await AsyncStorage.setItem('@FiapRoom:reservas', JSON.stringify(novasReservas));
    } catch (error) {
      console.error("Erro ao remover reserva:", error);
    }
  }

  // Disponibiliza as variáveis e funções para o resto do app
  return (
    <AppDataContext.Provider value={{ reservas, addReserva, removeReserva }}>
      {children}
    </AppDataContext.Provider>
  );
}