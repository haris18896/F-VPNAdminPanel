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
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { handleFetchCloudProviders } from "../../../redux/actions/server/fetch/cloudProviders";
import { RESET_SERVERS_LIST_STATE } from "../../../redux/actions/actionType/server/fetch/servers";
import { handleFetchServerLoadTypes } from "../../../redux/actions/server/fetch/serverLoad";
import {
  handleFetchCountryServersLoadStats,
  handleFetchCountryServersLoadStatsNoUpdatesVersion,
} from "../../../redux/actions/server/fetch/servers/fetch/countryServersLoadStats";
import classNames from "classnames";
import { handleloadFilterUpdate } from "../../../redux/actions/server/fetch/serverLoad/filters/onLoadChange";
import { handleProtocolFilterUpdate } from "../../../redux/actions/server/fetch/serverLoad/filters/onProtocolChange";
import { handleOnCloudIdFilterUpdate } from "../../../redux/actions/server/fetch/serverLoad/filters/onCloudFilterChange";
import { handleResetServersLoadStatsListFilters } from "../../../redux/actions/server/fetch/serverLoad/filters/reset";
import { handleSelectChangeListServersLoadStats } from "../../../redux/actions/server/fetch/serverLoad/select/onLimitSelect";
import { handlePageChangeListServersLoadStats } from "../../../redux/actions/server/fetch/serverLoad/select/onPageSelect";
import { RESET_SERVERS_LOAD_STATS_LIST_STATE } from "../../../redux/actions/actionType/server/fetch/countryServersLoadStats";
import { RESET_COUNTRIES_LIST_STATE } from "../../../redux/actions/actionType/country/fetch";
import {
  handleCountriesFetch,
  handleFetchAllCountriesRecords,
} from "../../../redux/actions/country/fetch";
import { handleCountryIdFilterUpdate } from "../../../redux/actions/server/fetch/serverLoad/filters/onCountryFilterChange";
import { handleFetchProtocols } from "../../../redux/actions/server/fetch/protocols";
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

