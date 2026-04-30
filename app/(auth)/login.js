import { useState, useRef} from "react";
import { View, TextInput, Text ,TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, ScrollView,  Alert, Platform } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";


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
        e.senha = 'Senha deve ter mínimo 6 caracteres';
    }
    setErros(e);
    return Object.keys(e).length === 0;
  };


  const formularioValido =
     emailRegex.test(email) &&
    senha.length >= 6;

 // 🔐 login
  const handleLogin = async () => {
    if (!validar()) return;

    try {
        setCarregando(true);
        const sucesso = await login(email, senha);

        if (sucesso) {
            Alert.alert('Login realizado!', `Bem-vindo(a), ${email}! 🎉`);
            router.replace("/(tabs)");
        } else {
            setErros({
                geral: 'E-mail ou senha incorretos'
            });
        }

    } catch (e) {
        console.log(e);
    } finally {
        setCarregando(false); 
    }


  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.titulo}>🔐 Login</Text>
            <Text style={styles.subTitulo}>Faça o Login para entrar no FiapRoom app!</Text>

             {/* E-mail */}
            <Campo label="E-mail" erro={erros.email}>
                <TextInput
                    ref={emailRef}
                    placeholder="E-mail"
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
                <View style={[styles.senhaContainer, erros.senha && styles.inputErro]}>
                    <TextInput
                        ref={senhaRef}
                        placeholder="Senha"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={!senhaVisivel}
                        autoCapitalize="none"
                        returnKeyType="done"
                        onSubmitEditing={handleLogin}
                        style={[styles.inputSenha]}
                    />
                    <Text
                        onPress={() => setSenhaVisivel(!senhaVisivel)}
                        style={styles.olho}
                    >
                        {senhaVisivel ? '🙈' : '👁️'}
                    </Text>
                </View>
            </Campo>
            {erros.geral && (
              <Text style={styles.erro}>{erros.geral}</Text>
            )}
             {/* Botão */}
            <TouchableOpacity
                style={[
                    styles.botao,
                    { backgroundColor: formularioValido ? '#3CB371' : '#E83D84' }
                ]}
                onPress={handleLogin}
                disabled={carregando}
            >
                <Text style={styles.botaoTexto}>
                {carregando ? 'Logando...' : 'Entrar'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(auth)/cadastro')}>
                <Text style={styles.cadastro}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>

        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center',padding: 24, backgroundColor: '#363636'},
  titulo: {fontSize: 32, fontWeight: 'bold',textAlign: 'center', marginBottom: 38, color: '#E83D84'},
  subTitulo: {fontSize: 28,textAlign: 'center', marginBottom: 38, color: '#f5f5f5'},
  campoWrapper: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#f5f5f5', marginBottom: 6 },
  input: {backgroundColor: '#fff',borderWidth: 1, borderColor: '#ddd',borderRadius: 10, padding: 14, marginBottom: 8, fontSize: 16},
  inputSenha: {flex: 1,padding: 14,fontSize: 16,backgroundColor: '#fff', borderRadius: 10},
  inputErro: { borderColor: 'red' },
  senhaContainer: {flexDirection: 'row',alignItems: 'center',backgroundColor: '#fff',borderWidth: 1, borderColor: '#ddd',borderRadius: 10,marginBottom: 8},
  olho: { padding: 14, fontSize: 20 },
  erro: { color: 'red', marginBottom: 8, marginLeft: 4},
  botao: {borderRadius: 10,padding: 16,marginTop: 16,alignItems: 'center'},
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  cadastro: {fontSize: 20,marginTop: 20,textAlign: 'center',color: '#E83D84',fontWeight: 'bold'}
});
