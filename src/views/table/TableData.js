/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState } from "react";
import {
  Badge, Button,Label,CardHeader,CardTitle

} from "reactstrap";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import { useTranslation } from "react-i18next";
import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import {
  Card,
  Input,
  Row,
  Col,
} from "reactstrap";
import moment from "moment";

const Data = (props) => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [pagePeer, setPagePeer] = useState(10);
  const [initalDate, setInitialDate] = useState(undefined);
  
  const [searchInpu,setSearchInput] = useState(undefined)
  const [endDate, setEndDate] = useState(undefined);
  const { dataRetrieve ,getDataGlobal} = props;

  const nameCliente = "Nuevo Cliente"


  const onInitDateChange = (value) => {
    setInitialDate(value.target.value);
  };
  const onEndDateChange = (value) => {
    setEndDate(value.target.value);
  };

  const onChangeInput = (value) => {
    setSearchInput(value.target.value)
  }

  console.log("🚀 ~ file: TableData.js:33 ~ Data ~ searchInpu:", searchInpu)

  console.log("🚀 ~ file: TableData.js:31 ~ Data ~ setInitialDate:", initalDate)

  console.log("🚀 ~ file: TableData.js:32 ~ Data ~ setEndDate:", endDate)

  const searchGlobal = () => {
      let date = {
        init: initalDate ??'',
        end: endDate ?? '',
        searchValue: searchInpu  ?? ''
      };
      props.getDataGlobal(date); //fecha
    }


  console.log("el exam", typeof example);
  // ** Hooks

  const { t } = useTranslation();

  const handlePerPage = (e) => {
    const value = e.target.value;
    setPagePeer(value);
  };
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };
  const multiLingColumns = [
    {
      name: "ID",
      sortable: true,
      minWidth: "100px",

      selector: (row) => row.Id,
    },
    {
      name: "Mensaje",
      sortable: true,
      minWidth: "150px",

      selector: (row) => row.Mensaje
        
    },
    {
      name: "Destinatarios",
      sortable: true,
      minWidth: "150px",

      selector: (row) => row.Destinatarios
        
    },
    {
      name: "Enviados",
      sortable: true,
      minWidth: "150px",
      maxWidth: "250px",
      selector: (row) => row.Enviados
      
    },
    {
      name: "Fecha",
      sortable: true,
      minWidth: "150px",
      maxWidth: "250px",
      selector: (row) => moment(row.Fecha).format('YYYY-MM-DD h:mm:ss a')
      
    },
    

    // {
    //   name: "Resultado",
    //   sortable: true,
    //   minWidth: "150px",

    //   selector: (row) => (
    //     <Badge
    //       color={
    //         row.Resultado === "Ganada"
    //           ? "success"
    //           : row.Resultado === "Retirada"
    //           ? "warning"
    //           : row.Resultado === "Perdida"
    //           ? "danger"
    //           : "primary"
    //       }
    //     >
    //       {row.Resultado}
    //     </Badge>
    //   ),
    // },
    // {
    //   name: "Ganancia/Perdida",
    //   sortable: true,
    //   minWidth: "150px",

    //   selector: (row) =>
    //     `$${Number(row.Amount)
    //       .toFixed(2)
    //       .toString()
    //       .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`,
    // },
    // {
    //   name: "Utilidad (%)",
    //   sortable: true,

    //   selector: (row) =>
    //     `${Number(row.Utility)
    //       .toFixed(2)
    //       .toString()
    //       .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}%`,
    // },
  ];
  
  let data2;
if(undefined === dataRetrieve && 204 === dataRetrieve.status ){
  return {
    Id:   0,
    Mensaje:  0,
    Destinatarios:  0,
    Enviados:0
    // Deporte:  0,
    // Resultado:  0,
    // Amount:  0,
    // Utility:  0,
  };
}else{
   data2 = dataRetrieve.data &&  dataRetrieve.data.data && dataRetrieve.data.data.rows.map((item) => {
    return {
      Id: item.id ?? 0,
      Mensaje: item.message ?? 0,
      Destinatarios: item.to ?? 0,
      Enviados: 1,
      Fecha:item.createdAt
      // Monto: item.image ?? 0,
      // Deporte: item.image ?? 0,
      // Resultado: item.pdf ?? 0,
      // Amount: item.token ?? 0,
      // Utility: item.user_id ?? 0,
    };
  });
}

