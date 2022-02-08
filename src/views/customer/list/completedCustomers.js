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
  Button,
} from "reactstrap";
import { RESET_COMPLETED_CUSTOMERS_LIST_STATE } from "../../../redux/actions/actionType/customer";
import {
  handleCompletedCustomersFetch,
  handleCompletedCustomersFetchNoUpdatesVersion,
} from "../../../redux/actions/customer/fetch/completed";
import { handleFetchPlans } from "../../../redux/actions/plans/fetch";
import { handleSelectChange } from "../../../redux/actions/customer/completed/select/onLimitChange";
import { handlePageChange } from "../../../redux/actions/customer/completed/select/onPageChange";
import { handleSubscriptionStatusChange } from "../../../redux/actions/customer/completed/filter/onSubscriptionStatusChange";
import { handlePlanIdFilterChange } from "../../../redux/actions/customer/completed/filter/onPlanIdChange";
import { RefreshCw } from "react-feather";
import { handleResetCompletedCustomersFilters } from "../../../redux/actions/customer/completed/filter/reset";
import { formatDate, formatDateToMonthShort } from "../../../utility/Utils";

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

const CompletedCustomers = () => {
  const initialState = {
    url: `${MAIN_SERVICE_URL}/vpn/admin/listAdmins`,
    searchKeyword: "",
  };

  const [state, setState] = useState(initialState);
  const [customPlans, setCustomPlans] = useState([]);
  const [searchString, setSearchString] = useState("");

  // DISPATCH
  const dispatch = useDispatch();

  // EXTRACTING STUFF FROM REDUX GLOBAL STATE
  const { plans } = useSelector((state) => state.plan);

  const {
    inProcess,
    page,
    limit,
    totalPages,
    customersListData,
    subscriptionStatus,
    planIdFilterValue,
  } = useSelector((state) => state.completedCustomer);

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = (page) => {
    dispatch(
      handlePageChange(page, limit, subscriptionStatus, planIdFilterValue)
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

  // ** SUBSCRIPTION STATUS CHANGE HANDLER
  const subscriptionStatusChange = (e) => {
    dispatch(
      handleSubscriptionStatusChange(
        e.target.value,
        subscriptionStatus,
        limit,
        planIdFilterValue
      )
    );
    // alert(e.target.value)
  };

  // ** PLAN ID CHANGE HANDLER
  const planFilterChange = (e) => {
    dispatch(
      handlePlanIdFilterChange(
        e.target.value,
        planIdFilterValue,
        limit,
        subscriptionStatus
      )
    );
    // alert(e.target.value)
  };

  // ** ON FILTERS RESET
  const resetFilters = () => {
    dispatch(
      handleResetCompletedCustomersFilters(
        page,
        limit,
        subscriptionStatus,
        planIdFilterValue
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
        handleCompletedCustomersFetchNoUpdatesVersion(
          page,
          limit,
          subscriptionStatus,
          planIdFilterValue,
          state.searchKeyword
        )
      );
    }
  }, [searchString]);

  const onSelectInputChangeHandler = (e) => {
    dispatch(
      handleSelectChange(
        e.target.value,
        limit,
        subscriptionStatus,
        planIdFilterValue
      )
    );
  };

  // ** ON MOUNT
  useEffect(() => {
    dispatch(
      handleCompletedCustomersFetch(
        page,
        limit,
        subscriptionStatus,
        planIdFilterValue
      )
    );

    dispatch(handleFetchPlans());
  }, []);

  useEffect(() => {
    // ** FETCHING PLANS FOR ONE OF THE SELECT BOXES
    if (plans && plans.length) {
      setCustomPlans(plans);
    }
  }, [plans]);

  // ** CLEARING REDUX STATE OF THIS REDUCER TO DEFAULT
  useEffect(() => {
    return () => {
      dispatch({ type: RESET_COMPLETED_CUSTOMERS_LIST_STATE });
    };
  }, []);

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Completed Customers List</CardTitle>
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

          <Col sm={12} md={6} lg={3} className="mt-2 mt-md-0">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="subscriptionStatus" className="mr-1">
                Subscription Status
              </Label>
              <Input
                type="select"
                name="select"
                id="subscriptionStatus"
                value={subscriptionStatus}
                name="subscriptionStatus"
                onChange={subscriptionStatusChange}
              >
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
                <option value="expired">Expired</option>
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={3} className="my-2 my-lg-0">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="planIdFilterValue" className="mr-1">
                Plan
              </Label>
              <Input
                type="select"
                name="select"
                id="planIdFilterValue"
                onChange={planFilterChange}
                // style={{ width: '120px' }}
                value={planIdFilterValue}
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

          <Col sm={12} md={12} className="mt-lg-2">
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
            className="d-flex align-items-center justify-content-sm-end mt-2"
            sm="12"
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
                <th>Auto Renewal</th>
                <th>Plan</th>
                <th>Status</th>
                <th>On Trial</th>
                <th>Start Time</th>
                <th>Expiry Time</th>
                <th>Action</th>
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
                  <td>{customer.subscription.autoRenewal ? "Yes" : "No"}</td>
                  <td className="text-truncate">
                    {customer.subscription.plan}
                  </td>
                  <td>{customer.subscription.status}</td>
                  <td>{customer.subscription.onTrial ? "Yes" : "No"}</td>
                  <td className="text-truncate">
                    {formatDate(customer.subscription.startTime)}
                  </td>
                  <td className="text-truncate">
                    {formatDate(customer.subscription.expiryTime)}
                  </td>
                  <td>
                    <Link
                      to={`/customer-details/${customer._id}?subscriptionStatus=${customer.subscription.status}`}
                    >
                      <Button.Ripple className="btn-md" color="primary" block>
                        Details
                      </Button.Ripple>
                    </Link>
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

export default memo(CompletedCustomers);
