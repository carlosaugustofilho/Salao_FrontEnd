import React, { useState } from 'react';
import scheduleService from '../../api/scheduleService'; // Importe a função de registro do serviço

const Register = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [tipo, setTipo] = useState(1); // 1 para Cliente, 2 para Barbeiro
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }
        try {
            console.log('Tentando registrar usuário com os dados:', { nome, email, senha, tipo });
            await scheduleService.register(nome, email, senha, tipo);
            alert('Usuário registrado com sucesso!');
           
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
        }
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
                    <img src="logo.png" alt="Amigo Cliente" style={{ width: '100px' }} /> {/* Substitua pelo caminho da sua logo */}
                </div>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome"
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
                            {senhaVisivel ?  '👁️' :'🙈' }
                        </span>
                    </div>
                    <div style={{ marginBottom: '15px', position: 'relative' }}>
                        <input
                            type={confirmarSenhaVisivel ? "text" : "password"}
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            placeholder="Confirmar senha"
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
                        <span onClick={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)} style={iconStyle}>
                            {confirmarSenhaVisivel ? '🙈' : '👁️'}
                        </span>
                    </div>
                    <button type="submit" style={{
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        backgroundColor: '#FF6600',
                        color: 'white',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}>
                        CADASTRAR
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

export default Register;
