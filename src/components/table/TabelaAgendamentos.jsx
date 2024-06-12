import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import scheduleService from '../../api/scheduleService';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const TabelaAgendamentos = ({ removerHorario }) => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const response = await scheduleService.listarTodosAgendamentos();
                console.log('Agendamentos recebidos:', response);  // Verifica os dados recebidos
                setAgendamentos(response);
                filterAgendamentosByDate(response, selectedDate);
            } catch (error) {
                console.error('Erro ao buscar agendamentos:', error);
            }
        };

        fetchAgendamentos();
    }, []);

    useEffect(() => {
        filterAgendamentosByDate(agendamentos, selectedDate);
    }, [selectedDate, agendamentos]);

    const filterAgendamentosByDate = (agendamentos, date) => {
        const filtered = agendamentos.filter(agendamento => 
            new Date(agendamento.dataHoraAgendamento).toDateString() === date.toDateString()
        );
        setFilteredAgendamentos(filtered);
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
            <h2 className="text-center mb-4">Agendamentos</h2>
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
            <div className="row mt-4">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Data/Hora Agendamento</th>
                                    <th>Status</th>
                                    <th>Observações</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAgendamentos.map((agendamento) => (
                                    <tr key={agendamento.agendamentoId}>
                                        <td>{new Date(agendamento.dataHoraAgendamento).toLocaleString()}</td>
                                        <td>{agendamento.status}</td>
                                        <td>{agendamento.observacoes || ''}</td>
                                        <td>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => removerHorario(agendamento.agendamentoId)}
                                            >
                                                Remover
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredAgendamentos.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center">Nenhum agendamento disponível...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

TabelaAgendamentos.propTypes = {
    removerHorario: PropTypes.func.isRequired,
};

export default TabelaAgendamentos;
