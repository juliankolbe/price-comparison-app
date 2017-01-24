import React, { Component, PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import NavigationCheckIcon from 'material-ui/svg-icons/navigation/check'
import NavigationCloseIcon from 'material-ui/svg-icons/navigation/close'
import ContentRemoveIcon from 'material-ui/svg-icons/content/remove'
import { red500, green500, grey500 } from 'material-ui/styles/colors'

export default class StatusSymbol extends Component {
  static propTypes = {
    file: PropTypes.object
  }

  render () {
    const { statsObj, uploaded, errors = [] } = this.props.file
    const errorList = errors.length > 0 ? <ul style={{ margin: 0, padding: '2px 0 2px 15px' }}>{errors.map(error => <li>{error}</li>)}</ul> : 'No errors listed, should be though'
    if (uploaded) {
      if (statsObj && statsObj.errorReport) {
        return (
          <IconButton tooltip={errorList} tooltipPosition='top-right' tooltipStyles={{ 'top': 15, marginLeft: '27px' }} disableTouchRipple hoveredStyle={{ cursor: 'default' }} style={{ cursor: 'default' }}>
            <NavigationCloseIcon color={red500} />
          </IconButton>
        )
      } else {
        return (
          <IconButton tooltip='No errors' tooltipPosition='top-right' tooltipStyles={{ 'top': 15 }} disableTouchRipple hoveredStyle={{ cursor: 'default' }} style={{ cursor: 'default' }}>
            <NavigationCheckIcon color={green500} />
          </IconButton>
        )
      }
    } else {
      return (
        <IconButton tooltip='Not uploaded yet' tooltipPosition='top-right' tooltipStyles={{ 'top': 15 }} disableTouchRipple hoveredStyle={{ cursor: 'default' }} style={{ cursor: 'default' }}>
          <ContentRemoveIcon color={grey500} />
        </IconButton>
      )
    }
  }
}
