import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';

export default function Reservas() {
  const router = useRouter();
  const [salas, setSalas] = useState([]);
  const [reserva, setReserva] = useState(null);

  const tituloTela = "Fazer Reserva";

  useEffect(() => {
    const laboratorios = [
      { sala: '103', andar: '1', unidade: 'Paulista', horario: '7:10 - 11:50', livre: true },
      { sala: '205', andar: '2', unidade: 'Paulista', horario: '18:10 - 22:50', livre: false },
      { sala: '403', andar: '4', unidade: 'Paulista', horario: '7:10 - 11:50', livre: true },
      { sala: '507', andar: '5', unidade: 'Paulista', horario: '18:10 - 22:50', livre: true },
      { sala: '608', andar: '6', unidade: 'Paulista', horario: '18:10 - 22:50', livre: true },
      { sala: '706', andar: '7', unidade: 'Paulista', horario: '7:10 - 11:50', livre: false },
    ];

    setSalas(laboratorios.filter(s => s.livre));
  }, []);

  async function agendarNotificacao(sala) {
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

  if (reserva) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.titulo}>Reserva confirmada</Text>

          <Text style={styles.mensagem}>
            Sala {reserva.sala} - Andar {reserva.andar}
            {"\n"}Horário: {reserva.horario}
          </Text>

          <TouchableOpacity style={styles.botao} onPress={() => router.back()}>
            <Text style={styles.botaoTexto}>Voltar ao menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={salas}
      keyExtractor={(item) => item.sala}
      contentContainerStyle={styles.container}

      ListHeaderComponent={
        <Text style={styles.titulo}>📅 {tituloTela}</Text>
      }

      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={async () => {
            setReserva(item);
            await agendarNotificacao(item);
          }}
        >
          <Text style={styles.sala}>Sala {item.sala} - Andar {item.andar}</Text>
          <Text style={styles.info}>Unidade: {item.unidade}</Text>
          <Text style={styles.horario}>Horário: {item.horario}</Text>

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
  principal: '#FF2D6F',
  texto: '#FFFFFF',
  textoSecundario: '#AAAAAA'
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
    textAlign: 'center'
  },

  card: {
    backgroundColor: cores.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
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
    color: cores.principal
  },

  mensagem: {
    color: cores.texto,
    fontSize: 18,
    textAlign: 'center'
  }
});