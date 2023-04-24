import {
    Card,
    CardHeader,
    CardBody,
    CardTitle
  } from "reactstrap"
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Container from 'react-bootstrap/Container';
  import ModalRegisterClient from "../components/modal/ModalRegisterClient";
  import SpinnerComponent from "../@core/components/spinner/Fallback-spinner";
  import { useEffect, useState } from "react";
  import axios from "axios";
import TableTemplates from "./table/TableTemplates";
import ModalRegisterTemplate from "../components/modal/ModalRegisterTemplate";
  const url = process.env.REACT_APP_URL_BACKEND_AWS
  // import DataTableWithButtons from "./table/TableData"
  const token = localStorage.getItem("token");
  
  const Template = () => {
      const [dataRetrieve, setDataRetrieve] = useState(undefined);
      const [perPage,setPerPage]=useState(100)
      const [search,setSearch] = useState('')
      // console.log("🚀 ~ file: Home.js:21 ~ Home ~ search:", search)
    let pages = 50;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
      // console.log("🚀 ~ file: Home.js:27 ~ Home ~ token:", token)
  
      const baseUrl = `${url}template?all=false&inputSearch=${search}`;
  
  
  const getTemplate= () => {
    setDataRetrieve(undefined);
    axios.get(`${baseUrl}`,config).then((response) => {
      setDataRetrieve(response.data);
    });
  }
  
  
  useEffect(() => {
   getTemplate()
    }, [search]);
  
      if (undefined === dataRetrieve) {
      return <SpinnerComponent />;
    }
  
    const retrieveFilter = (value) => {
      setSearch(value)
    }
    return (
      <div>
        <Card>
          <CardHeader>
          <Container className="justify-content-around">
            <Row className="justify-content-around">
              <Col md={4} sm={6} > <CardTitle>Lista de Plantillas</CardTitle></Col>
              <Col md={{ span: 4, offset: 4 }} sm={6}  className="d-flex justify-content-end"><ModalRegisterTemplate  getTemplate={getTemplate} /> </Col>
            </Row>    
          </Container>
          <TableTemplates  dataRetrieve={dataRetrieve}  retrieveFilter={retrieveFilter} getTemplate={getTemplate}/>
  
  
          </CardHeader>
        </Card>
      </div>
    )
  }
  
  export default Template
  