let  numMessage= 0;
  if(  dataRetrieve.data &&  dataRetrieve.data.data ){
      numMessage = dataRetrieve.data.data.count
  } 
  const data = data2;
  // ** Function to handle pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Function to handle filter
  // const handleFilter = (e) => {
  //   const value = e.target.value;
  //   let updatedData = [];
  //   setSearchValue(value);
  //   // if (value.length) {
  //   //   updatedData = data.filter((item) => {
  //   //     console.log("item", item.Resultado);
  //   //     const startsWith = item.Resultado.toLowerCase().startsWith(
  //   //       value.toLowerCase()
  //   //     );
  //   //     // item.Fecha.toLowerCase().startsWith(value.toLowerCase()) ;
  //   //     // item.average_stake.toLowerCase().startsWith(value.toLowerCase()) ||
  //   //     // item.bet.toLowerCase().startsWith(value.toLowerCase()) ||
  //   //     // item.result.toLowerCase().startsWith(value.toLowerCase()) ||
  //   //     // item.amount.toLowerCase().startsWith(value.toLowerCase()) ||
  //   //     // item.utility_porcentage.toLowerCase().startsWith(value.toLowerCase());

  //   //     const includes = item.Resultado.toLowerCase().startsWith(
  //   //       value.toLowerCase()
  //   //     );
  //   //     // item.average_stake.toLowerCase().startsWith(value.toLowerCase()) ||
  //   //     // item.bet.toLowerCase().startsWith(value.toLowerCase()) ||
  //   //     // item.result.toLowerCase().startsWith(value.toLowerCase()) ||
  //   //     // item.amount.toLowerCase().startsWith(value.toLowerCase()) ||
  //   //     // item.utility_porcentage.toLowerCase().startsWith(value.toLowerCase());

  //   //     if (startsWith) {
  //   //       return startsWith;
  //   //     } else if (!startsWith && includes) {
  //   //       return includes;
  //   //     } else return null;
  //   //   });
  //   //   setFilteredData(updatedData);
  //   //   setSearchValue(value);
  //   // }
  // };

  return (
    <Card className="shadow  w-100  ">
     
      <CardHeader className="border-bottom ">
        
          <Col md="6">
        <CardTitle   tag="h4">Cliente:  {nameCliente}</CardTitle>
        </Col>
        <Col md="3" className="bs-light-border-subtle offset-md-3">
        <CardTitle   tag="h4" className="align-self-end" >Mensajes Enviados:  {numMessage}</CardTitle>
        </Col>
      </CardHeader>


      <Row className="justify-content-end mx-0 mt-1">
      <Col
          md="6"
          sm="12"
          className="d-flex align-items-center justify-content-center mt-1"
        >
            <Label className="me-1" for="search-input-1">
            {t("Filtro")}
          </Label> 
           <Input 
            className="dataTable-filter mb-50"
            type="text"
            bsSize="sm"
            id="search-input-1"
            onChange={onChangeInput}
          />
        </Col>
        <Col
          md="2"
          sm="12"
          className="d-flex align-items-center justify-content-center mt-1"
        >
           <Label className="me-1" for="search-input-1">
            {t("Fecha Inicio")}
          </Label> 
          <Input 
          id="datepicker"
          type="date"
          onChange={onInitDateChange}
          />
        </Col>
        <Col
          md="2"
          sm="12"
          className="d-flex align-items-center justify-content-center mt-1"
        >
           <Label className="me-1" for="search-input-1">
            {t("Fecha Final")}
          </Label> 
           <Input 
          id="datepicker"
          type="date"
          onChange={onEndDateChange}


          />
          {/* <Badge
            color={example > 0 ? "light-success" : "light-danger"}
            // className="me-2  fs-4 col-sm-12 text-center"
            className="text-success me-2  fs-4 text-center"
            for="search-input-1"
          >
            {example > 0
              ? `Ganancia:$
                    ${Number(example)
                      .toFixed(2)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
              : `Perdida:$
              ${Number(example)
                .toFixed(2)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`}
          </Badge> */}
        </Col>
        <Col
          className="d-flex align-items-center justify-content-end mt-1"
          md="2"
          sm="12"
        >
          <Button
          onClick={searchGlobal}
          >
            Buscar
          </Button>
        
          {/* <Input
            className="w-auto dataTable-filter mb-50"
            type="select"
            // value={statusValue}
            onChange={handleFilter}
          >
            <option value="">Selecccione su estatus</option>
            <option value="Ganada">Ganada</option>
            <option value="Perdida">Perdida</option>
            <option value="Retirada">Retirada</option>
            <option value="Pendiente">Pendiente</option>
          </Input> */}
        </Col>
      </Row>
      <Col className="react-dataTable ">
        <DataTable
          // noHeader
          pagination
          // selectableRowsNoSelectAll
          columns={multiLingColumns}
          paginationComponentOptions={paginationComponentOptions}
          // noHeader
          className="react-dataTable"
          // paginationPerPage={pagePeer}
          // sortIcon={<ChevronDown size={50} />}
          // paginationDefaultPage={currentPage + 1}
          // paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
        />
      </Col>
      {/* <CardFooter>
        <CardText className="mb-0">
          <span className="fw-bold">Note:</span>{" "}
          <span>Use Intl Dropdown in Navbar to change table language</span>
        </CardText>
      </CardFooter> */}
    </Card>
  );
};

export default Data;
