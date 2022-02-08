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
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { handleUpdateConnectionTimeRange } from "../../redux/actions/logs/vpn/onChangeRange";
import {
  handleFetchVpnConnectionLogs,
  handleLogsFetchNoUpdatesVersion,
} from "../../redux/actions/logs/vpn/fetch";
import { handleSelectChangeListLogs } from "../../redux/actions/logs/vpn/select/onLimitChange";
import { handlePageChangeListLogs } from "../../redux/actions/logs/vpn/select/onPageChange";
import { RESET_LOGS_LIST_STATE } from "../../redux/actions/actionType/logs/fetch";
import { handleResetLogsListFilters } from "../../redux/actions/logs/vpn/reset";
import {
  handleCountriesFetch,
  handleFetchAllCountriesRecords,
} from "../../redux/actions/country/fetch";
import { handleFetchContinents } from "../../redux/actions/continent/fetch";
import { RESET_COUNTRIES_LIST_STATE } from "../../redux/actions/actionType/country/fetch";
import { RESET_CITY_STATE } from "../../redux/actions/actionType/city/reset";
import { handleCountryIdFilterUpdate } from "../../redux/actions/logs/vpn/onChangeCountry";
import { handleContinentIdFilterUpdate } from "../../redux/actions/logs/vpn/onChangeContinent";

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

