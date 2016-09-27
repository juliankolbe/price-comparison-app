const React = require('react')

const Supplier = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.created_at}</td>
    <td>{props.updated_at}</td>
  </tr>
)

const {string, number, any} = React.PropTypes

Supplier.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  created_at: any,
  updated_at: any
}

module.exports = Supplier
