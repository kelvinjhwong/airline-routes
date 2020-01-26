import React, { Component } from 'react';
import './App.css';

import data, { getAirlineById, getAirportByCode } from './data.js';
import Select from './Select.js';
import Table from './Table.js';

class App extends Component {
  state = {
    allAirlines: data.airlines,
    selectedAirlineId: 'all',
    allAirports: data.airports,
    selectedAirportCode: 'all',
    allRoutes: data.routes,
    filteredRoutes: data.routes,
    perPage: 25,
    rowStart: 1,
  };

  onAirlineSelect = (airlineId) => {
    this.setState({
      selectedAirlineId: airlineId,
    });

    this.filterRoutes(airlineId, this.state.selectedAirportCode);
  }

  onAirportSelect = (airportCode) => {
    this.setState({
      selectedAirportCode: airportCode,
    });

    this.filterRoutes(this.state.selectedAirlineId, airportCode);
  }

  filterRoutes(airlineId, airportCode) {
    if (airlineId !== 'all') {
      airlineId = Number(airlineId);
    }

    if (airlineId === 'all' && airportCode === 'all') {
      this.setState({
        filteredRoutes: this.state.allRoutes,
      });
    } else if (airlineId === 'all') {
      this.setState({
        filteredRoutes: this.state.allRoutes.filter((route) => (
          route.src === airportCode
          || route.dest === airportCode
        )),
      });
    } else if (airportCode === 'all') {
      this.setState({
        filteredRoutes: this.state.allRoutes.filter((route) => (
          route.airline === airlineId
        )),
      });
    } else {
      this.setState({
        filteredRoutes: this.state.allRoutes.filter((route) => (
          route.airline === airlineId
          && (route.src === airportCode
              || route.dest === airportCode)
        )),
      });
    }

    this.setState({
      rowStart: 1,
    });
  }

  onShowAllRoutesClick = () => {
    this.setState({
      selectedAirlineId: 'all',
      selectedAirportCode: 'all',
      filteredRoutes: this.state.allRoutes,
    });
  }

  isDisabledAirline = (airline) => {
    return !this.state.filteredRoutes.find((route) => (
      route.airline === airline.id
    ));
  }

  isDisabledAirport = (airport) => {
    return !this.state.filteredRoutes.find((route) => (
      route.src === airport.code || route.dest === airport.code
    ));
  }

  formatValue(property, value) {
    if (property === 'airline') {
      return (
        <td key={property}>
          {getAirlineById(value)}
        </td>
      );
    } else if (property === 'src' || property === 'dest') {
      return (
        <td key={property}>
          {getAirportByCode(value)}
        </td>
      );
    }
  }

  onPrevPageClick = () => {
    if (this.state.rowStart > 1) {
      this.setState({
        rowStart: this.state.rowStart - this.state.perPage,
      });
    }
  }

  onNextPageClick = () => {
    if (this.state.rowStart + this.state.perPage - 1 < this.state.filteredRoutes.length) {
      this.setState({
        rowStart: this.state.rowStart + this.state.perPage,
      });
    }
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Show routes on

            <Select
              options={this.state.allAirlines}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value={this.state.selectedAirlineId}
              onSelect={this.onAirlineSelect}
              isDisabledOption={this.isDisabledAirline}
            />

            flying in or out of

            <Select
              options={this.state.allAirports}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value={this.state.selectedAirportCode}
              onSelect={this.onAirportSelect}
              isDisabledOption={this.isDisabledAirport}
            />

            <button
              onClick={() => this.onShowAllRoutesClick()}
              disabled={this.state.selectedAirlineId === 'all'
                        && this.state.selectedAirportCode === 'all'}
            >
              Show All Routes
            </button>
          </p>

          <Table
            className='routes-table'
            columns={columns}
            rows={this.state.filteredRoutes}
            format={this.formatValue}
            rowStart={this.state.rowStart}
            perPage={this.state.perPage}
            onPrevPageClick={this.onPrevPageClick}
            onNextPageClick={this.onNextPageClick}
          />
        </section>
      </div>
    );
  }
}

export default App;
