import React, { Component, PropTypes, } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
// import { asyncConnect } from 'redux-connect'
import { bindActionCreators } from 'redux'

import * as supplierDuck from '../../redux/modules/supplier'
import * as duck from '../../redux/modules/collectionUploadForm'

import DropzoneInput from '../DropzoneInput/DropzoneInput.jsx'
import SelectionComponent from '../SelectionComponent/SelectionComponent.jsx'
import ActionDeleteIconWrapper from '../ActionDeleteIconWrapper/ActionDeleteIconWrapper.jsx'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import DatePicker from 'material-ui/DatePicker'
// import { DatePicker } from 'redux-form-material-ui'
import { Row, Col } from 'react-bootstrap'

const inlineStyles = {
  tableRowColumn: {
    whiteSpace: 'normal',
    overflow: 'visible'
  },
  table: {
    overflowY: 'visible'
  },
  pcDownloadButton: {
    float: 'right'
  },
  circProgress: {
    float: 'right',
    'margin': '0 20px 0 0'
  },
  datePicker: {
    'marginLeft': '10px'
  }
}

// @asyncConnect([{
//   // deferred: true,
//   promise: ({store: {dispatch, getState}}) => {
//     if (!supplierDuck.isLoaded(getState())) {
//       return dispatch(supplierDuck.load())
//     }
//   }
// }])
@connect(
  state => (Object.assign({},
    duck.selector(state.collectionUploadForm),
    supplierDuck.selector(state.supplier)
  )),
  dispatch => bindActionCreators(Object.assign({}, duck, supplierDuck)
    , dispatch)
)
@reduxForm({
  form: 'CollectionUploadForm'
})
export default class CollectionUploadForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getFilesDropped: PropTypes.array.isRequired,
    addFileDropped: PropTypes.func.isRequired,
    removeFileDropped: PropTypes.func.isRequired,
    getSuppliers: PropTypes.array.isRequired,
    // fieldName: PropTypes.string.isRequired,
    upload: PropTypes.func.isRequired,
    store: PropTypes.object,
    isUploading: PropTypes.bool,
    setDatedAt: PropTypes.func,
    getDatedAt: PropTypes.any
  }

  createFileFormData = (data) => {
    let files = this.props.getFilesDropped
    let metaData = {}

    // Create object arraning formdata with its associated files
    let supplierSelects = Object.keys(data).filter((e) => /^supplierForList\d+$/.test(e))
    supplierSelects.forEach((selectKey) => {
      let fileKey = selectKey.match(/(\d+)$/)[1]
      metaData[files[fileKey].name] = {
        supplier: data[selectKey].value
      }
    })
    // Add collection dated at
    metaData['datedAt'] = this.props.getDatedAt
    let body = new FormData()
    // Add all files to the main formData object under the same key
    files.forEach((file) => {
      body.append('csvFiles', file)
    })
    // Transform file associated form data back to JSON and add it to the main formData object
    body.append('data', JSON.stringify(metaData))

    return body
  }

  handleSubmit = (data) => {
    console.log(formData)
    let formData = this.createFileFormData(data)
    this.props.upload(formData)
    console.log(formData)
    // make post request with the returned formdata object to upload/collections
  }

  onFileDropped = (filesToUpload, e) => {
    this.props.addFileDropped(filesToUpload)
  }

  onDateAtChanged = (event, date) => {
    this.props.setDatedAt(date)
  }

  // onRemoveClick = (event) => {
  //   event.preventDefault()
  //   this.props.removeFileDropped(event.target.id)
  // }

  onActionDeleteIconWrapperClick = (id) => {
    this.props.removeFileDropped(id)
  }

  render () {
    const styles = require('./CollectionUploadForm.scss')
    const { handleSubmit, getSuppliers, isUploading, getFilesDropped, getDatedAt } = this.props
    let filesDropped
    let options = {}
    if (getSuppliers) {
      options = getSuppliers.map((supplierDBObj, i) => ({value: supplierDBObj.name, label: supplierDBObj.name}))
    }
    if (getFilesDropped) {
      filesDropped = getFilesDropped.map((file, i) =>
        <TableRow key={i} id={i}>
          <TableRowColumn>
            {file.name}
          </TableRowColumn>
          <TableRowColumn style={inlineStyles.tableRowColumn}>
            <Field component={SelectionComponent} name={`supplierForList${i}`} options={options} label='Supplier' placeholder='Supplier...' />
          </TableRowColumn>
          <TableRowColumn>
            {/* <button id={i} onClick={this.onRemoveClick}>Remove</button>
            <IconButton id={i} onClick={this.onRemoveIconClick}>
              <ActionDeleteIcon />
            </IconButton> */}
            <ActionDeleteIconWrapper onClick={this.onActionDeleteIconWrapperClick} arrayIndex={i} />
          </TableRowColumn>
        </TableRow>
        // {/* <div key={i} className={styles.fileDroppedDiv}>
        //   <div className={styles.fileDroppedDivFileName}>
        //     {file.name}
        //   </div>
        //   <div className={styles.fileDroppedDivSelect}>
        //     <Field component={SelectionComponent} name={`supplierForList${i}`} options={options} label='Supplier' placeholder='Supplier...' />
        //   </div>
        //   <div className={styles.fileDroppedDivRemoveButton}>
        //     <button id={i} onClick={this.onRemoveClick}>Remove</button>
        //   </div>
        // </div> */}
      )
    }
    let baseTableHeight = 20
    let heightPerRow = 50
    let tableHeight = baseTableHeight + getFilesDropped.length * heightPerRow
    let submitable = false
    if (getFilesDropped && getFilesDropped.length > 0) {
      submitable = true
    }
    let uploadState
    if (isUploading) {
      uploadState = <CircularProgress size={40} thickness={5} style={inlineStyles.circProgress} />
    } else {
      uploadState = <RaisedButton type={submitable ? 'submit' : ''} label='Upload' primary={submitable} disabled={!submitable} style={inlineStyles.pcDownloadButton} />
    }
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Row className={styles.topRow}>
          <Col xs={12} md={12} lg={12}>
            <Toolbar>
              <ToolbarGroup>
                <ToolbarTitle text="Collection Upload" />
                <ToolbarSeparator />
                <DatePicker style={inlineStyles.datePicker} hintText={'Dated at...'} container='inline' autoOk value={getDatedAt} onChange={this.onDateAtChanged} id='collectionDatedAt' />
                {/* <Field name='collectionDatedAt' component={DatePicker} style={inlineStyles.datePicker} hintText={'Dated at...'} container='inline' autoOk value={getDatedAt} onChange={this.onDateAtChanged} /> */}
              </ToolbarGroup>
              <ToolbarGroup>
                {uploadState}
                <IconButton>
                  <NavigationExpandMoreIcon />
                </IconButton>
              </ToolbarGroup>
            </Toolbar>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <DropzoneInput name='files' onFileDropped={this.onFileDropped} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <Table
              height={tableHeight + 130 + 'px'}
              // wrapperStyle={{ height: (tableHeight + 66) + 'px' }}
              style={inlineStyles.table}
              selectable={false}
              fixedHeader
              multiSelectable={false}
            >
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn>File name</TableHeaderColumn>
                  <TableHeaderColumn>Supplier</TableHeaderColumn>
                  <TableHeaderColumn>Options</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={false}
                displayRowCheckbox={false}
              >
                {filesDropped}
              </TableBody>
            </Table>
          </Col>
        </Row>
        {/* <Row>
          <Col xs={12} md={12} lg={12}>
            {uploadState}
            <button type="submit">Upload and Save</button>
          </Col>
        </Row> */}
      </form>
    )
  }
}

// FileUpload.propTypes = {
//
// }
