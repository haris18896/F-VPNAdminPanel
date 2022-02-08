/* eslint-disable */
import ReactPaginate from "react-paginate";
import React, { useState, useEffect, Fragment, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCw } from "react-feather";
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
import "@styles/react/libs/flatpickr/flatpickr.scss";
import {
  handleServersFetch,
  handleServersFetchNoUpdatesVersion,
} from "../../../redux/actions/server/fetch/servers/fetch";
import { handleTypeFilterUpdate } from "../../../redux/actions/server/fetch/servers/filters/typeChange";
import { handleProtocolFilterUpdate } from "../../../redux/actions/server/fetch/servers/filters/protocolChange";
import { handleStatusFilterUpdate } from "../../../redux/actions/server/fetch/servers/filters/statusChange";
import { handleFetchCloudProviders } from "../../../redux/actions/server/fetch/cloudProviders";
import { handleOnCloudIdFilterUpdate } from "../../../redux/actions/server/fetch/servers/filters/cloudIdChange";
import { handleResetServersListFilters } from "../../../redux/actions/server/fetch/servers/filters/reset";
import { handleSelectChangeListServers } from "../../../redux/actions/server/fetch/servers/select/onSelectLimit";
import { handlePageChangeListServers } from "../../../redux/actions/server/fetch/servers/select/onPageSelect";
import { handleStartServer } from "../../../redux/actions/server/start";
import { handleStopServer } from "../../../redux/actions/server/stop";
import { RESET_SERVERS_LIST_STATE } from "../../../redux/actions/actionType/server/fetch/servers";
import {
  handleCountriesFetch,
  handleFetchAllCountriesRecords,
} from "../../../redux/actions/country/fetch";
import { handleCountryIdFilterUpdate } from "../../../redux/actions/server/fetch/servers/filters/onCountryIdChange";
import { RESET_COUNTRIES_LIST_STATE } from "../../../redux/actions/actionType/country/fetch";
import { handleGetMainVpnProtocols } from "../../../redux/actions/server/fetch/protocols";
import { CLEAR_PROTOCOL_FILTER } from "../../../redux/actions/actionType/server/filters";

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

