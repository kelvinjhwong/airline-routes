import React, { Component } from 'react';

class Routes extends Component {
  render() {
    return (
      <table className='routes-table'>
        <thead>
          <tr>
            <th>Airline</th>
            <th>Source Airport</th>
            <th>Destination Airport</th>
          </tr>
        </thead>

        <tbody>
          {this.props.routes.map((route) => (
            <tr>
              <td>{route.airline}</td>
              <td>{route.src}</td>
              <td>{route.dest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Routes;
