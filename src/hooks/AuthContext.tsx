import React, { createContext, useCallback, useState, useContext } from 'react'; // Uso createContext para criar um contexto na aplicação
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredenctials {
  email: string;
  password: string;
}

interface AuthContextData {
  // Aqui irei guardar as informações de contexto dento da minha  variavel AuthContext
  user: object;
  signIn(credentials: SignInCredenctials): Promise<void>;
  signOut(): void;
}

// 1 - Dentro ({} as AuthContext), faço dessa forma, pois não posso passar um
// nome, pois ele pode não estar logdo, nem vazio pois ele pode estar logado,
// Desta forma sempre que forço a aparecer {} obj dizendo q ele é no tipo AuthContext
// 2 - Aqui na criação do createContext passo meu <AuthContextData> para dizer o tipo das informaçoes de contexto q irei guardar
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
// Usando o AuthContext posso criar do contexto usando o a varaivel useContext.

const AuthProvider: React.FC = ({ children }) => {
  // Reponsavel por compatilhar os dados de contexto

  const [data, setData] = useState<AuthState>(() => {
    // INICIO Essa logica só é chamada quando o user, sair ou recarregar a pagína Para carregar as informações do storage
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  }); // FIM Essa logica só é chamada quando o user, sair ou recarregar a pagína

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Gobarber:token', token);
    localStorage.setItem('@Gobarber:user', JSON.stringify(user)); // O user cm é uma obj, uso o JSON.stringify para converter em uma string;
    setData({ token, user }); // Se não colocar esse setData não consigo pegar os dados por quando faço login isso já aconteceu porem com osvalores null, mas chamando
    // novamente o setData aqui eu irei passar os valores atualizados recebidos no login
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token');
    localStorage.removeItem('@Gobarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// export { AuthProvider, useAuth };
export { AuthProvider, useAuth };
