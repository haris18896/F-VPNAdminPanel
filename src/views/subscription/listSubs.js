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
  Button,
} from "reactstrap";
import { handleFetchPlans } from "../../redux/actions/plans/fetch";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { handlePlanFilterUpdate } from "../../redux/actions/subscription/filter/planChange";
import { handleAutoRenewalFilterUpdate } from "../../redux/actions/subscription/filter/autoRenewalChange";
import { handleOnTrialFilterUpdate } from "../../redux/actions/subscription/filter/onTrialChange";
import { handleStatusFilterUpdate } from "../../redux/actions/subscription/filter/statusChange";
import { handleUpdateStartTimeRange } from "../../redux/actions/subscription/filter/startTimeChange";
import { handleUpdateExpiryTimeRange } from "../../redux/actions/subscription/filter/expiryTimeChange";
import { handleSubscriptionsFetch } from "../../redux/actions/subscription/fetch";
import { handleResetSubscriptionsListFilters } from "../../redux/actions/subscription/reset/resetFilters";
import { handleSelectChangeListSubsciptions } from "../../redux/actions/subscription/select/limitChange";
import { handlePageChangeListSubscriptions } from "../../redux/actions/subscription/select/pageChange";
import { handleDisableSubscription } from "../../redux/actions/subscription/disable";
import { handleEnableSubscription } from "../../redux/actions/subscription/enable";
import { handleSubscriptionsFetchNoUpdates } from "../../redux/actions/subscription/search";
import { RESET_SUBSCRIPTIONS_LIST_STATE } from "../../redux/actions/actionType/subscription/fetch";
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