const ListServersLoadStats = () => {
  const initialState = {
    searchKeyword: "",
  };

  const [state, setState] = useState(initialState);
  const [totalCountries, setTotalCountries] = useState(null);
  const [searchString, setSearchString] = useState("");

  // DISPATCH
  const dispatch = useDispatch();

  const { cloudProvidersFetchInProcess, providers } = useSelector(
    (state) => state.server
  );

  const { countriesFetchInProcess, countryListData, countries } = useSelector(
    (state) => state.country
  );

  const {
    countryIdFilterValue,
    loadFilterValue,
    protocolFilterValue,
    cloudIdFilterValue,
    page,
    limit,
    totalPages,
    fetchLoadTypesInProcess,
    serverLoadTypes,
    error,
    fetchCountryLoadServersInProcess,
    countryServersLoadStatsData,
    protocolsFetchInProcess,
    protocols,
  } = useSelector((state) => state.countryServers);

  // useEffect(() => {
  // }, [countryServersLoadStatsData, serverLoadTypes])

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListServersLoadStats(
        page,
        limit,
        countryIdFilterValue,
        loadFilterValue,
        protocolFilterValue,
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
        loadFilterValue,
        protocolFilterValue,
        cloudIdFilterValue
      )
    );
  };

  // ON LOAD FILTER CHANGE **
  const loadFilterChange = (e) => {
    dispatch(
      handleloadFilterUpdate(
        e.target.value,
        loadFilterValue,
        limit,
        countryIdFilterValue,
        protocolFilterValue,
        cloudIdFilterValue
      )
    );
  };

  // AUTO PROTOCOL FILTER CHANGE **
  const protocolFilterChange = (e) => {
    dispatch(
      handleProtocolFilterUpdate(
        e.target.value,
        protocolFilterValue,
        limit,
        countryIdFilterValue,
        loadFilterValue,
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
        loadFilterValue,
        protocolFilterValue
      )
    );
  };

  // ** ON FILTERS RESET
  const resetFilters = () => {
    dispatch(
      handleResetServersLoadStatsListFilters(
        page,
        limit,
        countryIdFilterValue,
        loadFilterValue,
        protocolFilterValue,
        cloudIdFilterValue
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
        handleFetchCountryServersLoadStatsNoUpdatesVersion(
          page,
          limit,
          loadFilterValue,
          protocolFilterValue,
          cloudIdFilterValue,
          state.searchKeyword
        )
      );
    }
  }, [searchString]);

  const onSelectInputChangeHandler = (e) => {
    dispatch(
      handleSelectChangeListServersLoadStats(
        e.target.value,
        limit,
        countryIdFilterValue,
        loadFilterValue,
        protocolFilterValue,
        cloudIdFilterValue
      )
    );
  };

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handleFetchServerLoadTypes());

    dispatch(
      handleFetchCountryServersLoadStats(
        page,
        limit,
        countryIdFilterValue,
        loadFilterValue,
        protocolFilterValue,
        cloudIdFilterValue
      )
    );

    dispatch(handleFetchCloudProviders());

    dispatch(handleCountriesFetch(1, 10, "", "", ""));

    dispatch(handleFetchProtocols());
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
      dispatch({ type: RESET_SERVERS_LOAD_STATS_LIST_STATE });
      dispatch({ type: RESET_COUNTRIES_LIST_STATE });
      dispatch({ type: RESET_SERVERS_LIST_STATE });
    };
  }, []);

  const checkLowLoad = (loadPercentage) => {
    let result = false;
    const loadTypeLow = serverLoadTypes.find(
      (loadType) => loadType.id === "low"
    );

    if (
      loadPercentage >= loadTypeLow.loadPercentage.min &&
      loadPercentage < loadTypeLow.loadPercentage.max
    ) {
      result = true;
    }

    return result;
  };

  const checkMediumLoad = (loadPercentage) => {
    let result = false;
    const loadTypeMedium = serverLoadTypes.find(
      (loadType) => loadType.id === "medium"
    );

    if (
      loadPercentage >= loadTypeMedium.loadPercentage.min &&
      loadPercentage < loadTypeMedium.loadPercentage.max
    ) {
      result = true;
    }

    return result;
  };

  const checkHighLoad = (loadPercentage) => {
    let result = false;
    const loadTypeHigh = serverLoadTypes.find(
      (loadType) => loadType.id === "high"
    );

    if (
      loadPercentage >= loadTypeHigh.loadPercentage.min &&
      loadPercentage < loadTypeHigh.loadPercentage.max
    ) {
      result = true;
    }

    return result;
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Servers Load Stats</CardTitle>
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
              <Label for="loadTypeId" className="mr-1">
                Load Type
              </Label>
              <Input
                type="select"
                name="select"
                id="loadTypeId"
                onChange={loadFilterChange}
                name="loadTypeId"
                // style={{ width: '120px' }}
                value={loadFilterValue}
              >
                {serverLoadTypes &&
                  serverLoadTypes.map((load) => (
                    <option key={load.id} value={load.id}>
                      {load.name}
                    </option>
                  ))}
              </Input>
            </div>
          </Col>

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
                // style={{ width: '120px' }}
                value={protocolFilterValue}
              >
                {protocolsFetchInProcess ? (
                  <option>Loading...</option>
                ) : (
                  <>
                    <option>Choose...</option>

                    {protocols &&
                      protocols.map((protocol) => (
                        <option key={protocol.id} value={protocol.id}>
                          {protocol.name}
                        </option>
                      ))}
                  </>
                )}
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
              type="text"
              bsSize="sm"
              id="search-input"
              // value={searchValue}
              onChange={onChangeHandler}
              name="searchKeyword"
            />
          </Col>
        </Row>

        {fetchCountryLoadServersInProcess || fetchLoadTypesInProcess ? (
          <ComponentSpinner />
        ) : countryServersLoadStatsData &&
          countryServersLoadStatsData.countryServersLoadStats &&
          countryServersLoadStatsData.countryServersLoadStats.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Country Name</th>
                <th>Total Servers</th>
                <th>Total VPN Connections</th>
                <th>Load Percentage</th>
              </tr>
            </thead>
            <tbody>
              {countryServersLoadStatsData.countryServersLoadStats.map(
                (loadStat) => {
                  const myClass = classNames({
                    "bg-success bg-lighten-3": checkLowLoad(
                      loadStat.loadPercentage
                    ),
                    "bg-warning": checkMediumLoad(loadStat.loadPercentage),
                    "bg-danger": checkHighLoad(loadStat.loadPercentage),
                  });

                  return (
                    <tr key={loadStat._id} className={myClass}>
                      <td className="text-white">
                        <span className="align-middle font-weight-bold">
                          {loadStat._id}
                        </span>
                      </td>
                      <td className="text-white">{loadStat.country.name}</td>
                      <td className="text-white">{loadStat.totalServers}</td>
                      <td className="text-white">
                        {loadStat.totalVPNConnections}
                      </td>
                      <td className="text-white">{loadStat.loadPercentage}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        ) : error ? (
          <Card>
            <CardHeader className="text-danger">
              Error fetching the details
            </CardHeader>
          </Card>
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

export default memo(ListServersLoadStats);
