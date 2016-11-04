import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PcDownloadForm from './PcDownloadForm'

const muiWrapper = () => (
  <MuiThemeProvider>
    <PcDownloadForm />
  </MuiThemeProvider>
)

export default muiWrapper
