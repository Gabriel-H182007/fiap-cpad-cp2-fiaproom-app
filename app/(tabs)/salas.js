import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput  } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';
import { AppDataContext } from '../../context/AppDataContext'; 

const cores = {
  fundo: '#121212',
  card: '#1E1E1E',
  principal: '#FF2D6F',
  texto: '#FFFFFF',
  textoSecundario: '#FFF'
};

export default function Salas() {
  const router = useRouter();
  
  
  const { reservas } = useContext(AppDataContext);
  
  const [salasLivres, setSalasLivres] = useState([]);
  const[buscar, setBuscar] = useState('');


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
        lab => lab.livre && !reservas?.some(reserva => reserva.id === lab.id)
    );

    const salasFiltradas = disponiveis.filter(
      lab => lab.sala.startsWith(buscar) ||lab.andar === buscar
    );


    setSalasLivres(salasFiltradas);
  }, [reservas, buscar]);

  return (
    <FlatList
      data={salasLivres}
      keyExtractor={(item) => item.id} 
      contentContainerStyle={styles.container}

      ListHeaderComponent={
        <>
          <Text style={styles.titulo}>🔎 Salas disponíveis</Text>
          <TextInput
              placeholder="Busque salas por número ou andar aqui"
              value={buscar}
              onChangeText={setBuscar}
              style={styles.inputBuscar}
            />
        </> 
      }

      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.sala}>🏫 Sala {item.sala} - Andar {item.andar}</Text>
          <Text style={styles.info}>🏢 Unidade: {item.unidade}</Text>
          <Text style={styles.info}>🕒 Horário: {item.horario}</Text>

          <View style={styles.statusLivre}>
            <Text style={styles.textoStatus}>Disponível</Text>
          </View>
        </View>
      )}

      ListFooterComponent={
        <>
          <TouchableOpacity style={styles.botao} onPress={() => router.push('/reservas')}>
            <Text style={styles.botaoTexto}>📅 Ir para Reservas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.voltar}>Voltar</Text>
          </TouchableOpacity>
        </>
      }

      ListEmptyComponent={
        <Text style={styles.vazio}>Nenhuma sala disponível no momento.</Text>
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

   inputBuscar:{
    flex: 1, 
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginBottom: 16
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
    fontWeight: '600',
    fontSize: 16
  },

  voltar: {
    textAlign: 'center',
    marginTop: 15,
    color: cores.principal,
    fontWeight: '600',
    fontSize: 16
  },

  vazio: {
    color: cores.textoSecundario,
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic'
  }
});