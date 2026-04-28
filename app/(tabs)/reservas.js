import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Reservas() {
    const router = useRouter();
    const [salasDisponiveis, setSalasDisponiveis] = useState([]);
    const [salaReservada, setSalaReservada] = useState(null);
    useEffect(() => {
        const laboratorios = [
            {sala: '103', andar: '1', unidade: 'Paulista', horario:'7:10 - 11:50', livre: true},
            {sala: '205', andar: '2', unidade: 'Paulista', horario:'18:10 - 22:50', livre: false},
            {sala: '403', andar: '4', unidade: 'Paulista', horario:'7:10 - 11:50',  livre: true},
            {sala: '507', andar: '5', unidade: 'Paulista', horario:'18:10 - 22:50',  livre: true},
            {sala: '608', andar: '6', unidade: 'Paulista', horario:'18:10 - 22:50', livre: true},
            {sala: '706', andar: '7', unidade: 'Paulista', horario:'7:10 - 11:50', livre: false},
        ];
       
        setSalasDisponiveis(laboratorios.filter(sala => sala.livre));
    }, []);

    const app = {
        titulo : "Fazer Reserva",
    }

   
    if (salaReservada) {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>✅ Reserva Feita!</Text>
                
                <Text style={styles.mensagemSucesso}>
                    A sala {salaReservada.sala} (Andar {salaReservada.andar}) foi reservada com sucesso para o horário de {salaReservada.horario}.
                </Text>

                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.botaoVoltar}>← Voltar ao menu</Text>
                </TouchableOpacity>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>📅 {app.titulo}</Text>
            
            {salasDisponiveis.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.card}
                    onPress={() => setSalaReservada(item)} 
                >
                    <View style={styles.linha}>
                        <Text style={styles.numero}>🏫 Sala {item.sala} - Andar {item.andar}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Text style={styles.info}>🏢 Unidade - {item.unidade}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Text style={styles.horario}>Horário: 🕒 {item.horario}</Text>
                    </View>
                    <View style={styles.linhaCentralizada}>
                        <Text style={styles.textoAcao}>👉 Clique para reservar</Text>
                    </View>
                </TouchableOpacity>
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
  linhaCentralizada: {flexDirection: 'row', justifyContent: 'center', marginTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.3)', paddingTop: 8},
  titulo: {fontSize: 32,fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#fff'},
  numero: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#fff'},
  info: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#fff'},
  horario: {fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#fff'},
  textoAcao: {fontSize: 16, fontWeight: 'bold', color: '#FFD700'}, 
  botaoVoltar: { fontSize: 20, color: '#E83D84', fontWeight: '600', textAlign: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 20},
  mensagemSucesso: {fontSize: 22, marginBottom: 40, marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: '#fff', lineHeight: 30},
});