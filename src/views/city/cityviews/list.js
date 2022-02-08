/* eslint-disable */
import { Link } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCw, Edit } from "react-feather";
import { Card, CardHeader, Input, Label, Row, Col, Table, CardBody } from "reactstrap";
import { handleCountriesFetch, handleFetchAllCountriesRecords } from "../../../redux/actions/country/fetch";
import { handleFetchContinents } from "../../../redux/actions/continent/fetch";
import { handleCountryIdFilterUpdate } from "../../../redux/actions/city/filter/countryIdChange";
import { handleContinentIdFilterUpdate } from "../../../redux/actions/city/filter/continentChange";
import { handleCitiesFetch, handleCitiesFetchNoUpdatesVersion } from "../../../redux/actions/city/fetch";
import { handleSelectChangeListCities } from "../../../redux/actions/city/select/onSelectLimit";
import { handlePageChangeListCities } from "../../../redux/actions/city/select/onSelectpage";
import { handleResetCitiesListFilters } from "../../../redux/actions/city/filter/reset";
import { RESET_CITY_STATE } from "../../../redux/actions/actionType/city/reset";
import Menu from "../menu/Menu";
import ReactPaginate from "react-paginate";
import Spinner from "../../common/Spinner"
import "@styles/react/libs/flatpickr/flatpickr.scss";

const ListCities = () => {

  const [searchKeyword, setSearchKeyword] = useState("")
  const [totalCountries, setTotalCountries] = useState(null);

  // DISPATCH
  const dispatch = useDispatch();

  const { countriesFetchInProcess, countryListData, countries } = useSelector(
    (state) => state.country
  );

  const {
    continents,
    page,
    limit,
    countryIdFilterValue,
    continentFilterValue,
    inProcess,
    citiesListData,
    totalPages,
    fetchContinentsInProcess,
    totalRecords
  } = useSelector((state) => state.city);

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
  }

  const onSelectInputChangeHandler = (e) => {
    dispatch(
      handleSelectChangeListCities(
        e.target.value,
        limit,
        countryIdFilterValue,
        continentFilterValue,
        searchKeyword
      )
    );
  };

  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListCities(
        page,
        limit,
        countryIdFilterValue,
        continentFilterValue,
        searchKeyword
      )
    );
  };

  const continentFilterChange = (e) => {
    dispatch(
      handleContinentIdFilterUpdate(
        e.target.value,
        continentFilterValue,
        limit,
        countryIdFilterValue,
        searchKeyword
      )
    );
  };

  const countryIdFilterChange = (e) => {
    dispatch(
      handleCountryIdFilterUpdate(
        e.target.value,
        countryIdFilterValue,
        limit,
        continentFilterValue,
        searchKeyword
      )
    );
  };

  const resetFilters = () => {
    dispatch(
      handleResetCitiesListFilters(
        page,
        limit,
        countryIdFilterValue,
        continentFilterValue,
        searchKeyword
      )
    );
  };

  useEffect(() => {
    dispatch(
      handleCitiesFetchNoUpdatesVersion(
        page,
        limit,
        countryIdFilterValue,
        continentFilterValue,
        searchKeyword
      )
    );
  }, [searchKeyword]);

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handleCitiesFetch(page, limit, countryIdFilterValue, continentFilterValue))
    dispatch(handleCountriesFetch(1, 10, "", "", ""))
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

  useEffect(() => {
    return () => dispatch({ type: RESET_CITY_STATE });
  }, []);

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

  return (
    <>
    <Card>
      <CardBody>
        <Menu currentActive="cities" />
      </CardBody>
        <Row className="mx-0 justify-content-between align-items-center ml-1">
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

        <Row className="mx-0 mt-1 mb-75 justify-content-start ml-1">
        <Col sm={12} md={6} lg={3} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="continentFilterValue" className="mr-1">
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
                  continents &&
                  continents.map((continent) => (
                    <option key={continent} value={continent}>
                      {continent}
                    </option>
                  ))
                )}
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={3} className="mb-1">
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

          <Col sm={12} className="mb-sm-1">
            <Label for="resetFilter" className="mr-1">
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
            sm={3}
          >
            <Label className="mr-1" for="search-input">
              Search
            </Label>
            <Input
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="search-input"
              onChange={onChangeHandler}
              name="searchKeyword"
            />
          </Col>
        </Row>

        {inProcess ? (
          <Spinner />
        ) : citiesListData && citiesListData.cities.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>City Name</th>
                <th>Country</th>
                <th>Continent</th>
                <th>Sub Country</th>
                <th>Is Capital?</th>
                <th>Feature Code</th>
                <th>Geo Name ID</th>
                <th>Population</th>
                <th>Coordinates</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {citiesListData.cities.map((city) => (
                <tr key={city._id}>
                  <td>
                    <span className="align-middle font-weight-bold">
                      {city._id}
                    </span>
                  </td>

                  <td>{city.name}</td>
                  <td>{(city.country && city.country.name) || "Null"}</td>
                  <td>{city.continent}</td>
                  <td>{city.subCountry}</td>
                  <td>{city.isCapital ? "True" : "False"}</td>
                  <td>{city.featureCode}</td>
                  <td>{city.geonameId}</td>
                  <td>{city.population}</td>
                  <td>{city.location.coordinates.join(", ")}</td>
                  <td>
                    <Link to={`/city-update/${city._id}`}>
                      <Edit
                        style={{ cursor: "pointer" }}
                        className="mr-50 text-success"
                        size={15}
                      />
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

      <Row className="mx-0 justify-content-between">
          <Col className="mt-1" sm="12" md={6}>
            <span>
              <b>Total Records:</b> {totalRecords}
            </span>
          </Col>
          <Col sm="12" md={6}>
            <CustomPagination />
          </Col>
      </Row>
    </Card>
    </>
  );
};

export default memo(ListCities);
