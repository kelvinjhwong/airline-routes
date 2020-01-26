import React, { Component } from 'react';

class Select extends Component {
  render() {
    return (
      <select
        value={this.props.value}
        onChange={(e) => {
          let selectedValue = e.target.value;

          this.props.onSelect(selectedValue);
        }}
      >
        <option value='all'>{this.props.allTitle}</option>

        {this.props.options.map((option) => (
          <option
            key={option[this.props.valueKey]}
            value={option[this.props.valueKey]}
            disabled={this.props.isDisabledOption(option)}
          >
            {option[this.props.titleKey]}
          </option>
        ))}
      </select>
    );
  }
}

export default Select;
