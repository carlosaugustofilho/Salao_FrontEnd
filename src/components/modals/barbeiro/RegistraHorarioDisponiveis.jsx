import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaClock } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RegistraHorarioDisponiveis = ({ show, handleClose, adicionarHorario, barbeiro, data }) => {
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (barbeiro && data && horaInicio && horaFim) {
            const horario = {
                barbeiroId: parseInt(barbeiro.usuarioId, 10),
                data: new Date(data).toISOString(),
                horaInicio: `${horaInicio}:00`,
                horaFim: `${horaFim}:00`
            };
            adicionarHorario(horario);
            setHoraInicio('');
            setHoraFim('');
            handleClose();
        }
    };

    useEffect(() => {
        setHoraInicio('');
        setHoraFim('');
    }, [show]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Registrar Horário para {data}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="barbeiroNome">Barbeiro</label>
                        <input
                            type="text"
                            id="barbeiroNome"
                            className="form-control"
                            value={barbeiro ? barbeiro.nome : ''}
                            readOnly
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
                    <Button variant="primary" type="submit" className="mt-3 w-100">Adicionar Horário</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

RegistraHorarioDisponiveis.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    adicionarHorario: PropTypes.func.isRequired,
    barbeiro: PropTypes.shape({
        usuarioId: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
    }).isRequired,
    data: PropTypes.string.isRequired,
};

export default RegistraHorarioDisponiveis;