const ListServers = () => {
  const initialState = {
    searchKeyword: "",
  };

  const [state, setState] = useState(initialState);
  const [totalCountries, setTotalCountries] = useState(null);

  // DISPATCH
  const dispatch = useDispatch();

  const { countriesFetchInProcess, countryListData, countries } = useSelector(
    (state) => state.country
  );
  const {
    countryIdFilterValue,
    typeFilterValue,
    protocolFilterValue,
    statusFilterValue,
    cloudIdFilterValue,
    page,
    limit,
    fetchServersInProcess,
    serversListData,
    totalPages,
    cloudProvidersFetchInProcess,
    providers,
    initServerInProcess,
    stopServerInProcess,
    protocols,
    fetchMainVpnProtocolsInProcess,
  } = useSelector((state) => state.server);

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListServers(
        page,
        limit,
        countryIdFilterValue,
        typeFilterValue,
        protocolFilterValue,
        statusFilterValue,
        cloudIdFilterValue
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
        typeFilterValue,
        protocolFilterValue,
        statusFilterValue,
        cloudIdFilterValue
      )
    );
  };

  // ON TYPE FILTER CHANGE **
  const typeFilterChange = (e) => {
    if (e.target.value === "ca") {
      dispatch({ type: CLEAR_PROTOCOL_FILTER });
      dispatch(
        handleTypeFilterUpdate(
          e.target.value,
          typeFilterValue,
          limit,
          countryIdFilterValue,
          "",
          statusFilterValue,
          cloudIdFilterValue
        )
      );
    } else {
      dispatch(
        handleTypeFilterUpdate(
          e.target.value,
          typeFilterValue,
          limit,
          countryIdFilterValue,
          protocolFilterValue,
          statusFilterValue,
          cloudIdFilterValue
        )
      );
    }
  };

  // AUTO PROTOCOL FILTER CHANGE **
  const protocolFilterChange = (e) => {
    dispatch(
      handleProtocolFilterUpdate(
        e.target.value,
        protocolFilterValue,
        limit,
        countryIdFilterValue,
        typeFilterValue,
        statusFilterValue,
        cloudIdFilterValue
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
        countryIdFilterValue,
        typeFilterValue,
        protocolFilterValue,
        cloudIdFilterValue
      )
    );
  };

  // ON CLOUDID FILTER CHANGE **
  const onCloudIdChange = (e) => {
    dispatch(
      handleOnCloudIdFilterUpdate(
        e.target.value,
        cloudIdFilterValue,
        limit,
        countryIdFilterValue,
        typeFilterValue,
        protocolFilterValue,
        statusFilterValue
      )
    );
  };

  // ** ON FILTERS RESET
  const resetFilters = () => {
    dispatch(
      handleResetServersListFilters(
        page,
        limit,
        countryIdFilterValue,
        typeFilterValue,
        protocolFilterValue,
        statusFilterValue,
        cloudIdFilterValue
      )
    );
  };

  // ** START SERVER
  const startServerHandler = (id) => {
    if (confirm("Are you sure you want to start this server with ID: " + id)) {
      dispatch(
        handleStartServer(
          id,
          page,
          limit,
          typeFilterValue,
          protocolFilterValue,
          statusFilterValue,
          cloudIdFilterValue
        )
      );
    }
  };

  // ** HALT SERVER
  const haltServerHandler = (id) => {
    if (confirm("Are you sure you want to stop this server with ID: " + id)) {
      dispatch(
        handleStopServer(
          id,
          page,
          limit,
          typeFilterValue,
          protocolFilterValue,
          statusFilterValue,
          cloudIdFilterValue
        )
      );
    }
  };

  // ** GET UPDATED SERVERS BASED ON THE SEARCH KEYWORD
  useEffect(() => {
    if (state.searchKeyword) {
      dispatch(
        handleServersFetchNoUpdatesVersion(
          page,
          limit,
          countryIdFilterValue,
          typeFilterValue,
          protocolFilterValue,
          statusFilterValue,
          cloudIdFilterValue,
          state.searchKeyword
        )
      );
    }
  }, [state.searchKeyword]);

  // useEffect(() => {
  //   if (searchString) {
  //   }
  // }, [searchString])

  const onSelectInputChangeHandler = (e) => {
    dispatch(
      handleSelectChangeListServers(
        e.target.value,
        limit,
        countryIdFilterValue,
        typeFilterValue,
        protocolFilterValue,
        statusFilterValue,
        cloudIdFilterValue
      )
    );
  };

  // ** ON MOUNT
  useEffect(() => {
    dispatch(
      handleServersFetch(
        page,
        limit,
        typeFilterValue,
        protocolFilterValue,
        statusFilterValue,
        cloudIdFilterValue,
        state.searchkeyword
      )
    );

    dispatch(handleCountriesFetch(1, 10, "", "", ""));

    dispatch(handleFetchCloudProviders());

    dispatch(handleGetMainVpnProtocols());
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

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_SERVERS_LIST_STATE });
      dispatch({ type: RESET_COUNTRIES_LIST_STATE });
    };
  }, []);

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Servers</CardTitle>
        </CardHeader>

        <Row className="mx-0 mt-1 justify-content-between">
          <Col sm={12} md={6} lg={4} className="">
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
                  countries &&
                  countries.map((country) => (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  ))
                )}
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="planIdFilterValue" className="mr-1">
                Type
              </Label>
              <Input
                type="select"
                name="select"
                id="typeFilterValue"
                onChange={typeFilterChange}
                // style={{ width: '120px' }}
                value={typeFilterValue}
              >
                <option value="">choose...</option>

                {protocolFilterValue === "n/a" ? (
                  <option value="ca">Certificate Authority</option>
                ) : (
                  <>
                    <option value="vpn-server">VPN Server</option>
                    <option value="ca">Certificate Authority</option>
                  </>
                )}
              </Input>
            </div>
          </Col>

          {typeFilterValue === "vpn-server" ? (
            <Col sm={12} md={6} lg={4} className="mb-1">
              <div className="d-flex align-items-center justify-content-lg-start">
                <Label for="exampleSelect" className="mr-1">
                  Protocol
                </Label>
                <Input
                  type="select"
                  name="protocolFilterValue"
                  id="protocolFilterValue"
                  onChange={protocolFilterChange}
                  // style={{ width: '220px' }}
                  value={protocolFilterValue}
                >
                  {fetchMainVpnProtocolsInProcess ? (
                    <option>Loading...</option>
                  ) : (
                    <>
                      <option value="">Choose...</option>
                      {protocols.map((protocol) => (
                        <option key={protocol.id} value={protocol.id}>
                          {protocol.name}
                        </option>
                      ))}
                    </>
                  )}
                </Input>
              </div>
            </Col>
          ) : (
            ""
          )}
          <Col sm={12} md={6} lg={4} className="mb-1">
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
                <option value="initializing">Initializing</option>
                <option value="running">Running</option>
                <option value="halted">Halted</option>
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="cloudId" className="mr-1">
                Cloud Provider
              </Label>
              <Input
                type="select"
                name="cloudIdFilterValue"
                id="cloudIdFilterValue"
                onChange={onCloudIdChange}
                // style={{ width: '120px' }}
                value={cloudIdFilterValue}
              >
                <option value="">Choose...</option>
                {cloudProvidersFetchInProcess ? (
                  <option value="">Loading...</option>
                ) : (
                  providers &&
                  providers.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.name}
                    </option>
                  ))
                )}
              </Input>
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
              type="search"
              bsSize="sm"
              id="search-input"
              onChange={onChangeHandler}
              name="searchKeyword"
            />
          </Col>
        </Row>

        {fetchServersInProcess || initServerInProcess || stopServerInProcess ? (
          <ComponentSpinner />
        ) : serversListData && serversListData.servers.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Protocol</th>
                <th>Port</th>
                <th>Image Name</th>
                <th>Cloud ID</th>
                <th>Continent</th>
                <th>Country</th>
                <th>City</th>
                <th>Region ID</th>
                <th>Instance ID</th>
                <th>DNS Provider ID</th>
                <th>Init Progress</th>
                <th>Total Connections</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {serversListData.servers.map((server) => (
                <tr key={server._id}>
                  <td className="text-truncate">
                    <span className="align-middle font-weight-bold">
                      {server._id}
                    </span>
                  </td>
                  <td className="text-truncate">{server.type}</td>
                  <td>{server.protocol || "NULL"}</td>
                  <td>{server.port || "NULL"}</td>
                  <td className="text-truncate">{server.os.imageName}</td>
                  <td>{server.cloudId}</td>
                  <td>{server.continent}</td>
                  <td>
                    {server.country && server.country.name
                      ? server.country.name
                      : "Null"}
                  </td>
                  <td>
                    {server.city && server.city.name
                      ? server.city.name
                      : "Null"}
                  </td>
                  <td>{server.regionId}</td>
                  <td className="text-truncate">{server.instanceId}</td>
                  <td>
                    {server.metadata && server.metadata.dnsProviderId
                      ? server.metadata.dnsProviderId
                      : "NULL"}
                  </td>
                  <td>{server.initProgress}</td>
                  <td>{server.totalConnections || "NULL"}</td>
                  <td>{server.status}</td>
                  <td>
                    {server.status === "running" ? (
                      <Button.Ripple
                        onClick={haltServerHandler.bind(this, server._id)}
                        size="sm"
                        color="primary"
                      >
                        Halt
                      </Button.Ripple>
                    ) : server.status === "halted" ? (
                      <Button.Ripple
                        onClick={startServerHandler.bind(this, server._id)}
                        size="sm"
                        className="mb-1"
                        color="primary"
                      >
                        Start
                      </Button.Ripple>
                    ) : (
                      "Initializing"
                    )}
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

export default memo(ListServers);
