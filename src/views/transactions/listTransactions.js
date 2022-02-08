/* eslint-disable */
import ReactPaginate from "react-paginate";
import React, { useState, useEffect, Fragment, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCw } from "react-feather";
import { MAIN_SERVICE_URL } from "../../constants/consts";
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
import { handleFetchPlans } from "../../redux/actions/plans/fetch";
import { handleTransactionsFetch } from "../../redux/actions/transaction/fetch";
import { handlePlanFilterUpdate } from "../../redux/actions/transaction/filter/planChange";
import { handleModeFilterUpdate } from "../../redux/actions/transaction/filter/modeChange";
import Flatpickr from "react-flatpickr";

import "@styles/react/libs/flatpickr/flatpickr.scss";
import { handleUpdateDateTimeRange } from "../../redux/actions/transaction/filter/dateTimeChange";
import { handleStatusFilterUpdateTransactions } from "../../redux/actions/transaction/filter/statusChange";
import { RESET_TRANSACTIONS_LIST_STATE } from "../../redux/actions/actionType/transaction/fetch";
import { handleSelectChangeListTransactions } from "../../redux/actions/transaction/select/onSelectLimit";
import { handleResetTransactionListFilters } from "../../redux/actions/transaction/filter/resetFilters";
import { handleTransactionsFetchNoUpdatesVersion } from "../../redux/actions/transaction/search";
import { handlePageChangeListTransactions } from "../../redux/actions/transaction/select/onSelectPage";
import { formatDate } from "../../utility/Utils";

