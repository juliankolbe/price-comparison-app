import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

require('react-select/dist/react-select.css')
export default class SelectWrapper extends Component {

  static propTypes = {
    options: PropTypes.array,
    arrayIndex: PropTypes.number,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string
  }

  onSelectChange = ({ value, label }) => {
    let id = this.props.arrayIndex
    this.props.onChange(id, value, label)
  }

  render () {
    const { options, value, name, label, placeholder } = this.props
    return (
      <Select
        name={name}
        options={options}
        label={label}
        value={value}
        placeholder={placeholder}
        onChange={this.onSelectChange}
      />
    )
  }
}
