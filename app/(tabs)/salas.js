import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
 
export default function Salas() {
    const router = useRouter();
    const [salas, setSalas] = useState([]);
 
    useEffect(() => {
        const laboratorios = [
            {sala: '103', andar: '1', unidade: 'Paulista', horario:'7:10 - 11:50', livre: true},
            {sala: '205', andar: '2', unidade: 'Paulista', horario:'18:10 - 22:50', livre: false},
            {sala: '403', andar: '4', unidade: 'Paulista', horario:'7:10 - 11:50',  livre: true},
            {sala: '507', andar: '5', unidade: 'Paulista', horario:'18:10 - 22:50',  livre: true},
            {sala: '608', andar: '6', unidade: 'Paulista', horario:'18:10 - 22:50', livre: true},
            {sala: '706', andar: '7', unidade: 'Paulista', horario:'7:10 - 11:50', livre: false},
        ];
        setSalas(laboratorios);
    },[]);
 
    const salasLivres = salas.filter(sala => sala.livre);
    const app = {
        titulo : "Salas disponíveis",
    }
 
    if (salasLivres.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>🔎 {app.titulo}</Text>
        <Text style={styles.vazio}>
          ❌ Nenhuma sala livre disponível no momento
        </Text>
 
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.botaoVoltar}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }
 
return (
    <View style={styles.container}>
        {/* título */}
        <Text style={styles.titulo}>🔎 {app.titulo}</Text>
       
        {salasLivres.map((item, index) => (
  <View key={index} style={styles.card}>
    <View style={styles.linha}>
        <Text style={styles.numero}>🏫 Sala {item.sala} - Andar {item.andar}</Text>
    </View>
    <View style={styles.linha}>
        <Text style={styles.info}>🏢 Unidade - {item.unidade}</Text>
     </View>
     <View style={styles.linha}>
        <Text style={styles.status}>Horário: 🕒 {item.horario}</Text>
     </View>
    <View style={styles.linha}>
        <Text style={styles.status}>Status: ✅ Livre</Text>
     </View>
  </View>
))}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.botaoVoltar}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#363636', padding:24},
  card: {backgroundColor: '#FF2D6F', width: '85%', padding: 10, borderRadius: 12, marginBottom: 16, justifyContent: 'center'},
  linha: {flexDirection: 'row', justifyContent: 'space-between'},
  titulo: {fontSize: 32,fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#fff'},
  numero: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#fff'},
  info: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#fff'},
  horario: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#fff'},
  status: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#fff'},
  botaoVoltar: { fontSize: 20, color: '#E83D84', fontWeight: '600', textAlign: 'center', justifyContent: 'center', marginBottom: 20},
  vazio: {fontSize: 25, marginBottom: 20, marginTop: 30, fontWeight: 'bold',  textAlign: 'center', color: '#fff'},
});