import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import scheduleService from '../../api/scheduleService';
import ModalAvisoAgendamento from '../modals/cliente/ModalAvisoAgendamento';

const TabelaHorariosDisponiveis = ({ horarios, cliente, onAgendar }) => {
    const [horariosState, setHorarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const horariosAgendados = JSON.parse(localStorage.getItem('horariosAgendados')) || [];
        const horariosAtualizados = horarios.map(horario => ({
            ...horario,
            agendado: horariosAgendados.includes(horario.id)
        }));
        setHorarios(horariosAtualizados);

        // Recuperar o usuário do localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUsuario(storedUser);
        }
    }, [horarios]);

    const handleAgendar = async (id) => {
        const horario = horariosState.find(h => h.id === id);
        if (!horario) {
            console.error('Horário não encontrado');
            return;
        }
        
        if (horario.agendado) {
            setShowModal(true);
            return;
        }

        if (!usuario || !cliente) {
            console.error('Usuário ou cliente não encontrado');
            return;
        }

        try {
            const agendamentoRequest = {
                clienteId: cliente.clienteId,
                barbeiroId: horario.barbeiroId,
                data: horario.data,
                horaInicio: horario.horaInicio,
                horaFim: horario.horaFim,
                usuarioId: usuario.usuarioId
            };

            console.log('POST endpoint:', '/Cliente/AgendarHorarioCliente');
            console.log('POST data:', agendamentoRequest);

            await scheduleService.agendarHorario(agendamentoRequest);

            const horariosAgendados = JSON.parse(localStorage.getItem('horariosAgendados')) || [];
            localStorage.setItem('horariosAgendados', JSON.stringify([...horariosAgendados, id]));

            setHorarios(horariosState.map(h =>
                h.id === id ? { ...h, agendado: true } : h
            ));

            alert('Agendamento realizado com sucesso!');
        } catch (error) {
            console.error('Erro ao agendar horário:', error);
            alert(`Erro ao agendar horário: ${error.message}`);
        }
    };

    return (
        <div className="row mt-4">
            <div className="col-12">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Hora Início</th>
                                <th>Hora Fim</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {horariosState.length > 0 ? (
                                horariosState.map((horario) => (
                                    <tr key={horario.id}>
                                        <td>{new Date(horario.data).toLocaleDateString()}</td>
                                        <td>{horario.horaInicio}</td>
                                        <td>{horario.horaFim}</td>
                                        <td>
                                            <button 
                                                className={`btn ${horario.agendado ? 'btn-danger' : 'btn-primary'}`} 
                                                onClick={() => handleAgendar(horario.id)}
                                                disabled={horario.agendado}
                                            >
                                                {horario.agendado ? 'Indisponível' : 'Agendar'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">Nenhum horário disponível...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalAvisoAgendamento show={showModal} handleClose={() => setShowModal(false)} />
        </div>
    );
};

TabelaHorariosDisponiveis.propTypes = {
    horarios: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            data: PropTypes.string.isRequired,
            horaInicio: PropTypes.string.isRequired,
            horaFim: PropTypes.string.isRequired,
            barbeiroId: PropTypes.number.isRequired,
            disponivel: PropTypes.number.isRequired, 
        })
    ).isRequired,
    cliente: PropTypes.shape({
        clienteId: PropTypes.number.isRequired,
        usuarioId: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }).isRequired,
    onAgendar: PropTypes.func.isRequired,
};

export default TabelaHorariosDisponiveis;
