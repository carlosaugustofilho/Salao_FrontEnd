import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaginaInicial from '../components/paginas/PaginaInicial/PaginaInicial';
import PaginaAgendamento from '../components/paginas/PaginaAgendamento/PaginaAgendamento';
import Login from '../Form/Login';
import Register from '../Form/Register';
import HorariosDisponiveis from '../components/HorariosDisponiveis';
import AdicionarAgendamento from '../components/AdicionarAgendamento';
import PrivateRoute from './PrivateRoute';

const Rotas = () => (
  <Routes>
    <Route exact path="/" element={<PaginaInicial />} />
    <Route path="/agendamentos" element={<PaginaAgendamento />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/horariosdisponiveis" element={<HorariosDisponiveis barbeiroId={1} />} /> {/* Ajuste o barbeiroId conforme necessário */}
    <PrivateRoute path="/adicionar-agendamento" element={AdicionarAgendamento} />
  </Routes>
);

export default Rotas;
