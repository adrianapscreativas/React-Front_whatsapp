import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Key } from "react-feather"
import {
    Form,
    Label,
    Input,
    Spinner,
    Col, Row
  } from "reactstrap"
  import Swal from "sweetalert2";

import { useForm, useController } from "react-hook-form";
const baseURL = process.env.REACT_APP_URL_BACKEND_AWS

const ModalKey =(props) => {
  const [loading, setLoading] = useState(false);

  const {giveData,getUser} = props
    const [show, setShow] = useState(false);


    const { handleSubmit, control, formState } = useForm({
      mode: "onSubmit",
      reValidateMode: "onSubmit",
      defaultValues: {
        key: giveData.Key || "",
      },
    });
    const { errors } = formState;


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


   const onChangeValue = (value) => {
      console.log("🚀 ~ file: ModalRegisterClient.js:43 ~ ModalRegisterClient ~ value:", value)
      handleClose(value)
    }

    const onSubmit = async (value) => {
      setLoading(true);
      

      let token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
axios.put(`${baseURL}token-update-client/${giveData.ID}`,{ key:value.key},config,
  )
.then((response) => {
  setLoading(false);
  Swal.fire({
    icon: "success",
    title: "Registro Actualizado",
    text: "Cliente Actualizado",
  });
  onChangeValue(false);
  getUser()
  reset()

})

.catch((error) => {
  setLoading(false);
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.response.data.data,
  });
});
    }
        ///validacion
        const {
          field: { ref: keyRef, ...keyField },
        } = useController({
          name: "key",
          control,
        });

    return (<> 
     <Button variant="secondary" color="info" className="me-1 bg-info " onClick={handleShow}>
     <Key size={18} />   
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
      <Form
    className="auth-login-form mt-2"
    onSubmit={handleSubmit(onSubmit)}
  >
       <div className="mb-1">
      <Label className="form-label" for="name">
        <h6>Key</h6>
      </Label>
      <Input
        type="text"
        id="key"
        autoFocus
         ref={keyRef}
         {...keyField}
         readOnly={true}
      />
    </div>
    <Button
      color="primary"
      className='w-100 mt-0'
      block
      type="submit"
      onClick={() => console.log("click")}
    >
      {loading ? (
                  <Spinner
                    color="white"
                    size="sm"
                    animation="border"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Generar Nuevo Token"
                )}{" "}
      </Button>
    </Form>
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

export default ModalKey;