const ComponentSpinner = () => {
  return (
    <div className="fallback-spinner" style={{ marginTop: "600px" }}>
      <div className="loading component-loader">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

const ListTransactions = () => {
  const initialState = {
    url: `${MAIN_SERVICE_URL}/vpn/supportTicket/listSupportTickets`,
    searchKeyword: "",
  };

  const [state, setState] = useState(initialState);
  const [searchString, setSearchString] = useState("");
  const [customPlans, setCustomPlans] = useState([]);
  const [picker, setPicker] = useState();

  // DISPATCH
  const dispatch = useDispatch();

  const { plans } = useSelector((state) => state.plan);
  const {
    planFilterValue,
    modeFilterValue,
    statusFilterValue,
    limit,
    page,
    inProcess,
    transactionsListData,
    totalPages,
    transactionTimeFrom,
    transactionTimeTo,
  } = useSelector((state) => state.transaction);

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListTransactions(
        page,
        limit,
        transactionTimeFrom,
        transactionTimeTo,
        planFilterValue,
        modeFilterValue,
        statusFilterValue
      )
    );
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

  // ON PLAN FILTER CHANGE **
  const planFilterChange = (e) => {
    dispatch(
      handlePlanFilterUpdate(
        e.target.value,
        planFilterValue,
        limit,
        transactionTimeFrom,
        transactionTimeTo,
        modeFilterValue,
        statusFilterValue
      )
    );
  };

  // ON PLAN FILTER CHANGE **
  const modeFilterChange = (e) => {
    dispatch(
      handleModeFilterUpdate(
        e.target.value,
        modeFilterValue,
        limit,
        transactionTimeFrom,
        transactionTimeTo,
        planFilterValue,
        statusFilterValue
      )
    );
  };

  // ON STATUS FILTER CHANGE **
  const statusFilterChange = (e) => {
    dispatch(
      handleStatusFilterUpdateTransactions(
        e.target.value,
        statusFilterValue,
        limit,
        transactionTimeFrom,
        transactionTimeTo,
        planFilterValue,
        modeFilterValue
      )
    );
  };

  // ** ON FILTERS RESET
  const resetFilters = () => {
    dispatch(
      handleResetTransactionListFilters(
        page,
        limit,
        transactionTimeFrom,
        transactionTimeTo,
        planFilterValue,
        modeFilterValue,
        statusFilterValue
      )
    );
  };

  // ** UPDATE SEARCH STRING WHENEVEN YOU TYPE A CERTAIN KEYWORD
  useEffect(() => {
    if (state.searchKeyword !== "") {
      const searchStr = `?searchKeyword=${state.searchKeyword}`;
      setSearchString(searchStr);
    } else {
      setSearchString("");
    }
  }, [state.searchKeyword]);

  // ** GET UPDATED DATA OF THE ADMINS WHEN EVER SEARCH STRING UPDATES
  useEffect(() => {
    if (searchString) {
      dispatch(
        handleTransactionsFetchNoUpdatesVersion(
          page,
          limit,
          transactionTimeFrom,
          transactionTimeTo,
          planFilterValue,
          modeFilterValue,
          statusFilterValue,
          state.searchKeyword
        )
      );
    }
  }, [searchString]);

  const onSelectInputChangeHandler = (e) => {
    dispatch(
      handleSelectChangeListTransactions(
        e.target.value,
        limit,
        transactionTimeFrom,
        transactionTimeTo,
        planFilterValue,
        modeFilterValue,
        statusFilterValue
      )
    );
  };

  // ** ON MOUNT
  useEffect(() => {
    // ** FETCHING PLANS FOR ONE OF THE SELECT BOXES

    dispatch(handleTransactionsFetch(page, limit));
    dispatch(handleFetchPlans());
  }, []);

  useEffect(() => {
    // ** FETCHING PLANS FOR ONE OF THE SELECT BOXES
    if (plans && plans.length) {
      setCustomPlans(plans);
    }
  }, [plans]);

  const onChangeDateTime = (date) => {
    if (date.length === 2) {
      const from = date[0].toISOString();
      const to = date[1].toISOString();

      if (from !== to) {
        dispatch(
          handleUpdateDateTimeRange(
            from,
            to,
            transactionTimeFrom,
            transactionTimeTo,
            limit,
            planFilterValue,
            modeFilterValue,
            statusFilterValue
          )
        );
      }
    }
  };

  useEffect(() => {
    return () => dispatch({ type: RESET_TRANSACTIONS_LIST_STATE });
  }, []);

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Transactions</CardTitle>
        </CardHeader>

        <Row className="mx-0 mt-1 justify-content-between">
          <Col sm={12} md={6} lg={3} className="">
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
            </div>
          </Col>
        </Row>

        <Row className="mx-0 mt-1 mb-75 justify-content-between">
          <Col sm={12} md={6} lg={3} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="planFilterValue" className="mr-1">
                Plan
              </Label>
              <Input
                type="select"
                name="select"
                id="planFilterValue"
                onChange={planFilterChange}
                // style={{ width: '120px' }}
                value={planFilterValue}
              >
                <option value="">choose...</option>
                {customPlans &&
                  customPlans.map((plan) => (
                    <option key={plan._id} value={plan._id}>
                      {plan.name}
                    </option>
                  ))}
              </Input>
            </div>
          </Col>
          <Col sm={12} md={6} lg={3} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="exampleSelect" className="mr-1">
                Mode
              </Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={modeFilterChange}
                // style={{ width: '120px' }}
                value={modeFilterValue}
              >
                <option value="">Choose...</option>
                <option value="auto">Auto</option>
                <option value="manual">Manual</option>
              </Input>
            </div>
          </Col>
          <Col sm={12} md={6} lg={3} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="exampleSelect" className="mr-1">
                Status
              </Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={statusFilterChange}
                // style={{ width: '120px' }}
                value={statusFilterValue}
              >
                <option value="">Choose...</option>
                <option value="succeeded">Succeeded</option>
                <option value="failed">Failed</option>
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={3} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="exampleSelect" className="mr-1">
                Date
              </Label>
              <Flatpickr
                value={picker}
                id="range-picker"
                className="form-control"
                onChange={(date) => {
                  setPicker(date);
                  onChangeDateTime(date);
                }}
                options={{
                  mode: "range",
                  defaultDate: Date.now(),
                }}
              />
            </div>
          </Col>

          <Col sm={12} md={6} lg={6} className="mb-sm-1">
            <Label for="Reset Filters" className="mr-1">
              Reset Filters
            </Label>
            <RefreshCw
              style={{ cursor: "pointer" }}
              onClick={resetFilters}
              size={20}
            />
          </Col>
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="12"
            md={4}
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
        ) : transactionsListData &&
          transactionsListData.transactions.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Payment Method</th>
                <th>Currency</th>
                <th>Internal ID</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Plan</th>
                <th>Subscription Start Time</th>
                <th>Subscription End Time</th>
                <th>Total Fee</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Transaction Time</th>
              </tr>
            </thead>
            <tbody>
              {transactionsListData.transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>
                    <span className="align-middle font-weight-bold">
                      {transaction._id}
                    </span>
                  </td>
                  <td>{transaction.paymentMethod}</td>
                  <td>{transaction.currency}</td>
                  <td>{transaction.internalId}</td>
                  <td className="text-truncate">
                    {transaction.customer && transaction.customer.name
                      ? transaction.customer.name
                      : "Null"}
                  </td>
                  <td>
                    {transaction.customer && transaction.customer.email
                      ? transaction.customer.email
                      : "Null"}
                  </td>
                  <td className="text-truncate">
                    {transaction.plan && transaction.plan.name
                      ? transaction.plan.name
                      : "Null"}
                  </td>
                  <td className="text-truncate">
                    {formatDate(transaction.subscriptionStartTime)}
                  </td>
                  <td className="text-truncate">
                    {formatDate(transaction.subscriptionExpiryTime)}
                  </td>
                  <td>{transaction.totalFee}</td>
                  <td>{transaction.mode}</td>
                  <td>{transaction.status}</td>
                  <td className="text-truncate">
                    {formatDate(transaction.transactionTime)}
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

export default memo(ListTransactions);
