import React, {PropTypes} from 'react'
import Select from 'react-select'

require('react-select/dist/react-select.css')
const SelectionComponent = ({input, options, placeholder}) => {
  const blurFunction = function () { return input.onBlur(input.value) }
  return (
    <Select
      options={options}
      {...input}
      onBlur={blurFunction}
      placeholder={placeholder}
    />
  )
}

SelectionComponent.propTypes = {
  options: PropTypes.array,
  input: PropTypes.object,
  placeholder: PropTypes.string
}

export default SelectionComponent
