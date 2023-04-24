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

const ModalUpdateTemplate =(props) => {
  const [loading, setLoading] = useState(false);

  const {giveData,getTemplate} = props
  // console.log("🚀 ~ ModalUpdateTemplate ~ giveData:", giveData);

  const { handleSubmit, control, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name:  giveData.Nombre ?? "",
      description:giveData.Descripcion ?? "",  
      parameters:giveData.Parametros ?? "",
      body: giveData.Contenido ?? "",
      type: giveData.Tipo ?? ""  
    },
  });
  const { errors } = formState;




    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   const onChangeValue = (value) => {
      // console.log("🚀 ~ file: ModalRegisterClient.js:43 ~ ModalRegisterClient ~ value:", value)
      handleClose(value)
    }
     
    const onSubmit = async (value) => {
      setLoading(true);
      

      let token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };



axios.put(`${baseURL}template/${giveData.ID}`, { name:value.name,description: value.description,parameters: value.parameters,body: value.body,type: value.type},config,
  )
.then((response) => {
  setLoading(false);
  Swal.fire({
    icon: "success",
    title: "Actualización Exitosa",
  });
  onChangeValue(false);
  getTemplate()
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
      field: { ref: descriptionRef, ...descriptionField },
    } = useController({
      name: "description",
      control,
      rules: {
        required: {
          value: true,
          message: "La descripción es requerida",
        }
 
      },
    });
    const {
      field: { ref: parametersRef, ...parametersField },
    } = useController({
      name: "parameters",
      control,
      rules: {
        required: {
          value: true,
          message: "Los parametros son requeridos",
        }
      },
    });

    const {
      field: { ref: bodyRef, ...bodyField },
    } = useController({
      name: "body",
      control,
      rules: {
        required: {
          value: true,
          message: "El cuerpo es requerido",
        },
 
      },
    });


    const {
      field: { ref: typeRef, ...typeField },
    } = useController({
      name: "type",
      control,
      rules: {
        required: {
          value: true,
          message: "El tipo es requerido",
        },
 
      },
    });

    
    return (<> 
     <Button variant="primary" color="primary" className="me-1 bg-info " onClick={handleShow}>
    <Edit  size={18}/>
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header >
        <Modal.Title>Actualizar Plantilla.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <FormRegisterClient onChangeValue={onChangeValue}  getTemplate={getTemplate} /> */}
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
      <Label className="form-label " for="description" >
        <h6>Descripción</h6> 
      </Label>
      <Input
        type="text"
        id="description"
        placeholder="Descripción"
        autoFocus
        ref={descriptionRef}
        {...descriptionField}
      />

      {errors.description && (
        <p className="text-danger">{errors.description.message} </p>
      )}
    </div>
    <div className="mb-1">
      <Label className="form-label" for="login-email">
        <h6>Parametros</h6>
      </Label>
      <Input
        type="number"
        id="login-email"
        placeholder="Numero de paramtros"
        autoFocus
        ref={parametersRef}
        {...parametersField}
      />

      {errors.parameters && (
        <p className="text-danger">{errors.parameters.message} </p>
      )}
    </div>
    <div className="mb-1">
      <Label className="form-label" for="address">
        <h6>Cuerpo de la Plantilla</h6>
      </Label>
      <Input
        type="text"
        id="address"
        placeholder="Ingrese el cuerpo de la plantilla"
        autoFocus
        ref={bodyRef}
        {...bodyField}
      />

      {errors.body && (
        <p className="text-danger">{errors.body .message} </p>
      )}
    </div>
    <div className="mb-1">
      <Label className="form-label" for="saldo">
        <h6>Tipo</h6>
      </Label>
      <Input
        type="text"
        id="saldo"
        placeholder="Ingrese el tipo  Texto o Numero"
        autoFocus
        ref={typeRef}
        {...typeField}
      />

      {errors.type && (
        <p className="text-danger">{errors.type.message} </p>
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
                  "Actualizar"
                )}{" "}
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

export default ModalUpdateTemplate;