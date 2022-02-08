import { useState, useEffect, Fragment, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RefreshCw } from "react-feather"
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Table } from "reactstrap"
import { handleContinentsFetch, handleCountriesFetch, handleCountriesFetchNoUpdatesVersion } from "../../../redux/actions/country/fetch"
import { handlePageChangeListCoutries } from "../../../redux/actions/country/select/onSelectPage"
import { handleSelectChangeListCountries } from "../../../redux/actions/country/select/onSelectLimit"
import { RESET_COUNTRIES_LIST_STATE } from "../../../redux/actions/actionType/country/fetch"
import Spinner from "../../common/Spinner"
import ReactPaginate from "react-paginate"
import ReactCountryFlag from "react-country-flag"
import "@styles/react/libs/flatpickr/flatpickr.scss"

const ListCountries = () => {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [continentFilter, setContinentFilter] = useState("")
  const dispatch = useDispatch()

  const {
    isContinentsLoading,
    continents,
    page,
    limit,
    inProcess,
    countryListData,
    totalPages,
    totalRecords,
  } = useSelector((state) => state.country)

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
    else if (name === 'continentFilter') setContinentFilter(value)
  }

  const handleLimitChange = (e) => {
    dispatch(
      handleSelectChangeListCountries(
        e.target.value,
        limit,
        continentFilter,
        searchKeyword
      )
    )
  }

  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListCoutries(page, limit, continentFilter, searchKeyword)
    )
  }

  const resetFilters = () => {
    setContinentFilter("")
  }

  useEffect(() => {
    dispatch(
      handleCountriesFetchNoUpdatesVersion(
        page,
        limit,
        continentFilter,
        searchKeyword
      )
    )
  }, [continentFilter, searchKeyword])

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handleContinentsFetch())
    dispatch(handleCountriesFetch(page, limit, continentFilter))
  }, [])

  useEffect(() => {
    return () => dispatch({ type: RESET_COUNTRIES_LIST_STATE })
  }, [])

  const formatLanguageNames = (arr) => {
    const names = arr.map((item) => item.name)
    return names.join(", ")
  }

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
    )
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Countries</CardTitle>
        </CardHeader>

        <Row className="mx-0 mt-1 justify-content-between">
          <Col sm={12} md={6} lg={3} className="">
            <div className="d-flex align-items-center">
              <Label className="mr-1" for="limit">
                Show
              </Label>
              <Input
                style={{ width: "70px" }}
                className="dataTable-select mr-1"
                type="select"
                id="limit"
                value={limit}
                name="limit"
                onChange={handleLimitChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Input>
            </div>
          </Col>
        </Row>

        <Row className="mx-0 mt-1 mb-75">
          <Col className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1" sm="12" md={4}>
              <Label className="mr-1" for="continentFilter">
                Continent
              </Label>
              <Input
                className="dataTable-select mr-1"
                type="select"
                id="continentFilter"
                name="continentFilter"
                value={continentFilter}
                onChange={onChangeHandler}
              >
                <option value="">Choose...</option>
                {isContinentsLoading ? (<option value="">Loading...</option>) : continents && continents.map((continent, index) => {
                  return (<option key={index} value={continent}>{continent}</option>)
                })}
              </Input>
          </Col>

          <Col sm="12" md={4} className="mb-sm-1">
            <Label for="Reset Filters" className="mr-1 mt-2">
              Reset Filters
            </Label>
            <RefreshCw
              style={{ cursor: "pointer" }}
              onClick={resetFilters}
              size={20}
            />
          </Col>
        </Row>

        <Row className="mx-0 mt-1 mb-75 justify-content-between">
          <Col className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1" sm="12" md={4}>
            <Label className="mr-1" for="searchKeyword">
              Search
            </Label>
            <Input
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="searchKeyword"
              onChange={onChangeHandler}
              name="searchKeyword"
            />
          </Col>
        </Row>

        {inProcess ? (
          <Spinner />
        ) : countryListData && countryListData.countries.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Official Name</th>
                <th>Native Name</th>
                <th>Emoji</th>
                <th>Population</th>
                <th>Capital</th>
                <th>ISO 2</th>
                <th>ISO 3</th>
                <th>Currency</th>
                <th>Continent</th>
                <th>Location Coordinates (Point)</th>
                <th>Geoname ID</th>
                <th>Area (SqKm)</th>
                <th>Domain</th>
                <th>Phone Code</th>
                <th>Languages</th>
                <th>Locales</th>
              </tr>
            </thead>
            <tbody>
              {countryListData.countries.map((country) => (
                <tr key={country._id}>
                  <td>
                    <span className="align-middle font-weight-bold">
                      {country._id}
                    </span>
                  </td>
                  <td>{country.name}</td>
                  <td>{country.officialName}</td>
                  <td>{country.nativeName}</td>
                  <td>
                    <ReactCountryFlag
                      countryCode={country.iso2}
                      style={{
                        width: "2em",
                        height: "1.5em",
                      }}
                      svg
                    />
                  </td>
                  <td>{country.population}</td>
                  <td>{country.capital}</td>
                  <td>{country.iso2}</td>
                  <td>{country.iso3}</td>
                  <td>
                    {country.currency && country.currency.name ? country.currency.name : "N/A"}
                  </td>
                  <td>{country.continent}</td>
                  <td>
                    {country.location.coordinates ? country.location.coordinates.join(", ") : "N/A"}
                  </td>
                  <td>{country.geonameId}</td>
                  <td>{country.areaSqKm}</td>
                  <td>{country.domain}</td>
                  <td>{country.phoneCode}</td>
                  <td>{formatLanguageNames(country.languages)}</td>
                  <td>{country.locales.join(", ")}</td>
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
    </Fragment>
  )
}

export default memo(ListCountries)
