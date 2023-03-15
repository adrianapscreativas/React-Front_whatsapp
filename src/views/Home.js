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
import TableClient from "./table/TableClient";
import SpinnerComponent from "../@core/components/spinner/Fallback-spinner";
import { useEffect, useState } from "react";
import axios from "axios";

// import DataTableWithButtons from "./table/TableData"
const token = localStorage.getItem("token");

const Home = () => {
    const [dataRetrieve, setDataRetrieve] = useState(undefined);
    const [perPage,setPerPage]=useState(100)
    const [search,setSearch] = useState('')
    console.log("🚀 ~ file: Home.js:21 ~ Home ~ search:", search)
  let pages = 50;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
    console.log("🚀 ~ file: Home.js:27 ~ Home ~ token:", token)

    const baseUrl = `https://zawszacdg2.execute-api.us-east-2.amazonaws.com/dev/api/v1/user?inputSearch=${search}&per_page=${perPage}`;

const getUser= () => {
  axios.get(`${baseUrl}`,config).then((response) => {
    setDataRetrieve(response.data);
  });
}

useEffect(() => {
 getUser()
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
        <Container>
          <Row>
            <Col md={4}> <CardTitle>Lista de Clientes</CardTitle></Col>
            <Col md={{ span: 4, offset: 4 }}  className="d-flex justify-content-end"><ModalRegisterClient  getUser={getUser} /> </Col>
          </Row>    
        </Container>
        <TableClient dataRetrieve={dataRetrieve}  retrieveFilter={retrieveFilter}/>


        </CardHeader>
      </Card>
    </div>
  )
}

export default Home
