import { useState, useRef } from "react";
import {
  View, TextInput, Text, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, ScrollView, Alert, Platform
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

const cores = {
  fundo: '#121212',
  card: '#1E1E1E',
  principal: '#FF2D6F',
  sucesso: '#3CB371',
  texto: '#FFFFFF',
  textoSecundario: '#AAAAAA',
  erro: '#FF4C4C'
};

const Campo = ({ label, erro, children }) => (
  <View style={styles.campoWrapper}>
    <Text style={styles.label}>{label}</Text>
    {children}
    {erro ? <Text style={styles.erro}>{erro}</Text> : null}
  </View>
);

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState({});

  const emailRef = useRef(null);
  const senhaRef = useRef(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validar = () => {
    const e = {};

    if (!email.trim()) {
      e.email = 'E-mail obrigatório';
    } else if (!emailRegex.test(email)) {
      e.email = 'E-mail inválido';
    }

    if (!senha) {
      e.senha = 'Senha obrigatória';
    } else if (senha.length < 6) {
      e.senha = 'Mínimo 6 caracteres';
    }

    setErros(e);
    return Object.keys(e).length === 0;
  };

  const formularioValido =
    emailRegex.test(email) &&
    senha.length >= 6;

  const handleLogin = async () => {
    if (!validar()) return;

    try {
      setCarregando(true);
      const sucesso = await login(email, senha);

      if (sucesso) {
        Alert.alert('Sucesso', `Bem-vindo, ${email}`);
        router.replace("/(tabs)");
      } else {
        setErros({ geral: 'E-mail ou senha incorretos' });
      }

    } catch (e) {
      console.log(e);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.titulo}>Login</Text>
        <Text style={styles.subTitulo}>Entre na sua conta</Text>

        <Campo label="E-mail" erro={erros.email}>
          <TextInput
            ref={emailRef}
            placeholder="seu@email.com"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => senhaRef.current.focus()}
            style={[styles.input, erros.email && styles.inputErro]}
          />
        </Campo>

        <Campo label="Senha" erro={erros.senha}>
          <View style={[styles.inputContainer, erros.senha && styles.inputErro]}>
            <TextInput
              ref={senhaRef}
              placeholder="Senha"
              placeholderTextColor="#888"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!senhaVisivel}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              style={styles.inputSenha}
            />
            <Text onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.olho}>
              {senhaVisivel ? '🙈' : '👁️'}
            </Text>
          </View>
        </Campo>

        {erros.geral && (
          <Text style={styles.erro}>{erros.geral}</Text>
        )}

        <TouchableOpacity
          style={[
            styles.botao,
            { backgroundColor: formularioValido ? cores.sucesso : cores.principal }
          ]}
          onPress={handleLogin}
          disabled={carregando}
        >
          <Text style={styles.botaoTexto}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/cadastro')}>
          <Text style={styles.cadastro}>Criar conta</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: cores.fundo
  },

  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: cores.texto,
    textAlign: 'center'
  },

  subTitulo: {
    fontSize: 16,
    color: cores.textoSecundario,
    textAlign: 'center',
    marginBottom: 30
  },

  campoWrapper: { marginBottom: 16 },

  label: {
    color: cores.texto,
    marginBottom: 6,
    fontWeight: '600'
  },

  input: {
    backgroundColor: cores.card,
    borderRadius: 10,
    padding: 14,
    color: cores.texto
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.card,
    borderRadius: 10
  },

  inputSenha: {
    flex: 1,
    padding: 14,
    color: cores.texto
  },

  olho: {
    padding: 12,
    fontSize: 18
  },

  inputErro: {
    borderWidth: 1,
    borderColor: cores.erro
  },

  erro: {
    color: cores.erro,
    marginTop: 4
  },

  botao: {
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center'
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  cadastro: {
    marginTop: 20,
    textAlign: 'center',
    color: cores.principal,
    fontWeight: '600'
  }
});