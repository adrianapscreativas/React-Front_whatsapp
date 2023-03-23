import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    Form,
    Label,
    Input,
    Spinner,
    Col, Row
  } from "reactstrap"
  import Swal from "sweetalert2";

  import axios from "axios";
  import { Edit } from "react-feather"
import { useForm, useController } from "react-hook-form";

const baseURL = process.env.REACT_APP_URL_BACKEND_AWS
const ModalUpdateClient =(props) => {
  const [loading, setLoading] = useState(false);

  const {giveData,getUser} = props
    // console.log("🚀 ~ ModalUpdateClient ~ props:", giveData);

  const { handleSubmit, control, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: giveData.Nombre || "",
      cellphone:giveData.Telefono || "",  
      email: giveData.Correo || "",
      address: giveData.Direccion || "",
      saldo: giveData.Saldo || ""  
    },
  });
  const { errors } = formState;




    const [show, setShow] = useState(false);

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



axios.put(`${baseURL}user-update/${giveData.ID}`, { name:value.name, address: value.address,cellphone: value.cellphone,email: value.email,saldo: value.saldo},config,
  )
.then((response) => {
  setLoading(false);
  Swal.fire({
    icon: "success",
    title: "Registro exitoso",
    text: "Inversion Agregada",
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
      field: { ref: nameRef, ...nameField },
    } = useController({
      name: "name",
      control,
      rules: {
        required: {
          value: true,
          message: "El nombre es requerido",
        },
 
      },
    });

    const {
      field: { ref: cellphoneRef, ...cellphoneField },
    } = useController({
      name: "cellphone",
      control,
      rules: {
        required: {
          value: true,
          message: "El teléfono es requerido",
        },
        minLength: {
          value: 10,
          message: "El teléfono debe tener mínimo 10 caracteres",
        },
        maxLength: {
          value: 10,
          message: "El teléfono debe tener máximo minimo 10 caracteres",
        },
 
      },
    });
    const {
      field: { ref: emailRef, ...emailField },
    } = useController({
      name: "email",
      control,
      rules: {
        required: {
          value: true,
          message: "El Correo es requerido",
        },
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Coloque un correo valido",
        },
      },
    });

    const {
      field: { ref: addressRef, ...addressField },
    } = useController({
      name: "address",
      control,
      rules: {
        required: {
          value: true,
          message: "La dirección es requerida",
        },
 
      },
    });


    const {
      field: { ref: saldoRef, ...saldoField },
    } = useController({
      name: "saldo",
      control,
      rules: {
        required: {
          value: true,
          message: "El saldo es requerido",
        },
 
      },
    });

    
    return (<> 
     <Button variant="info" color="info" className="me-1 bg-info " onClick={handleShow}>
     <Edit size={18} />
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header >
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <FormRegisterClient onChangeValue={onChangeValue}  getUser={getUser} /> */}
        <Form
    className="auth-login-form mt-2"
     onSubmit={handleSubmit(onSubmit)}
  >
       <div className="mb-1">
      <Label className="form-label" for="name">
        <h6>Nombre</h6>
      </Label>
      <Input
        type="text"
        id="name"
        placeholder='Nombre'
        autoFocus
        ref={nameRef}
        {...nameField}
      />

      {errors.name && (
        <p className="text-danger">{errors.name.message} </p>
      )}
    </div>
    <div className="mb-1">
      <Label className="form-label " for="cellphone" >
        <h6>Teléfono</h6> 
      </Label>
      <Input
        type="number"
        id="cellphone"
        placeholder="telefono"
        autoFocus
        ref={cellphoneRef}
        {...cellphoneField}
      />

      {errors.cellphone && (
        <p className="text-danger">{errors.cellphone.message} </p>
      )}
    </div>
    <div className="mb-1">
      <Label className="form-label" for="login-email">
        <h6>Correo</h6>
      </Label>
      <Input
        type="text"
        id="login-email"
        value="correo@live.com"
        autoFocus
        ref={emailRef}
        {...emailField}
      />

      {errors.email && (
        <p className="text-danger">{errors.email.message} </p>
      )}
    </div>
    <div className="mb-1">
      <Label className="form-label" for="address">
        <h6>Dirección</h6>
      </Label>
      <Input
        type="text"
        id="address"
        placeholder="dirección"
        autoFocus
        ref={addressRef}
        {...addressField}
      />

      {errors.address && (
        <p className="text-danger">{errors.address.message} </p>
      )}
    </div>
    <div className="mb-1">
      <Label className="form-label" for="saldo">
        <h6>Saldo</h6>
      </Label>
      <Input
        type="text"
        id="saldo"
        placeholder="saldo"
        autoFocus
        ref={saldoRef}
        {...saldoField}
      />

      {errors.saldo && (
        <p className="text-danger">{errors.saldo.message} </p>
      )}
    </div>
    <Button
      color="primary"
      className='w-100'
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
                  "Registrar"
                )}{" "}
        Actualizar
    </Button>
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Row className='row w-100 p-0 m-0 mb-1'>
          <Col sm={12} lg={12} xl={12} xxl={12} className="p-0 m-0">
          <Button   className='w-100' variant="danger" onClick={handleClose}>
          Cerrar
        </Button>
          </Col>
        </Row>
   
      </Modal.Footer>
    </Modal>
  </>
    )
}

export default ModalUpdateClient;