const ConnectionLogs = () => {
  const initialState = {
    url: `${MAIN_SERVICE_URL}/vpn/supportTicket/listSupportTickets`,
    searchKeyword: "",
  };

  const [state, setState] = useState(initialState);
  const [searchString, setSearchString] = useState("");
  const [totalCountries, setTotalCountries] = useState(null);
  const [picker, setPicker] = useState();

  // DISPATCH
  const dispatch = useDispatch();

  const { countriesFetchInProcess, countryListData, countries } = useSelector(
    (state) => state.country
  );
  const { continents, fetchContinentsInProcess } = useSelector(
    (state) => state.city
  );

  const {
    limit,
    page,
    countryIdFilterValue,
    continentFilterValue,
    connectionTimeFrom,
    connectionTimeTo,
    vpnConnectionLogData,
    totalPages,
    inProcess,
  } = useSelector((state) => state.logs);

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListLogs(
        page,
        limit,
        countryIdFilterValue,
        continentFilterValue,
        connectionTimeFrom,
        connectionTimeTo
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

  // ON COUNTRY ID FILTER CHANGE **
  const countryIdFilterChange = (e) => {
    dispatch(
      handleCountryIdFilterUpdate(
        e.target.value,
        countryIdFilterValue,
        limit,
        continentFilterValue,
        connectionTimeFrom,
        connectionTimeTo
      )
    );
  };

  // ** ON CONTINENT CHANGE
  const continentFilterChange = (e) => {
    dispatch(
      handleContinentIdFilterUpdate(
        e.target.value,
        continentFilterValue,
        limit,
        countryIdFilterValue,
        connectionTimeFrom,
        connectionTimeTo
      )
    );
  };

  // ** ON FILTERS RESET
  const resetFilters = () => {
    dispatch(
      handleResetLogsListFilters(
        page,
        limit,
        countryIdFilterValue,
        continentFilterValue,
        connectionTimeFrom,
        connectionTimeTo
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
        handleLogsFetchNoUpdatesVersion(
          page,
          limit,
          countryIdFilterValue,
          continentFilterValue,
          connectionTimeFrom,
          connectionTimeTo,
          state.searchKeyword
        )
      );
    }
  }, [searchString]);

  const onSelectInputChangeHandler = (e) => {
    dispatch(
      handleSelectChangeListLogs(
        e.target.value,
        limit,
        countryIdFilterValue,
        continentFilterValue,
        connectionTimeFrom,
        connectionTimeTo
      )
    );
  };

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handleFetchVpnConnectionLogs(page, limit, "", "", "", ""));
    dispatch(handleCountriesFetch(1, 10, "", "", ""));
    dispatch(handleFetchContinents());
  }, []);

  useEffect(() => {
    if (totalCountries) {
      dispatch(handleFetchAllCountriesRecords(totalCountries));
    }
  }, [totalCountries]);

  useEffect(() => {
    if (countryListData) {
      setTotalCountries(countryListData.countriesCount);
    }
  }, [countryListData]);

  const onChangeDateTime = (date) => {
    if (date.length === 2) {
      const from = date[0].toISOString();
      const to = date[1].toISOString();

      if (from !== to) {
        dispatch(
          handleUpdateConnectionTimeRange(
            from,
            to,
            connectionTimeFrom,
            connectionTimeTo,
            limit,
            countryIdFilterValue,
            continentFilterValue
          )
        );
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_LOGS_LIST_STATE });
      dispatch({ type: RESET_COUNTRIES_LIST_STATE });
      dispatch({ type: RESET_CITY_STATE });
    };
  }, []);

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">VPN Connection Logs</CardTitle>
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
          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="countryIdFilterValue" className="mr-1">
                Country
              </Label>

              <Input
                name="countryIdFilterValue"
                type="select"
                id="countryIdFilterValue"
                value={countryIdFilterValue}
                onChange={countryIdFilterChange}
              >
                <option value="">Choose...</option>

                {countriesFetchInProcess ? (
                  <option value="">Loading...</option>
                ) : (
                  <>
                    <option value="n/a">N/A</option>
                    {countries &&
                      countries.map((country) => (
                        <option key={country._id} value={country._id}>
                          {country.name}
                        </option>
                      ))}
                  </>
                )}
              </Input>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="exampleSelect" className="mr-1">
                Continent
              </Label>

              <Input
                name="continentFilterValue"
                type="select"
                id="continentFilterValue"
                value={continentFilterValue}
                onChange={continentFilterChange}
              >
                <option value="">Choose...</option>

                {fetchContinentsInProcess ? (
                  <option value="">Loading...</option>
                ) : (
                  <>
                    <option value="n/a">N/A</option>
                    {continents &&
                      continents.map((continent) => (
                        <option key={continent} value={continent}>
                          {continent}
                        </option>
                      ))}
                  </>
                )}
              </Input>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="exampleSelect" className="mr-1">
                Connection Time
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

          <Col sm={12} className="mb-sm-1">
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
        ) : vpnConnectionLogData &&
          vpnConnectionLogData.vpnConnectionLogs.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Client ID</th>
                <th>Real IP</th>
                <th>Virtual IP</th>
                <th>Server ID</th>
                <th>Server Protocol</th>
                <th>Server Country</th>
                <th>Server City</th>
                <th>Server IP</th>
                <th>Mac Address</th>
                <th>Port</th>
                <th>Connection Time</th>
                <th>OS Platform</th>
                <th>OS Version</th>
                <th>Open VPN Version</th>
                <th>Open VPN GUI Version</th>
              </tr>
            </thead>
            <tbody>
              {vpnConnectionLogData.vpnConnectionLogs.map((log) => (
                <tr key={log._id}>
                  <td>
                    <span className="align-middle font-weight-bold">
                      {log._id.substring(log._id.length - 5)}
                    </span>
                  </td>

                  <td>
                    {log.customer && log.customer.name
                      ? log.customer.name
                      : "Null"}
                  </td>
                  <td>
                    {log.customer && log.customer.email
                      ? log.customer.email
                      : "Null"}
                  </td>
                  <td>{log.clientId}</td>
                  <td>{log.realIP}</td>
                  <td>{log.virtualIP}</td>
                  <td>{log.server._id}</td>
                  <td>{log.server.protocol}</td>
                  <td className="text-truncate">
                    {log.server.country && log.server.country.name
                      ? log.server.country.name
                      : "Null"}
                  </td>
                  <td>
                    {log.server.city && log.server.city.name
                      ? log.server.city.name
                      : "Null"}
                  </td>
                  <td>{log.server.ipv4Address || "Null"}</td>
                  <td>{log.macAddress || "Null"}</td>
                  <td>{log.port}</td>
                  <td className="text-truncate">{log.connectionTime}</td>
                  <td>{log.osPlatform || "Null"}</td>
                  <td>{log.osVersion || "Null"}</td>
                  <td>{log.openvpnVersion || "Null"}</td>
                  <td>{log.openvpnGUIVersion || "Null"}</td>
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

export default memo(ConnectionLogs);
