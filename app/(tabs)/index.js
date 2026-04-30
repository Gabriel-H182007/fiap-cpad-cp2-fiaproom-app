import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";

const cores = {
  fundo: '#121212',
  card: '#1E1E1E',
  principal: '#FF2D6F',
  texto: '#FFFFFF',
  textoSecundario: '#AAAAAA',
  erro: '#FF4C4C'
};

export default function Fiaproom() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(auth)/login");
    }
  }, [user, loading]);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.saudacao}>👋 Bem-vindo</Text>

      <Image
        source={{ uri: 'https://www.fiap.com.br/wp-content/themes/fiap2016/images/sharing/fiap.png' }}
        style={styles.logo}
      />

      <Text style={styles.titulo}>FiapRoom</Text>

      <Text style={styles.descricao}>
        Encontre salas livres de forma rápida e prática
      </Text>

      <TouchableOpacity style={styles.botao} onPress={() => router.push('/salas')}>
        <Text style={styles.botaoTexto}>Ver salas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => router.push('/reservas')}>
        <Text style={styles.botaoTexto}>Reservar sala</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.botaoTexto}>Sair</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center', // tem que ter isso
  justifyContent: 'center',
  backgroundColor: cores.fundo,
  padding: 20
},

 logo: {
  width: 200,
  height: 200,
  borderRadius: 100,
  borderWidth: 3,
  borderColor: '#FF2D6F',
  marginBottom: 20,
  alignSelf: 'center'
},

  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: cores.texto
  },

  descricao: {
    fontSize: 14,
    color: cores.textoSecundario,
    textAlign: 'center',
    marginBottom: 30
  },

  saudacao: {
    color: cores.texto,
    marginBottom: 10
  },

  botao: {
    backgroundColor: cores.principal,
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center'
  },

  logout: {
    backgroundColor: cores.erro,
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: '600'
  }
});