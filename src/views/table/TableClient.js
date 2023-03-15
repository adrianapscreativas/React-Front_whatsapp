/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState } from "react";

import { Mail,Edit,Key } from "react-feather"

// ** Table Columns
// import { data, multiLingColumns } from "./data";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import { useTranslation } from "react-i18next";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom"

// ** Reactstrap Imports
import {
  Badge,
  Card,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Button } from "react-bootstrap";

const TableClient = (props) => {
  const navigate = useNavigate();

  // ** State
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [pagePeer, setPagePeer] = useState(10);
  const [searchData,setSearchData] = useState('')
  const { dataRetrieve } = props;
  // console.log("🚀 ~ file: TableData.js:42 ~ Data ~ dataRetrieve:", dataRetrieve)



  // console.log("el exam", typeof example);
  // ** Hooks

  const { t } = useTranslation();

  const nextPage = (idUser,nameUser) => {
    navigate("/second-page",{state:{id:idUser,name:nameUser}});
  }


  const onChangeDataValue = (e) => {
    setSearchData(e.target.value)
  }

  const searchGlobal = () => {
   
    props.retrieveFilter(searchData); //fecha
  }
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
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
      minWidth: "120px",
      maxWidth: "50px",
      selector: (row) => row.ID,
    },
    {
      name: "Nombre",
      sortable: true,
      minWidth: "140px",
      maxWidth: "80px",
      selector: (row) => row.Nombre
         
    },
    {
      name: "Teléfono",
      sortable: true,
      minWidth: "120px",
      maxWidth: "90px",
      selector: (row) => row.Telefono
         
    },
    {
      name: "Correo",
      sortable: true,
      minWidth: "190px",
      maxWidth: "90px",
      selector: (row) => row.Correo
    },
    {
      name: "Dirreción",
      sortable: true,
      minWidth: "360px",
      maxWidth: "90px",
      selector: (row) => ( row.Direccion
      ),
    },
    {
      name: "Saldo",
      sortable: true,
      minWidth: "100px",
      maxWidth: "50px",
      selector: (row) => ( row.Saldo
      ),
    },
    {
      name: "Estatus",
      sortable: true,
      minWidth: "100px",
      maxWidth: "50px",
      selector: (row) => (
        <Badge
          color={
            row.Estatus === "active"
              ? "success"
              : row.Estatus === "disable"
              ? "danger"
              : "primary"
          }
        >
          {row.Estatus}
        </Badge>
      ),
    },
    {
      name: "Acciones",
      sortable: true,
      minWidth: "150px",

      selector: (row) => <div>
        <Button color="info" className="me-1 bg-info " >
        <Edit size={18} />

        </Button>

        <Button className="me-1"  onClick={()=>nextPage(row.ID,row.Nombre)}  >
        <Mail size={18} />
        </Button >
        <Button  color="secondary" className="me-1 bg-secondary">
        <Key size={18} />

        </Button>
        
      </div>
    },
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
  const data2 = dataRetrieve.data.rows.map((item) => {
    return {
      ID: item.id ?? 0,
      Nombre: item.name ?? 0,
      Telefono: item.cellphone ?? 0,
      Correo: item.email ?? 0,
      Direccion: item.address ?? 0,
      Saldo: item.saldo ?? 0,
      Estatus: item.status ?? 0,
      // Amount: item.token ?? 0,
      // Utility: item.user_id ?? 0,
    };
  });

  const data = data2;
  // ** Function to handle pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);


    if (value.length) {
      updatedData = data.filter((item) => {
        console.log("item", item.Estatus);
        const startsWith = item.Estatus.toLowerCase().startsWith(
          value.toLowerCase()
        );
      

        const includes = item.Estatus.toLowerCase().startsWith(
          value.toLowerCase()
        );

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // // ** Pagination Previous Component
  // const Previous = () => {
  //   return (
  //     <Fragment>
  //       <span className="align-middle d-none d-md-inline-block">
  //         {t("Prev")}
  //       </span>
  //     </Fragment>
  //   );
  // };

  // // ** Pagination Next Component
  // const Next = () => {
  //   return (
  //     <Fragment>
  //       <span className="align-middle d-none d-md-inline-block">
  //         {t("Next")}
  //       </span>
  //     </Fragment>
  //   );
  // };

  // ** Custom Pagination Component
  // const CustomPagination = () => (
  //   <ReactPaginate
  //     previousLabel={<Previous size={15} />}
  //     nextLabel={<Next size={15} />}
  //     forcePage={currentPage}
  //     onPageChange={(page) => handlePagination(page)}
  //     pageCount={
  //       searchValue.length
  //         ? Math.ceil(filteredData.length / pagePeer)
  //         : Math.ceil(data.length / pagePeer) || 1
  //     }
  //     breakLabel={"..."}
  //     pageRangeDisplayed={2}
  //     marginPagesDisplayed={2}
  //     activeClassName={"active"}
  //     pageClassName={"page-item"}
  //     nextLinkClassName={"page-link"}
  //     nextClassName={"page-item next"}
  //     previousClassName={"page-item prev"}
  //     previousLinkClassName={"page-link"}
  //     pageLinkClassName={"page-link"}
  //     breakClassName="page-item"
  //     breakLinkClassName="page-link"
  //     containerClassName={
  //       "pagination react-paginate pagination-sm justify-content-end pe-1 mt-1"
  //     }
  //   />
  // );

  return (
    <Card className="shadow  w-100  ">
      {/* <CardHeader className="border-bottom">
        <CardTitle tag="h4">Total</CardTitle>
      </CardHeader> */}
      <Row className="justify-content-end mx-0">
        <Col
          md="4"
          sm="12"
          className="d-flex align-items-center justify-content-center mt-1"
        >
         <Label className="me-1" for="search-input-1">
            {t("Filtrar")}
          </Label>
          <Input
            className="dataTable-filter mb-50 me-2"
            type="text"
            bsSize="sm"
            id="search-input-1"
            onChange={onChangeDataValue}
          />
              <Button
          onClick={searchGlobal}
          > Buscar</Button>
        </Col>
        <Col
          md="4"
          sm="12"
          className="d-flex align-items-center justify-content-center mt-1"
        >
        
        </Col>
        <Col
          className="d-flex align-items-center justify-content-end mt-1"
          md="4"
          sm="12"
        >
          
          <Input
            className="w-auto dataTable-filter mb-50"
            type="select"
            // value={statusValue}
            onChange={handleFilter}
          >
            <option value="">Selecccione su estatus</option>
            <option value="active">Activo</option>
            <option value="disable">Desactivado</option>
          </Input>
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

export default TableClient;


