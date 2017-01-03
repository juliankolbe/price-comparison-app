import React, { Component, PropTypes } from 'react'
import ActionDeleteIcon from 'material-ui/svg-icons/action/delete-forever'
import IconButton from 'material-ui/IconButton'
import { red500 } from 'material-ui/styles/colors'

export default class ActionDeleteIconWrapper extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    arrayIndex: PropTypes.any
  }

  onRemoveIconClick = () => {
    let index = this.props.arrayIndex
    this.props.onClick(index)
  }

  render () {
    return (
      <IconButton onClick={this.onRemoveIconClick} tooltip='Remove file' tooltipPosition='top-right' tooltipStyles={{ 'top': 17 }}>
        <ActionDeleteIcon color={red500} />
      </IconButton>
    )
  }
}
