import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
 
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

  const salasLivres = salas.filter(sala => sala.livre);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.numero}>🏫 Sala {item.sala} - Andar {item.andar}</Text>
      <Text style={styles.info}>🏢 Unidade - {item.unidade}</Text>
      <Text style={styles.status}>🕒 {item.horario}</Text>
      <Text style={styles.status}>✅ Livre</Text>
    </View>
  );

  return (
    <FlatList
      data={salasLivres}
      keyExtractor={(item) => item.sala}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <Text style={styles.titulo}>🔎 Salas disponíveis</Text>
      }
      ListFooterComponent={
        <>
          <TouchableOpacity style={styles.botaoReserva} onPress={() => router.push('/reservas')}>
            <Text style={styles.textoBotaoReserva}>📅 Faça sua reserva</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.botaoVoltar}>← Voltar</Text>
          </TouchableOpacity>
        </>
      }
      ListEmptyComponent={
        <Text style={styles.vazio}>
          ❌ Nenhuma sala livre disponível no momento
        </Text>
      }
    />
  );
}
const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#363636', padding:24},
  card: {backgroundColor: '#FF2D6F', width: '85%', padding: 10, borderRadius: 12, marginBottom: 16, justifyContent: 'center', alignSelf: 'center'},
  linha: {flexDirection: 'row', justifyContent: 'space-between'},
  titulo: {fontSize: 32,fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#fff'},
  numero: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#fff'},
  info: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#fff'},
  horario: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#fff'},
  status: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#fff'},
  botaoReserva: {fontSize: 14, backgroundColor: '#E83D84', padding: 14, borderRadius: 12, marginTop: 14, width: '85%', marginBottom: 12, alignSelf: 'center'},
  textoBotaoReserva: {color: '#fff',fontSize: 18,fontWeight: 'bold',textAlign: 'center'},
  botaoVoltar: { fontSize: 20, color: '#E83D84', fontWeight: '600', textAlign: 'center', justifyContent: 'center', marginBottom: 20},
  vazio: {fontSize: 25, marginBottom: 20, marginTop: 30, fontWeight: 'bold',  textAlign: 'center', color: '#fff'},
});