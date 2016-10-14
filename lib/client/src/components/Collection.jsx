import React from 'react'

const Collection = ({id, onChange, numberOfLists, userId, datedAt}) => (
  <div>
    <input type='radio' value={id} name='collection' id={`collection${id}`} onChange={onChange} />
    <label htmlFor={`collection${id}`}>{`Collection #${id} uploaded with ${numberOfLists} supplier lists by User with Id: ${userId} on ${datedAt}`}</label>
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

export default Collection
