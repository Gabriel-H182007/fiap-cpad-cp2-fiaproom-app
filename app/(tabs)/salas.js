import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

const cores = {
  fundo: '#121212',
  card: '#1E1E1E',
  principal: '#FF2D6F',
  texto: '#FFFFFF',
  textoSecundario: '#AAAAAA'
};

export default function Salas() {
  const router = useRouter();
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const laboratorios = [
      { sala: '103', andar: '1', unidade: 'Paulista', horario:'7:10 - 11:50', livre: true },
      { sala: '205', andar: '2', unidade: 'Paulista', horario:'18:10 - 22:50', livre: false },
      { sala: '403', andar: '4', unidade: 'Paulista', horario:'7:10 - 11:50', livre: true },
      { sala: '507', andar: '5', unidade: 'Paulista', horario:'18:10 - 22:50', livre: true },
      { sala: '608', andar: '6', unidade: 'Paulista', horario:'18:10 - 22:50', livre: true },
      { sala: '706', andar: '7', unidade: 'Paulista', horario:'7:10 - 11:50', livre: false },
    ];
    setSalas(laboratorios);
  }, []);

  const salasLivres = salas.filter(s => s.livre);

  return (
    <FlatList
      data={salasLivres}
      keyExtractor={(item) => item.sala}
      contentContainerStyle={styles.container}

      ListHeaderComponent={
        <Text style={styles.titulo}>Salas disponíveis</Text>
      }

      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.sala}>Sala {item.sala} - Andar {item.andar}</Text>
          <Text style={styles.info}>Unidade: {item.unidade}</Text>
          <Text style={styles.info}>Horário: {item.horario}</Text>

          <View style={styles.statusLivre}>
            <Text style={styles.textoStatus}>Disponível</Text>
          </View>
        </View>
      )}

      ListFooterComponent={
        <>
          <TouchableOpacity style={styles.botao} onPress={() => router.push('/reservas')}>
            <Text style={styles.botaoTexto}>Reservar sala</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.voltar}>Voltar</Text>
          </TouchableOpacity>
        </>
      }

      ListEmptyComponent={
        <Text style={styles.vazio}>Nenhuma sala disponível</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: cores.fundo,
    padding: 20
  },

  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: cores.texto,
    textAlign: 'center',
    marginBottom: 20
  },

  card: {
    backgroundColor: cores.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12
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

  statusLivre: {
    marginTop: 10,
    backgroundColor: '#3CB371',
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },

  textoStatus: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },

  botao: {
    backgroundColor: cores.principal,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: '600'
  },

  voltar: {
    textAlign: 'center',
    marginTop: 15,
    color: cores.principal
  },

  vazio: {
    color: cores.texto,
    textAlign: 'center',
    marginTop: 40
  }
});