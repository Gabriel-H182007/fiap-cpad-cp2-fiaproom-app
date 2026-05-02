import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { AppDataContext } from '../../context/AppDataContext'; 


export default function Reservas() {
  const router = useRouter();
  
  
  const { reservas = [], addReserva, removeReserva } = useContext(AppDataContext);

  const [salas, setSalas] = useState([]);
  const [reservaConfirmada, setReservaConfirmada] = useState(null); 

  const tituloTela = "Fazer Nova Reserva";

  useEffect(() => {
    
    const laboratorios = [
      { id: '1', sala: '103', andar: '1', unidade: 'Paulista', horario:'7:10 - 11:50', livre: true },
      { id: '2', sala: '205', andar: '2', unidade: 'Paulista', horario:'18:10 - 22:50', livre: false },
      { id: '3', sala: '302', andar: '3', unidade: 'Paulista', horario:'18:10 - 22:50', livre: false },
      { id: '4', sala: '403', andar: '4', unidade: 'Paulista', horario:'7:10 - 11:50', livre: true },
      { id: '5', sala: '507', andar: '5', unidade: 'Paulista', horario:'18:10 - 22:50', livre: true },
      { id: '6', sala: '608', andar: '6', unidade: 'Paulista', horario:'18:10 - 22:50', livre: true },
      { id: '7', sala: '705', andar: '7', unidade: 'Paulista', horario:'7:10 - 11:50', livre: true},
      { id: '8', sala: '707', andar: '7', unidade: 'Paulista', horario:'18:10 - 22:50', livre: true },
    ];

  
    const disponiveis = laboratorios.filter(
        lab => lab.livre && !reservas.some(r => r.id === lab.id)
    );

    setSalas(disponiveis);
  }, [reservas]); 

  async function agendarNotificacao(sala) {// Esta parte é responsável apenas para fins de testes no ambiente web, já que o Expo Go não suporta notificações locais. No dispositivo real, as notificações serão agendadas normalmente.
    if (Platform.OS === 'web') {
      console.log(`Simulação de Web: Notificação agendada para a sala ${sala.sala}`);
      return; 
    }

    const [horaInicio] = sala.horario.split(' - ');
    const [hora, minuto] = horaInicio.split(':');

    const agora = new Date();
    const dataReserva = new Date();

    dataReserva.setHours(parseInt(hora));
    dataReserva.setMinutes(parseInt(minuto));
    dataReserva.setSeconds(0);

    if (dataReserva < agora) {
      dataReserva.setDate(dataReserva.getDate() + 1);
    }

    const lembrete = new Date(dataReserva.getTime() - 10 * 60 * 1000);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reserva confirmada 📚",
        body: `Sala ${sala.sala} reservada para ${sala.horario}`,
      },
      trigger: null,
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete ⏰",
        body: `Sua reserva começa às ${horaInicio}`,
      },
      trigger: lembrete,
    });
  }

  const handleReservar = async (item) => {
    addReserva(item);
    setReservaConfirmada(item); 
    await agendarNotificacao(item); 
  };

  // TELA DE FEEDBACK VISUAL
  if (reservaConfirmada) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.titulo}>Reserva confirmada ✅</Text>

          <Text style={styles.mensagem}>
            🏫 Sala {reservaConfirmada.sala} - Andar {reservaConfirmada.andar}
            {"\n"}🕒 Horário: {reservaConfirmada.horario}
          </Text>

          <TouchableOpacity style={styles.botao} onPress={() => setReservaConfirmada(null)}>
            <Text style={styles.botaoTexto}>Voltar às Reservas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // TELA PRINCIPAL (LISTA)
  return (
    <FlatList
      data={salas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}

      ListHeaderComponent={
        <View>
          {/* SEÇÃO: MINHAS RESERVAS */}
          <Text style={styles.titulo}>✅ Minhas Reservas</Text>
          {reservas.length === 0 ? (
            <Text style={styles.vazio}>Nenhuma reserva ativa no momento.</Text>
          ) : (
            reservas.map((item) => (
              <View key={item.id} style={styles.cardReserva}>
                <Text style={styles.sala}>🏫 Sala {item.sala} - Andar {item.andar}</Text>
                <Text style={styles.info}>🏢 Unidade: {item.unidade}</Text>
                <Text style={styles.horario}>🕒 Horário: {item.horario}</Text>
                
                <TouchableOpacity style={styles.botaoCancelar} onPress={() => removeReserva(item.id)}>
                  <Text style={styles.textoBotao}>❌ Cancelar Reserva</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          <View style={styles.divisor} />

          {/* TÍTULO DA LISTA FLATLIST */}
          <Text style={styles.titulo}>📅 {tituloTela}</Text>
        </View>
      }

      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleReservar(item)}>
          <Text style={styles.sala}>🏫 Sala {item.sala} - Andar {item.andar}</Text>
          <Text style={styles.info}>🏢 Unidade: {item.unidade}</Text>
          <Text style={styles.horario}>🕒 Horário: {item.horario}</Text>

          <View style={styles.botaoReserva}>
            <Text style={styles.textoBotao}>Reservar</Text>
          </View>
        </TouchableOpacity>
      )}

      ListFooterComponent={
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.voltar}>Voltar ao menu</Text>
        </TouchableOpacity>
      }
    />
  );
}

const cores = {
  fundo: '#121212',
  card: '#1E1E1E',
  cardDestaque: '#2A3B2C', 
  principal: '#FF2D6F',
  cancelar: '#D32F2F', 
  texto: '#FFFFFF',
  textoSecundario: '#FFF'
};

const styles = StyleSheet.create({
   container: {
    flexGrow: 1,
    backgroundColor: cores.fundo,
    padding: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: cores.texto,
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center'
  },
  vazio: {
    color: cores.textoSecundario,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20
  },
  card: {
    backgroundColor: cores.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  cardReserva: {
    backgroundColor: cores.cardDestaque,
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#4CAF50'
  },
  sala: {
    fontSize: 18,
    fontWeight: '600',
    color: cores.texto
  },
  info: {
    fontSize: 14,
    color: cores.textoSecundario,
    marginTop: 4
  },
  horario: {
    fontSize: 14,
    color: cores.textoSecundario,
    marginTop: 4
  },
  botaoReserva: {
    marginTop: 12,
    backgroundColor: cores.principal,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  botaoCancelar: {
    marginTop: 12,
    backgroundColor: cores.cancelar,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  textoBotao: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  botao: {
    marginTop: 20,
    backgroundColor: cores.principal,
    padding: 12,
    borderRadius: 10
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '600'
  },
  voltar: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    color: cores.principal,
    fontWeight: '600',
    fontSize: 16
  },
  mensagem: {
    color: cores.texto,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28
  },
  divisor: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 25
  }
});