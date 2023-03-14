import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'reactstrap';
import FormRegisterClient from '../form/FormRegisterClient';

const ModalRegisterClient =(props) => {

  const {getUser} = props
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


   const onChangeValue = (value) => {
      console.log("🚀 ~ file: ModalRegisterClient.js:43 ~ ModalRegisterClient ~ value:", value)
      handleClose(value)
    }

    return (<> 
     <Button variant="primary" onClick={handleShow}>
        Nuevo Registro    
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header >
        <Modal.Title>Registrar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormRegisterClient onChangeValue={onChangeValue}  getUser={getUser} />
      </Modal.Body>
      <Modal.Footer>
        <Row className='row w-100 p-0 m-0 mb-1'>
          <Col sm={12} lg={12} xl={12} xxl={12} className="p-0 m-0">
          <Button   className='w-100  ' variant="danger" onClick={handleClose}>
          Cerrar
        </Button>
          </Col>
        </Row>
   
      </Modal.Footer>
    </Modal>
  </>
    )
}

export default ModalRegisterClient;