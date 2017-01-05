import React, { Component, PropTypes } from 'react'
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download'
import IconButton from 'material-ui/IconButton'
import { red500 } from 'material-ui/styles/colors'

export default class DownloadErrorReportButton extends Component {
  static propTypes = {
    file: PropTypes.object,
    onClick: PropTypes.func
  }

  onDownloadClick = () => {
    const { statsObj, name } = this.props.file
    if (statsObj && statsObj.errorReport) {
      this.props.onClick(statsObj.errorReport, name)
    }
  }

  render () {
    const { statsObj } = this.props.file
    if (statsObj && statsObj.errorReport) {
      return (
        <IconButton onClick={this.onDownloadClick} tooltip='Download Error Report' tooltipPosition='top-right' tooltipStyles={{ 'top': 15 }}>
          <FileDownloadIcon color={red500} />
        </IconButton>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}
