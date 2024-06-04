import { useState, useEffect } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        console.log('useAuth - Dados do usuário recuperados do localStorage:', userData);
        if (userData) {
            try {
                const parsedUserData = JSON.parse(userData);
                console.log('useAuth - Dados do usuário após parse:', parsedUserData);
                setUser(parsedUserData);
            } catch (error) {
                console.error('Erro ao analisar os dados do usuário do localStorage:', error);
            }
        }
    }, []);

    const handleLogin = (user) => {
        console.log('useAuth - Armazenando dados do usuário:', user);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('useAuth - Usuário deslogado e dados removidos do localStorage');
    };

    return { user, handleLogin, handleLogout };
};

export default useAuth;
