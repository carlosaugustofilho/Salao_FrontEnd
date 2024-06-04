import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ModalAvisoAgendamento = ({ show, handleClose }) => (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#333', color: '#ccc' }}>
            <Modal.Title>
                <span role="img" aria-label="sad face" style={{ marginRight: '10px' }}>😢</span>
                Horário Indisponível
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#444', color: '#ccc' }}>
            <p>
                O horário selecionado está indisponível. Por favor, escolha outro horário.
            </p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#333' }}>
            <Button variant="outline-light" onClick={handleClose}>
                Fechar
            </Button>
        </Modal.Footer>
    </Modal>
);

ModalAvisoAgendamento.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default ModalAvisoAgendamento;
