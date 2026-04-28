import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const userLogado = await AsyncStorage.getItem("userLogado");

      if (userLogado) {
        setUser(JSON.parse(userLogado));
      }

      setLoading(false); 
    }

    loadUser();
  }, []);

  async function cadastro(nome, email, senha) {
    const novoUsuario = { nome, email, senha };

    const usuariosSalvos = await AsyncStorage.getItem("usuarios");
    const usuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    const existe = usuarios.find(u => u.email === email);

    if (existe) {
    throw new Error("Usuário já existe");
    }

    usuarios.push(novoUsuario);

    await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));
    await AsyncStorage.setItem("userLogado", JSON.stringify(novoUsuario));

    setUser(novoUsuario);
  }

  async function login(email, senha) {
    const usuariosSalvos = await AsyncStorage.getItem("usuarios");
    const usuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    const userData = usuarios.find(
    (u) => u.email === email && u.senha === senha
    );

    if (userData) {
    setUser(userData);
    await AsyncStorage.setItem("userLogado", JSON.stringify(userData));
    return true;
    }

    return false;
  }

  async function logout() {
    await AsyncStorage.removeItem("userLogado");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, cadastro, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}