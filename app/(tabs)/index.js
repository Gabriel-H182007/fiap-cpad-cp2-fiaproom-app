import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
 
export default function Fiaproom() {
  const router = useRouter();
  const app = {
    titulo: "🚀FiapRoom",
    descricao: "📍Encontre salas livres para estudos na FIAP de forma ágil e prática",
    logo: "data:image/jpeg;base64,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",
 
  };
  return (
    <View style={styles.container}>
      {/* Saudação */}
      <Text style={styles.saudacao}>👋Seja bem-vindo ao FiapRoom!</Text>
        {/* logo */}
        <Image
        source={{ uri: app.logo }}
        style={styles.logo}
        />
 
        {/* título */}
        <Text style={styles.titulo}>{app.titulo}</Text>
 
        {/* descrição */}
        <Text style={styles.descricao}>{app.descricao}</Text>
 
      <TouchableOpacity style={styles.botao} onPress={() => router.push('/salas')}>
        <Text style={styles.botaoTexto}>Ver salas disponíveis</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={() => router.push('/reservas')}>
        <Text style={styles.botaoTexto}>Reservar uma sala disponível</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#363636', padding:20},
  logo: {width: 200,
    height: 200,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#DC143C',
    marginBottom: 35},
  titulo:    { fontSize: 45, fontWeight: 'bold', marginBottom: 22, textAlign: 'center', color: '#FF2D6F'},
  descricao: { fontSize: 16, fontWeight: 'bold', marginBottom: 50,  textAlign: 'center', color: '#fff'},
  saudacao: {fontSize: 18, marginBottom: 26, color: '#fff'},
  botao:     { backgroundColor: '#E83D84', padding: 16, borderRadius: 12, marginBottom: 24, width: 300},
  botaoTexto:{ color: '#fff', fontSize: 20, fontWeight: '600', textAlign: 'center' },
});
 