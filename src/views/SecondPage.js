import axios from "axios";
import { useEffect, useState } from "react";
import {
  Col,
  Row,
} from "reactstrap";

import { useLocation } from 'react-router-dom';

import SpinnerComponent from "../@core/components/spinner/Fallback-spinner";
import Data from "./table/TableData";


const SecondPage = () => {
  const {state:{id}} = useLocation();
  
  console.log("🚀 ~ file: SecondPage.js:16 ~ SecondPage ~ id:", id)
  const [dataRetrieve, setDataRetrieve] = useState(undefined);
  const [initDate,setInitDate] = useState('');
  const [endDate,setEndDate] = useState('');
 const [search, setSearch] = useState('')


  // const month = new Date().getMonth() + 1;
  // const year = new Date().getFullYear();

  const token = localStorage.getItem("token");
  let pages = 50;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const baseUrl = `https://zawszacdg2.execute-api.us-east-2.amazonaws.com/dev/api/v1/message?user_id=${id}&initalDate=${initDate}&endDate=${endDate}&&inputSearch=${search}`;
  // const baseUrl = `https://zawszacdg2.execute-api.us-east-2.amazonaws.com/dev/api/v1/message?user_id=${id}`;

  useEffect(() => {
     axios.get(`${baseUrl}`,config).then((response) => {
      setDataRetrieve(response);
    console.log("🚀 ~ file: SecondPage.js:34 ~ axios.get ~ response:", response)
    });
  }, [search, initDate, endDate]);

 console.log("esto trae", dataRetrieve);

 const getDataGlobal = (date) => {
  console.log("🚀 ~ file: SecondPage.js:46 ~ getDate ~ date:", date)
  setInitDate(date.init);
  setEndDate(date.end);
  setSearch(date.searchValue)

};

const searchValue = (value) => {
  console.log("🚀 ~ file: SecondPage.js:52 ~ searchValue ~ value:", value)
}

  if (undefined === dataRetrieve) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <Col>
        <Col className="w-50 ">
        </Col>
      </Col>
      <Row className="d-flex align-items-center  justify-content-center">
        <Col className="d-flex align-items-center justify-content-center">
          {/* <InvoiceList dataRetrieve={dataRetrieve} /> */}
          {/* <TableResult dataRetrieve={dataRetrieve} /> */}
        </Col>
        <Data dataRetrieve={dataRetrieve} getDataGlobal={getDataGlobal} />

      </Row>
    </>
  );
};

export default SecondPage;
