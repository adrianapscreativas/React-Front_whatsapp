
import {
    Form,
    Label,
    Input,
    Button,
    Spinner
  } from "reactstrap"
   import Swal from "sweetalert2";
import { useState } from "react";
import { useForm, useController } from "react-hook-form";
import axios from "axios";


let baseURL = `${process.env.REACT_APP_URL_BACKEND_AWS}client`

const FormRegisterClient =  (props) => {
  const [loading, setLoading] = useState(false);

  const {onChangeValue,getUser} = props
    const { handleSubmit, control, formState } = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
          name:"",
          cellphone:"",  
          email: "",
          address:"",
          saldo:""  
        },
      });
      const { errors } = formState;

const onSubmit = async (value) => {
  setLoading(true);

let token = localStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` },
};
axios
.post(baseURL, { name:value.name, address: value.address,cellphone: value.cellphone,email: value.email,saldo: value.saldo},config,
  )
.then((response) => {
  setLoading(false);
  Swal.fire({
    icon: "success",
    title: "Registro exitoso",
    text: "Inversion Agregada",
  });
  onChangeValue(false);
  reset()
  getUser()

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


      return (
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
        placeholder="nombre"
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
        placeholder="correo@live.com"
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
    </Button>
    </Form>
    
)
}

export default FormRegisterClient;