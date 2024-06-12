import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Opcoes = ({ showOptionsModal, setShowOptionsModal, handleOptionSelect }) => {
    return (
        <Modal show={showOptionsModal} onHide={() => setShowOptionsModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Opções</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>O que você deseja fazer?</p>
                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => handleOptionSelect('view')} style={{ backgroundColor: '#FF6600', border: 'none', marginRight: '10px' }}>Visualizar Horários</Button>
                    <Button variant="secondary" onClick={() => handleOptionSelect('add')} style={{ backgroundColor: '#FF6600', border: 'none' }}>Adicionar Horário</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

Opcoes.propTypes = {
    showOptionsModal: PropTypes.bool.isRequired,
    setShowOptionsModal: PropTypes.func.isRequired,
    handleOptionSelect: PropTypes.func.isRequired,
};

export default Opcoes;
