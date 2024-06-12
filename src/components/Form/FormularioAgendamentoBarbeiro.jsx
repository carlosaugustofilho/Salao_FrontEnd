import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import scheduleService from '../../api/scheduleService';
import AdicionarHorarioModal from '../modals/barbeiro/AdicionarHorarioModal'; // Certifique-se de que o caminho está correto
import Opcoes from '../modals/barbeiro/Opcoes'; // Certifique-se de que o caminho está correto

const FormularioAgendamentoBarbeiro = ({ adicionarHorario, barbeiro }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

    useEffect(() => {
        if (barbeiro) {
            console.log('Barbeiro ID:', barbeiro.barbeiroId);
            console.log('Barbeiro Nome:', barbeiro.nome);
        }
    }, [barbeiro]);

    const fetchHorariosDisponiveis = async (date) => {
        try {
            const response = await scheduleService.listarHorarios(barbeiro.barbeiroId, date.toISOString());
            if (response.length > 0) {
                setHorariosDisponiveis(response);
            } else {
                console.log('Nenhum horário disponível para esta data.');
            }
        } catch (error) {
            console.error('Erro ao buscar horários disponíveis:', error);
        }
    };

    useEffect(() => {
        if (barbeiro) {
            fetchHorariosDisponiveis(selectedDate);
        }
    }, [selectedDate, barbeiro]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setShowOptionsModal(true);
    };

    const handleOptionSelect = (option) => {
        setShowOptionsModal(false);
        if (option === 'view') {
            // Exibe os horários disponíveis para a data selecionada
        } else if (option === 'add') {
            setShowModal(true);
        }
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
                    onClick={() => handleDateClick(day)}
                    style={{
                        cursor: 'pointer',
                        padding: '10px',
                        margin: '2px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        textAlign: 'center',
                        backgroundColor: day.toDateString() === selectedDate.toDateString() ? '#FF6600' : 'transparent',
                        color: day.toDateString() === selectedDate.toDateString() ? '#fff' : '#fff',
                        flex: '1',
                        minWidth: '40px'
                    }}
                >
                    {day.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })}
                </div>
            );
        }
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%' }}>
                {days}
            </div>
        );
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

    const horariosFiltrados = horariosDisponiveis.filter((horario) => {
        const horarioDate = new Date(horario.data);
        return (
            horarioDate.getDate() === selectedDate.getDate() &&
            horarioDate.getMonth() === selectedDate.getMonth() &&
            horarioDate.getFullYear() === selectedDate.getFullYear()
        );
    });

    return (
        <div style={{ backgroundColor: '#333', color: '#fff', padding: '20px', borderRadius: '8px', minHeight: '100vh' }}>
            <div className="container mt-4" style={{ maxWidth: '100%' }}>
                <h2 className="text-center mb-4" style={{ color: '#FF6600' }}>Registrar Horários Disponíveis</h2>
                <div className="d-flex justify-content-between mb-4 align-items-center">
                    <button className="btn btn-link" onClick={goToPreviousWeek} style={{ color: '#FF6600' }}>
                        <FaArrowLeft />
                    </button>
                    {renderDaysOfWeek()}
                    <button className="btn btn-link" onClick={goToNextWeek} style={{ color: '#FF6600' }}>
                        <FaArrowRight />
                    </button>
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <h4>{selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-dark" style={{ marginBottom: '20px' }}>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Hora Início</th>
                                <th>Hora Fim</th>
                            </tr>
                        </thead>
                        <tbody>
                            {horariosFiltrados.length > 0 ? (
                                horariosFiltrados.map((horario, index) => (
                                    <tr key={index}>
                                        <td>{new Date(horario.data).toLocaleDateString()}</td>
                                        <td>{horario.horaInicio}</td>
                                        <td>{horario.horaFim}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">Nenhum horário disponível...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <AdicionarHorarioModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    adicionarHorario={adicionarHorario}
                    barbeiro={barbeiro}
                    selectedDate={selectedDate}
                    fetchHorariosDisponiveis={fetchHorariosDisponiveis}
                />

                <Opcoes
                    showOptionsModal={showOptionsModal}
                    setShowOptionsModal={setShowOptionsModal}
                    handleOptionSelect={handleOptionSelect}
                />
            </div>
        </div>
    );
}

FormularioAgendamentoBarbeiro.propTypes = {
    adicionarHorario: PropTypes.func.isRequired,
    barbeiro: PropTypes.shape({
        barbeiroId: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
    }).isRequired,
};

export default FormularioAgendamentoBarbeiro;
