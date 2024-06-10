import React, { useState } from 'react';
import api from '../../api/scheduleService';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Tentando login com:', { email, senha });
            const response = await api.login(email, senha);
            const user = response;
            if (!user || !user.token) {
                throw new Error('Login falhou. Verifique suas credenciais.');
            }
            console.log('Resposta do login:', user);
    
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userId', user.usuarioId);
    
            if (user.clienteId) {
                localStorage.setItem('clienteId', user.clienteId); 
            }
    
            if (user.barbeiroId) {
                localStorage.setItem('barbeiroId', user.barbeiroId); 
            }
    
            onLogin(user);
            navigate('/horarios');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login: ' + error.message);
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            color: 'white',
            background: 'linear-gradient(to bottom, #333, #666)'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#444',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <img src="logo.png" alt="Amigo Cliente" style={{ width: '100px' }} />
                </div>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                fontSize: '16px',
                                backgroundColor: '#555',
                                color: 'white'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px', position: 'relative' }}>
                        <input
                            type={senhaVisivel ? "text" : "password"}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Senha"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                fontSize: '16px',
                                backgroundColor: '#555',
                                color: 'white'
                            }}
                        />
                        <span onClick={() => setSenhaVisivel(!senhaVisivel)} style={iconStyle}>
                            {senhaVisivel ? '🙈' : '👁️'}
                        </span>
                    </div>
                    <button type="submit" style={{
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        backgroundColor: '#555',
                        color: 'white',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}>
                        Login
                    </button>
                    <button type="button" onClick={handleRegisterClick} style={{
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        backgroundColor: '#777',
                        color: 'white',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};

const iconStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: 'white'
};

export default Login;
