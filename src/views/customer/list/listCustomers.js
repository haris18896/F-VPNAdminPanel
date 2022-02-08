/* eslint-disable */
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import React, { useState, useEffect, Fragment, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MAIN_SERVICE_URL } from "../../../constants/consts";
import {
  Card,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Row,
  Col,
  Table,
} from "reactstrap";
import { RESET_PENDING_CUSTOMERS_LIST_STATE } from "../../../redux/actions/actionType/customer";
import {
  handlePendingCustomersFetch,
  handlePendingCustomersFetchNoUpdatesVersion,
} from "../../../redux/actions/customer/fetch/pending";
import { handlePageChange } from "../../../redux/actions/customer/pending/select/onPageChange";
import { handleSelectChange } from "../../../redux/actions/customer/pending/select/onLimitChange";

const ComponentSpinner = () => {
  return (
    <div
      className="fallback-spinner"
      style={{ marginTop: "600px", backgroundColor: "#FFC10B" }}
    >
      <div className="loading component-loader">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

const ListPendingCustomers = () => {
  const initialState = {
    url: `${MAIN_SERVICE_URL}/vpn/admin/listAdmins`,
    searchKeyword: "",
  };

  const [state, setState] = useState(initialState);
  const [searchString, setSearchString] = useState("");

  // DISPATCH
  const dispatch = useDispatch();

  // EXTRACTING STUFF FROM REDUX GLOBAL STATE
  // const {} = useSelector(state => state.customer)

  const { inProcess, page, limit, totalPages, customersListData } = useSelector(
    (state) => state.pendingCustomer
  );

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = (page) => {
    dispatch(handlePageChange(page, limit));
  };

  // ** CUSTOM PAGINATION COMPONENT
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={totalPages || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={page !== 0 ? page - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
        }
      />
    );
  };

  // ** onChangeHandler FOR KEY WORD SEARCH INPUT
  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // ** UPDATE SEARCH STRING WHENEVEN YOU TYPE A CERTAIN KEYWORD
  useEffect(() => {
    if (state.searchKeyword !== "") {
      const searchStr = `?searchKeyword=${state.searchKeyword}`;
      setSearchString(searchStr);
    }
  }, [state.searchKeyword]);

  // ** GET UPDATED DATA OF THE ADMINS WHEN EVER SEARCH STRING UPDATES
  useEffect(() => {
    if (searchString) {
      dispatch(
        handlePendingCustomersFetchNoUpdatesVersion(
          page,
          limit,
          state.searchKeyword
        )
      );
    }
  }, [searchString]);

  const onSelectInputChangeHandler = (e) => {
    dispatch(handleSelectChange(e.target.value, limit));
  };

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handlePendingCustomersFetch(page, limit));
  }, []);

  // ** CLEARING REDUX STATE OF THIS REDUCER TO DEFAULT
  useEffect(() => {
    return () => {
      dispatch({ type: RESET_PENDING_CUSTOMERS_LIST_STATE });
    };
  }, []);

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Pending Customers List</CardTitle>
        </CardHeader>
        <Row className="mx-0 mt-1 mb-75 justify-content-between">
          <Col>
            <div className="d-flex align-items-center">
              <Label className="mr-1" for="sort-select">
                Show
              </Label>
              <Input
                style={{ width: "70px" }}
                className="dataTable-select mr-1"
                type="select"
                id="sort-select"
                value={limit}
                name="limit"
                onChange={onSelectInputChangeHandler}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Input>
              <Label for="sort-select">Records</Label>
            </div>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="4"
          >
            <Label className="mr-1" for="search-input">
              Search
            </Label>
            <Input
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="search-input"
              // value={searchValue}
              onChange={onChangeHandler}
              name="searchKeyword"
            />
          </Col>
        </Row>

        {inProcess ? (
          <ComponentSpinner />
        ) : customersListData && customersListData.customers.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Language Preference</th>
              </tr>
            </thead>
            <tbody>
              {customersListData.customers.map((customer) => (
                <tr key={customer._id}>
                  <td>
                    <span className="align-middle font-weight-bold">
                      {customer._id}
                    </span>
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>
                    {customer.preferences && customer.preferences.language
                      ? customer.preferences.language
                      : "Null"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Card>
            <CardHeader>No Record Found!</CardHeader>
          </Card>
        )}

        <CustomPagination />
      </Card>
    </Fragment>
  );
};

export default memo(ListPendingCustomers);
