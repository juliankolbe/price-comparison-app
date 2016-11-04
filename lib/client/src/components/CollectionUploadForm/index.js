import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CollectionUploadForm from './CollectionUploadForm'

const muiWrapper = () => (
  <MuiThemeProvider>
    <CollectionUploadForm />
  </MuiThemeProvider>
)

export default muiWrapper
