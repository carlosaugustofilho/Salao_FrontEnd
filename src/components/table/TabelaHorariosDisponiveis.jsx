import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import scheduleService from '../../api/scheduleService';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ModalAvisoAgendamento from '../modals/cliente/ModalAvisoAgendamento';

const TabelaHorariosDisponiveis = ({ horarios, cliente, onAgendar }) => {
    const [horariosState, setHorarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [usuario, setUsuario] = useState(null);
    const [clienteId, setClienteId] = useState(null);

    useEffect(() => {
        const horariosAgendados = JSON.parse(localStorage.getItem('horariosAgendados')) || [];
        const horariosAtualizados = horarios.map(horario => ({
            ...horario,
            agendado: horariosAgendados.includes(horario.id)
        }));
        setHorarios(horariosAtualizados);

        const storedUser = localStorage.getItem('user');
        const storedClienteId = localStorage.getItem('clienteId');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUsuario(parsedUser);
            } catch (error) {
                console.error('Erro ao analisar os dados do usuário do localStorage:', error);
            }
        }

        if (storedClienteId) {
            setClienteId(parseInt(storedClienteId, 10));
        }
    }, [horarios]);

    useEffect(() => {
        filterHorariosByDate(selectedDate);
    }, [selectedDate, horarios]);

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

        if (!usuario || !clienteId) {
            console.error('Usuário ou cliente não encontrado');
            return;
        }

        try {
            const agendamentoRequest = {
                clienteId: clienteId,
                barbeiroId: horario.barbeiroId,
                data: horario.data,
                horaInicio: horario.horaInicio,
                horaFim: horario.horaFim,
                usuarioId: usuario.usuarioId
            };

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

    const handleCloseModal = () => setShowModal(false);
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const filterHorariosByDate = (date) => {
        const horariosAgendados = JSON.parse(localStorage.getItem('horariosAgendados')) || [];
        const filteredHorarios = horarios.filter(horario => new Date(horario.data).toDateString() === date.toDateString())
            .map(horario => ({
                ...horario,
                agendado: horariosAgendados.includes(horario.id)
            }));
        setHorarios(filteredHorarios);
    };

    const renderDaysOfWeek = () => {
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(day.getDate() + i);
            days.push(
                <div
                    key={i}
                    className={`day ${day.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(day)}
                    style={{
                        cursor: 'pointer',
                        padding: '10px',
                        margin: '2px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        textAlign: 'center',
                        backgroundColor: day.toDateString() === selectedDate.toDateString() ? '#007bff' : 'transparent',
                        color: day.toDateString() === selectedDate.toDateString() ? '#fff' : '#000',
                        flex: '1'
                    }}
                >
                    {day.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })}
                </div>
            );
        }
        return days;
    };

    const goToPreviousWeek = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 7);
        setSelectedDate(newDate);
    };

    const goToNextWeek = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 7);
        setSelectedDate(newDate);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                <h2 className="mr-2 mb-2 mb-md-0">Horários Disponíveis</h2>
            </div>
            <div className="d-flex justify-content-between mb-4 align-items-center">
                <button className="btn btn-link" onClick={goToPreviousWeek}>
                    <FaArrowLeft />
                </button>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    {renderDaysOfWeek()}
                </div>
                <button className="btn btn-link" onClick={goToNextWeek}>
                    <FaArrowRight />
                </button>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <h4>{selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
            </div>
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
                                        <div 
                                            onClick={() => handleAgendar(horario.id)}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                backgroundColor: horario.agendado ? 'red' : 'green',
                                                display: 'inline-block',
                                                cursor: 'pointer'
                                            }}
                                        />
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
            <ModalAvisoAgendamento show={showModal} handleClose={handleCloseModal} />
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
