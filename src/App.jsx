import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FormularioAgendamentoBarbeiro from './components/Form/FormularioAgendamentoBarbeiro';
import TabelaAgendamentos from './components/table/TabelaAgendamentos';
import TabelaHorariosDisponiveis from './components/table/TabelaHorariosDisponiveis';
import Login from './components/Login/Login';
import FormularioRegistro from './components/Form/FormularioRegistro';
import useAuth from './hooks/useAuth';
import Menu from './components/Menu/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import useHorarios from './hooks/useHorario';

const App = () => {
    const { user, handleLogin, handleLogout } = useAuth();
    const barbeiroId = user ? user.usuarioId : 1;
    const { horarios, handleAgendar, adicionarHorario, removerHorario } = useHorarios(barbeiroId);
    const [dataSelecionada, setDataSelecionada] = useState(new Date());

    useEffect(() => {
        console.log('Dados do usuário no App:', user);
    }, [user]);

    useEffect(() => {
        console.log('Horários obtidos:', horarios);
    }, [horarios]);

    return (
        <Router>
            <div className="container">
                {user && <Menu onLogout={handleLogout} userName={user.nome} />}
                <Routes>
                    <Route path="/login" element={user ? <Navigate to="/horariosdisponiveis" /> : <Login onLogin={handleLogin} />} />
                    <Route path="/register" element={user ? <Navigate to="/horariosdisponiveis" /> : <FormularioRegistro />} />
                    <Route path="/horariosdisponiveis" element={<TabelaHorariosDisponiveis horarios={horarios} cliente={user} onAgendar={handleAgendar} />} />
                    <Route path="/horarios" element={user ? (
                        <>
                            <FormularioAgendamentoBarbeiro adicionarHorario={adicionarHorario} barbeiro={user} />
                            <TabelaAgendamentos horarios={horarios} removerHorario={removerHorario} />
                        </>
                    ) : (
                        <Navigate to="/login" />
                    )} />
                    <Route path="/" element={<div></div>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
