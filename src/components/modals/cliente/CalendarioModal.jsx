import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);

const CalendarioModal = ({ show, handleClose, onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
        handleClose();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName="custom-modal"
            style={{ maxWidth: '400px', margin: 'auto' }}
        >
            <Modal.Header
                closeButton
                style={{ borderBottom: 'none', display: 'flex', justifyContent: 'center' }}
            >
                <Modal.Title style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Selecione uma data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: '20px',
                }}
            >
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    inline
                    locale="pt-BR"
                    calendarClassName="custom-calendar"
                />
            </Modal.Body>
        </Modal>
    );
};

CalendarioModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onDateSelect: PropTypes.func.isRequired,
};

export default CalendarioModal;
