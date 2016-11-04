import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as duck from '../../redux/modules/pcDownloadForm'
// import axios from 'axios'

import { Row, Col } from 'react-bootstrap'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

const inlineStyles = {
  pcDownloadButton: {
    float: 'right'
  },
  circProgress: {
    float: 'right',
    'margin': '0 20px 0 0'
  }
}

// import { asyncConnect } from 'redux-connect'

// @asyncConnect([{
//   // deferred: true,
//   promise: ({store: {dispatch, getState}}) => {
//     if (!duck.isLoaded(getState())) {
//       return dispatch(duck.loadCollections())
//     }
//   }
// }])
@connect(
  state => (Object.assign({},
    duck.selector(state.pcDownloadForm)
  )),
  dispatch => bindActionCreators(Object.assign({}, duck)
    , dispatch)
)
@reduxForm({
  form: 'PcDownloadForm'
})
export default class PcDownloadForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    store: PropTypes.object,
    getCollections: PropTypes.array,
    setCollectionSelected: PropTypes.func,
    unSetCollectionSelected: PropTypes.func,
    getCollectionSelected: PropTypes.any,
    downloadPc: PropTypes.func,
    hasDownloaded: PropTypes.bool,
    getDownloadedFileData: PropTypes.string,
    resetHasDownloaded: PropTypes.func,
    isDownloading: PropTypes.bool
  }

  handleSubmit = (data) => {
    let collectionId = this.props.getCollectionSelected
    if (!isNaN(collectionId)) {
      this.props.downloadPc(collectionId)
    }
  }

  onRowSelected = (rowIndexArray) => {
    if (rowIndexArray.length === 1) {
      let collectionId = this.props.getCollections[rowIndexArray[0]].id
      console.log(collectionId)
      this.props.setCollectionSelected(collectionId)
    } else if (!rowIndexArray || rowIndexArray.length === 0) {
      this.props.unSetCollectionSelected()
    }
  }

  render () {
    const styles = require('./PcDownloadForm.scss')
    const { handleSubmit, getCollections, getCollectionSelected, isDownloading } = this.props
    let submitable = false
    if (getCollectionSelected) {
      submitable = true
    }
    let collectionRows
    if (getCollections) {
      collectionRows = getCollections.map((collection, i) =>
        <TableRow key={i} selected={getCollectionSelected && getCollectionSelected === collection.id}>
          <TableRowColumn>{collection.id}</TableRowColumn>
          <TableRowColumn>{collection.numberOfLists}</TableRowColumn>
          <TableRowColumn>{collection.userId}</TableRowColumn>
          <TableRowColumn>{collection.datedAt}</TableRowColumn>
          <TableRowColumn>{collection.createdAt}</TableRowColumn>
        </TableRow>
      )
    }
    let downloadState
    if (isDownloading) {
      downloadState = <CircularProgress size={40} thickness={5} style={inlineStyles.circProgress} />
    } else {
      downloadState = <RaisedButton type={submitable ? 'submit' : ''} label='Download' primary={submitable} disabled={!submitable} style={inlineStyles.pcDownloadButton} />
    }
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Row className={styles.topRow}>
          <Col xs={12} md={12} lg={12}>
            <Toolbar>
              <ToolbarGroup>
                <ToolbarTitle text="Collections" />
                <ToolbarSeparator />
              </ToolbarGroup>
              <ToolbarGroup>
                <IconButton>
                  <NavigationExpandMoreIcon />
                </IconButton>
              </ToolbarGroup>
            </Toolbar>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <Table
              height={'150px'}
              selectable
              fixedHeader
              multiSelectable={false}
              onRowSelection={this.onRowSelected}
            >
              <TableHeader
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn>Id</TableHeaderColumn>
                  <TableHeaderColumn>Number of Lists</TableHeaderColumn>
                  <TableHeaderColumn>By User</TableHeaderColumn>
                  <TableHeaderColumn>Dated at</TableHeaderColumn>
                  <TableHeaderColumn>Uploaded on</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={false}
              >
                {collectionRows}
              </TableBody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} lg={12}>
            {downloadState}
          </Col>
        </Row>
      </form>
    )
  }
}
