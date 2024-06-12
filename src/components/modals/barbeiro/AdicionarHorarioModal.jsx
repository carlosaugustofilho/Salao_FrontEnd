import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AdicionarHorarioModal = ({ show, handleClose, adicionarHorario, barbeiro, selectedDate, fetchHorariosDisponiveis }) => {
    const [data, setData] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');

    useEffect(() => {
        setData(selectedDate.toISOString().split('T')[0]);
    }, [selectedDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (barbeiro && barbeiro.barbeiroId && data && horaInicio && horaFim) {
            const horario = {
                barbeiroId: barbeiro.barbeiroId,
                data: new Date(data + 'T00:00:00').toISOString(),
                horaInicio: `${horaInicio}:00`,
                horaFim: `${horaFim}:00`
            };
            adicionarHorario(horario);
            setData('');
            setHoraInicio('');
            setHoraFim('');
            handleClose(); 
            fetchHorariosDisponiveis(selectedDate); 
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Horário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {barbeiro && <label htmlFor="barbeiroNome">Barbeiro: {barbeiro.nome}</label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="data">
                            Data <FaCalendarAlt />
                        </label>
                        <input
                            type="date"
                            id="data"
                            className="form-control"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="horaInicio">
                            Hora Início <FaClock />
                        </label>
                        <input
                            type="time"
                            id="horaInicio"
                            className="form-control"
                            value={horaInicio}
                            onChange={(e) => setHoraInicio(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="horaFim">
                            Hora Fim <FaClock />
                        </label>
                        <input
                            type="time"
                            id="horaFim"
                            className="form-control"
                            value={horaFim}
                            onChange={(e) => setHoraFim(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 w-100" style={{ backgroundColor: '#FF6600', border: 'none' }}>Adicionar Horário</button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

AdicionarHorarioModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    adicionarHorario: PropTypes.func.isRequired,
    barbeiro: PropTypes.shape({
        barbeiroId: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
    }).isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    fetchHorariosDisponiveis: PropTypes.func.isRequired,
};

export default AdicionarHorarioModal;
