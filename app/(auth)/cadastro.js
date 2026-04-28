import { useState, useContext, useRef} from 'react';
import { useAuth } from "../../context/AuthContext";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { useRouter } from "expo-router";

const Campo = ({ label, erro, children }) => (
  <View style={styles.campoWrapper}>
    <Text style={styles.label}>{label}</Text>
    {children}
    {erro ? <Text style={styles.erro}>{erro}</Text> : null}
  </View>
);

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome]             = useState('');
  const [email, setEmail]           = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [erros, setErros]           = useState({});
  const [carregando, setCarregando] = useState(false);
  const emailRef = useRef(null);
  const senhaRef = useRef(null);
  const confirmarSenhaRef = useRef(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const limparForm = () => {
  setNome('');
  setEmail('');
  setSenha('');
  setConfirmarSenha('');
  setErros({});
};

  const validar = () => {
    const e = {};
    if (!nome.trim())          e.nome   = 'Nome obrigatório';
    if (!email.trim()) e.email = 'E-mail obrigatório';
    if (!emailRegex.test(email))  e.email  = 'E-mail inválido';
    if (!senha) e.senha = 'Senha obrigatória';
    if (senha.length < 6) e.senha = 'Senha deve ter mínimo 6 caracteres';
    if (!confirmarSenha) e.confirmarSenha = 'Confirme a senha';
    if (senha != confirmarSenha) e.confirmarSenha = "Senha diferente da informada acima";
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const formularioValido =
    nome.trim() &&
    emailRegex.test(email)&&
    senha.length >= 6 &&
    senha === confirmarSenha ;

const { cadastro } = useAuth();

const handleCadastro = async () => {
    if (!validar()) return;

    try {
        setCarregando(true);
        await cadastro(nome, email, senha);
        limparForm();
        Alert.alert('🎉 Sucesso!', `Cadastro realizado! 🎉 `);
        router.replace('/(auth)/login');

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
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>📝 Cadastro</Text>
        <Text style={styles.subTitulo}>Cadastre-se para poder logar no app!</Text>

         {/* Nome */}
        <Campo label="Nome completo" erro={erros.nome}>
          <TextInput
            placeholder="Nome Completo"
            value={nome}
            onChangeText={setNome}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            style={[styles.input, erros.nome && styles.inputErro]}
          />
        </Campo>
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
          <View style={[styles.confirmarSenhaContainer, erros.confirmarSenha && styles.inputErro]}>
            <TextInput
              ref={senhaRef}
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!senhaVisivel}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => confirmarSenhaRef.current.focus()}
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
         <Campo label="Confirmar Senha" erro={erros.confirmarSenha}>
           <View style={[styles.confirmarSenhaContainer, erros.confirmarSenha && styles.inputErro]}>
            <TextInput
              ref={confirmarSenhaRef}
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!confirmarSenhaVisivel}
              autoCapitalize="none"
              returnKeyType="next"
              style={[styles.inputSenha]}
            />
            <Text onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}style={styles.olho}>
              {confirmarSenhaVisivel ? '🙈' : '👁️'}
            </Text>
           </View>
        </Campo>
        {/* Botão */}
        <TouchableOpacity
          style={[
              styles.botao,
              { backgroundColor: formularioValido ? '#3CB371' : '#E83D84' }
            ]}
            onPress={handleCadastro}
            disabled={carregando}
        >
          <Text style={styles.botaoTexto}>
            {carregando ? 'Enviando...' : 'Cadastrar'}
          </Text>
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
        paddingBottom: 60,
        backgroundColor: '#363636',
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
        color: '#FF2D6F',
    },
    subTitulo: {fontSize: 28,textAlign: 'center', marginBottom: 38, color: '#f5f5f5'},
    campoWrapper: { marginBottom: 16 },
    label: { fontSize: 14, fontWeight: '600', color: '#f5f5f5', marginBottom: 6 },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
    },
    
    inputSenha: {flex: 1,padding: 14,fontSize: 16,backgroundColor: '#fff', borderRadius: 10,},
    inputErro: { borderColor: 'red' },
    erro: { color: 'red', fontSize: 12, marginTop: 4},
    senhaContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd',
    borderRadius: 10, marginBottom: 8,
  },
  confirmarSenhaContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd',
    borderRadius: 10, marginBottom: 8,
  },
  olho: { padding: 14, fontSize: 20 },
  botao: {
    backgroundColor: '#FF2D6F',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});


