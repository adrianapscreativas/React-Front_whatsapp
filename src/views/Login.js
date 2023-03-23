import { useSkin } from "@hooks/useSkin"
import { Link, useNavigate } from "react-router-dom"
import InputPasswordToggle from "@components/input-password-toggle"
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  Spinner
} from "reactstrap"
import "@styles/react/pages/page-authentication.scss"
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm, useController } from "react-hook-form";
import logo from '../assets/images/pages/login-v2.svg'
import axios from "axios";
import Redirect from "../utility/redirect/Redirect"
import DecodeToken from "../utility/decode/DecodeToken"
import themeConfig from "@configs/themeConfig"

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const baseURL =  `${process.env.REACT_APP_URL_BACKEND_AWS}login`

  let token;
  let userId;
  const { errors } = formState;

  const onSubmit = async (value) => {
    localStorage.clear();
    setLoading(true);
    axios
      .post(baseURL, { username: value.email, password: value.password })
      .then((response) => {
        token = response.data.data.AuthenticationResult.AccessToken;
        const dataLocalStorage = DecodeToken(token);
        userId = dataLocalStorage.userID;
        console.log("🚀 ~ file: Login.js:54 ~ .then ~ userId:", userId)
        localStorage.setItem("token", token);
        localStorage.setItem("userID", dataLocalStorage.userID);
        localStorage.setItem("role", dataLocalStorage.role);
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        axios
          .get(
            `${process.env.REACT_APP_URL_BACKEND_AWS}user/${userId}`,
            config
          )
          .then((response) => {
            localStorage.setItem("name", response.data.data.name);
            localStorage.setItem("lastname", response.data.data.lastname);
          });

        // console.log("oi hice login", response);
        setLoading(false);

        Redirect(token, navigate);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.data,
        });
      });
  };

  // const navigate = useNavigate();
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
    field: { ref: passwordRef, ...passwordField },
  } = useController({
    name: "password",
    control,
    rules: {
      required: {
        value: true,
        message: "La Contraseña is requerida",
      },
      minLength: {
        value: 8,
        message: "La Contraseña necesita minimo 8 caracteres",
      },
    },
  });

  const { skin } = useSkin();

  const illustration = skin === "dark" ? "background.jpg" : "background.jpg",
    source = require(`@src/assets/images/pages/background.jpg`).default;
  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
       
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={logo} alt="Login Cover" width={'100%'} />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Bienvenido  WhatsPy👋
            </CardTitle>
            <CardText className="mb-2">
            Inicie sesión en su cuenta y comience la aventura.
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Correo
                </Label>
                <Input
                  type="text"
                  id="login-email"
                  placeholder="jo.com"
                  autoFocus
                  ref={emailRef}
                  {...emailField}
                />

                {errors.email && (
                  <p className="text-danger">{errors.email.message} </p>
                )}
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Contraseña
                  </Label>
                  {/* <Link to="/forgot-password">
                    <small>Olvide mi contraseña?</small>
                  </Link> */}
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  ref={passwordRef}
                  {...passwordField}
                />
                {errors?.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
       
              {/* <Button tag={Link} to="/" color="primary" block>
                Iniciar Sesión
              </Button> */}
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
                  "Iniciar Sesión"
                )}{" "}
              </Button>
              </Form>

          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