const ListSubscriptions = () => {
  const initialState = {
    url: `${MAIN_SERVICE_URL}/vpn/supportTicket/listSupportTickets`,
    searchKeyword: "",
  };

  const [state, setState] = useState(initialState);
  const [searchString, setSearchString] = useState("");
  const [customPlans, setCustomPlans] = useState([]);
  const [startTime, setStartTime] = useState();
  const [expiryTime, setExpiryTime] = useState();

  // DISPATCH
  const dispatch = useDispatch();

  const { plans } = useSelector((state) => state.plan);

  const {
    planIdFilterValue,
    autoRenewalFilterValue,
    onTrialFilterValue,
    statusFilterValue,
    startTimeFromFilterValue,
    startTimeToFilterValue,
    expiryTimeFromFilterValue,
    expiryTimeToFilterValue,
    page,
    limit,
    inProcess,
    subscriptionsListData,
    totalPages,
    disableSubInProcess,
    enableSubInProcess,
  } = useSelector((state) => state.subscription);

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListSubscriptions(
        page,
        limit,
        planIdFilterValue,
        autoRenewalFilterValue,
        onTrialFilterValue,
        statusFilterValue,
        startTimeFromFilterValue,
        startTimeToFilterValue,
        expiryTimeFromFilterValue,
        expiryTimeToFilterValue
      )
    );
    // dispatch(handlePageChangeListTickets(page, limit, statusFilterValue, severityFilterValue))
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
        planIdFilterValue,
        limit,
        autoRenewalFilterValue,
        onTrialFilterValue,
        statusFilterValue,
        startTimeFromFilterValue,
        startTimeToFilterValue,
        expiryTimeFromFilterValue,
        expiryTimeToFilterValue
      )
    );
  };

  // AUTO RENEWAL FILTER CHANGE **
  const autoRenewalFilterChange = (e) => {
    dispatch(
      handleAutoRenewalFilterUpdate(
        e.target.value,
        autoRenewalFilterValue,
        limit,
        planIdFilterValue,
        onTrialFilterValue,
        statusFilterValue,
        startTimeFromFilterValue,
        startTimeToFilterValue,
        expiryTimeFromFilterValue,
        expiryTimeToFilterValue
      )
    );
  };

  // ON TRIAL FILTER CHANGE **
  const onTrialFilterChange = (e) => {
    dispatch(
      handleOnTrialFilterUpdate(
        e.target.value,
        onTrialFilterValue,
        limit,
        planIdFilterValue,
        autoRenewalFilterValue,
        statusFilterValue,
        startTimeFromFilterValue,
        startTimeToFilterValue,
        expiryTimeFromFilterValue,
        expiryTimeToFilterValue
      )
    );
  };

  // ON STATUS FILTER CHANGE **
  const statusFilterChange = (e) => {
    dispatch(
      handleStatusFilterUpdate(
        e.target.value,
        statusFilterValue,
        limit,
        planIdFilterValue,
        autoRenewalFilterValue,
        onTrialFilterValue,
        startTimeFromFilterValue,
        startTimeToFilterValue,
        expiryTimeFromFilterValue,
        expiryTimeToFilterValue
      )
    );
  };

  // ** ON FILTERS RESET
  const resetFilters = () => {
    dispatch(
      handleResetSubscriptionsListFilters(
        page,
        limit,
        planIdFilterValue,
        autoRenewalFilterValue,
        onTrialFilterValue,
        statusFilterValue,
        startTimeFromFilterValue,
        startTimeToFilterValue,
        expiryTimeFromFilterValue,
        expiryTimeToFilterValue
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
        handleSubscriptionsFetchNoUpdates(
          page,
          limit,
          planIdFilterValue,
          autoRenewalFilterValue,
          onTrialFilterValue,
          statusFilterValue,
          startTimeFromFilterValue,
          startTimeToFilterValue,
          expiryTimeFromFilterValue,
          expiryTimeToFilterValue,
          state.searchKeyword
        )
      );
    }
  }, [searchString]);

  const onSelectInputChangeHandler = (e) => {
    dispatch(
      handleSelectChangeListSubsciptions(
        e.target.value,
        limit,
        planIdFilterValue,
        autoRenewalFilterValue,
        onTrialFilterValue,
        statusFilterValue,
        startTimeFromFilterValue,
        startTimeToFilterValue,
        expiryTimeFromFilterValue,
        expiryTimeToFilterValue
      )
    );
  };

  // ** ON MOUNT
  useEffect(() => {
    // ** FETCHING PLANS FOR ONE OF THE SELECT BOXES

    // dispatch(handleTransactionsFetch(page, limit))
    dispatch(
      handleSubscriptionsFetch(
        page,
        limit,
        planIdFilterValue,
        autoRenewalFilterValue,
        onTrialFilterValue,
        statusFilterValue,
        startTimeFromFilterValue,
        startTimeToFilterValue,
        expiryTimeFromFilterValue,
        expiryTimeToFilterValue,
        state.searchkeyword
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

  const onChangeStartTime = (date) => {
    if (date.length === 2) {
      const from = date[0].toISOString();
      const to = date[1].toISOString();
      if (from !== to) {
        dispatch(
          handleUpdateStartTimeRange(
            from,
            to,
            startTimeFromFilterValue,
            startTimeToFilterValue,
            limit,
            planIdFilterValue,
            autoRenewalFilterValue,
            onTrialFilterValue,
            statusFilterValue,
            expiryTimeFromFilterValue,
            expiryTimeToFilterValue
          )
        );
      }
    }
  };

  const onChangeExpiryTime = (date) => {
    if (date.length === 2) {
      const from = date[0].toISOString();
      const to = date[1].toISOString();
      if (from !== to) {
        dispatch(
          handleUpdateExpiryTimeRange(
            from,
            to,
            expiryTimeFromFilterValue,
            expiryTimeToFilterValue,
            limit,
            planIdFilterValue,
            autoRenewalFilterValue,
            onTrialFilterValue,
            statusFilterValue,
            startTimeFromFilterValue,
            startTimeToFilterValue
          )
        );
      }
    }
  };

  const disableSubscriptionHandler = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (
      confirm(
        "Are you sure you want to disable this subscription with CustomerID: " +
          id
      )
    ) {
      dispatch(
        handleDisableSubscription(
          id,
          page,
          limit,
          planIdFilterValue,
          autoRenewalFilterValue,
          onTrialFilterValue,
          statusFilterValue,
          startTimeFromFilterValue,
          startTimeToFilterValue,
          expiryTimeFromFilterValue,
          expiryTimeToFilterValue
        )
      );
    }
  };

  const enableSubscriptionHandler = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (
      confirm(
        "Are you sure you want to enable this subscription with CustomerID: " +
          id
      )
    ) {
      dispatch(
        handleEnableSubscription(
          id,
          page,
          limit,
          planIdFilterValue,
          autoRenewalFilterValue,
          onTrialFilterValue,
          statusFilterValue,
          startTimeFromFilterValue,
          startTimeToFilterValue,
          expiryTimeFromFilterValue,
          expiryTimeToFilterValue
        )
      );
    }
  };

  useEffect(() => {
    return () => dispatch({ type: RESET_SUBSCRIPTIONS_LIST_STATE });
  }, []);

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Subscriptions</CardTitle>
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

        <Row className="mx-0 mt-1 mb-75 justify-content-start">
          <Col sm={12} md={6} lg={3} className="mb-1">
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
          <Col sm={12} md={6} lg={3} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="exampleSelect" className="mr-1">
                Auto Renewal
              </Label>
              <Input
                type="select"
                name="autoRenewalFilterValue"
                id="autoRenewalFilterValue"
                onChange={autoRenewalFilterChange}
                // style={{ width: '120px' }}
                value={autoRenewalFilterValue}
              >
                <option value="">Choose...</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Input>
            </div>
          </Col>
          <Col sm={12} md={6} lg={3} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="exampleSelect" className="mr-1">
                On Trial
              </Label>
              <Input
                type="select"
                name="onTrialFilterValue"
                id="onTrialFilterValue"
                onChange={onTrialFilterChange}
                // style={{ width: '120px' }}
                value={onTrialFilterValue}
              >
                <option value="">Choose...</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
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
                name="statusFilterValue"
                id="exampleSelect"
                onChange={statusFilterChange}
                // style={{ width: '120px' }}
                value={statusFilterValue}
              >
                <option value="">Choose...</option>
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
                <option value="expired">Expired</option>
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={3} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="exampleSelect" className="mr-1">
                Start Time
              </Label>
              <Flatpickr
                value={startTime}
                id="range-picker"
                className="form-control"
                onChange={(date) => {
                  setStartTime(date);
                  onChangeStartTime(date);
                }}
                options={{
                  mode: "range",
                  defaultDate: Date.now(),
                }}
              />
            </div>
          </Col>

          <Col sm={12} md={6} lg={3} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="exampleSelect" className="mr-1">
                Expiry Time
              </Label>
              <Flatpickr
                value={expiryTime}
                id="range-picker"
                className="form-control"
                onChange={(date) => {
                  setExpiryTime(date);
                  onChangeExpiryTime(date);
                }}
                options={{
                  mode: "range",
                  defaultDate: Date.now(),
                }}
              />
            </div>
          </Col>

          <Col sm={12} md={12} className="mb-sm-1">
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

        {inProcess || disableSubInProcess || enableSubInProcess ? (
          <ComponentSpinner />
        ) : subscriptionsListData &&
          subscriptionsListData.customers.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Plan</th>
                <th>Payment Method</th>
                <th>Auto Renew</th>
                <th>Next Plan</th>
                <th>On Trial</th>
                <th>Subscription Start Time</th>
                <th>Subscription End Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionsListData.customers.map((customer) => (
                <tr key={customer._id}>
                  <td>
                    <span className="align-middle font-weight-bold">
                      {customer._id}
                    </span>
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td className="text-truncate">
                    {customer.subscription && customer.subscription.plan
                      ? customer.subscription.plan.name
                      : "Null"}
                  </td>
                  <td>
                    {customer.subscription &&
                    customer.subscription.paymentMethodInfo
                      ? customer.subscription.paymentMethodInfo.paymentMethod
                      : "Null"}
                  </td>
                  <td>
                    {customer.subscription && customer.subscription.autoRenewal
                      ? "Yes"
                      : "No"}
                  </td>
                  <td className="text-truncate">
                    {customer.subscription && customer.subscription.nextPlan
                      ? customer.subscription.nextPlan.name
                      : "Null"}
                  </td>
                  <td>
                    {customer.subscription && customer.subscription.onTrial
                      ? "Yes"
                      : "No"}
                  </td>
                  <td className="text-truncate">
                    {customer.subscription && customer.subscription.startTime
                      ? formatDate(customer.subscription.startTime)
                      : "Null"}
                  </td>
                  <td className="text-truncate">
                    {customer.subscription && customer.subscription.expiryTime
                      ? formatDate(customer.subscription.expiryTime)
                      : "Null"}
                  </td>
                  <td>
                    {customer.subscription && customer.subscription.status
                      ? customer.subscription.status
                      : "Null"}
                  </td>

                  <td>
                    {customer.subscription.status === "enabled" ? (
                      <Button.Ripple
                        onClick={disableSubscriptionHandler.bind(
                          this,
                          customer._id
                        )}
                        size="sm"
                        color="primary"
                      >
                        Disable
                      </Button.Ripple>
                    ) : customer.subscription.status === "disabled" ? (
                      <Button.Ripple
                        onClick={enableSubscriptionHandler.bind(
                          this,
                          customer._id
                        )}
                        size="sm"
                        className="mb-1"
                        color="primary"
                      >
                        Enable
                      </Button.Ripple>
                    ) : (
                      "Expired"
                    )}
                  </td>

                  {/* <td>{customer.paymentMethodInfo.paymentMethod}</td>
                  <td>{customer.autoRenewal ? 'Yes' : 'No'}</td>
                  <td>{customer.nextPlan ? customer.nextPlan.name : 'Null'}</td>
                  <td>{customer.onTrial ? 'Yes' : 'No'}</td>
                  <td>{customer.startTime}</td>
                  <td>{customer.expiryTime}</td>
                  <td>{customer.status}</td>
                  <td>
                    {customer.status === 'enabled' ? (
                      <Button.Ripple onClick={disableSubscriptionHandler.bind(this, subscription._id)} size='sm' color='primary'>
                        Disable
                      </Button.Ripple>
                    ) : subscription.status === 'disabled' ? (
                      <Button.Ripple
                        onClick={enableSubscriptionHandler.bind(this, subscription._id)}
                        size='sm'
                        className='mb-1'
                        color='primary'
                      >
                        Enable
                      </Button.Ripple>
                    ) : (
                      'Expired'
                    )}
                  </td> */}
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

export default memo(ListSubscriptions);
