import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <div>
        <table className={this.props.className}>
          <thead>
            <tr>
              {this.props.columns.map((column) => (
                <th key={column.name}>{column.name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {this.props.rows.slice(
              this.props.rowStart - 1,
              this.props.rowStart + this.props.perPage - 1,
            ).map((row, index) => (
              <tr key={index}>
                {this.props.columns.map((column) => (
                  this.props.format(column.property, row[column.property])
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className='pagination'>
          <p>
            Showing {this.props.rowStart}-{Math.min(
              this.props.rowStart + this.props.perPage - 1,
              this.props.rows.length,
            )} of {this.props.rows.length} routes.
          </p>

          <p>
            <button
              type='button'
              onClick={() => this.props.onPrevPageClick()}
              disabled={this.props.rowStart <= 1}
            >
              Previous Page
            </button>

            <button
              type='button'
              onClick={() => this.props.onNextPageClick()}
              disabled={this.props.rowStart + this.props.perPage - 1 >= this.props.rows.length}
            >
              Next Page
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Table;
