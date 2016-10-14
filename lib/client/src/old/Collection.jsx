const React = require('react')

const Collection = (props) => (
  <div>
    <input type='radio' value={props.id} name='collection' id={`collection${props.id}`} onChange={props.onChange} />
    <label htmlFor={`collection${props.id}`}>{`Collection #${props.id} uploaded with ${props.numberOfLists} supplier lists by User with Id: ${props.userId} on ${props.datedAt}`}</label>
  </div>
)

const {string, number, func} = React.PropTypes

Collection.propTypes = {
  id: number.isRequired,
  userId: number.isRequired,
  createdAt: string.isRequired,
  updatedAt: string.isRequired,
  numberOfLists: number.isRequired,
  datedAt: string.isRequired,
  onChange: func
}

module.exports = Collection
