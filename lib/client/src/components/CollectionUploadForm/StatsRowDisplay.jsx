import React, { PropTypes } from 'react'

const validStyle = {
  color: '#42E264',
  'fontWeight': 'bold'
}

const invalidStyle = {
  color: '#FF0033',
  'fontWeight': 'bold'
}

const StatsRowDisplay = ({file, isUploadSuccess}) => {
  if (file.statsObj && !isUploadSuccess) {
    const { validProducts, invalidProducts } = file.statsObj
    return (
      <div>
        <div>Valid Products: <span style={validStyle}>{validProducts}</span></div>
        <div>Invalid Products: <span style={invalidStyle}>{invalidProducts}</span></div>
      </div>
    )
  } else {
    return (
      <div>-</div>
    )
  }
}

StatsRowDisplay.propTypes = {
  file: PropTypes.object,
  isUploadSuccess: PropTypes.bool
}

export default StatsRowDisplay
