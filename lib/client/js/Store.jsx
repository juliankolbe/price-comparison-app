const redux = require('redux')
const reactRedux = require('react-redux')

const SET_COLLECTIONS = 'setCollections'
const SET_COLLECTION_SELECTED = 'setCollectionSelected'
const initialState = {
  collections: [],
  collectionSelected: undefined
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLLECTIONS:
      return reduceCollections(state, action)
    case SET_COLLECTION_SELECTED:
      return reduceCollectionSelected(state, action)
    default:
      return state
  }
}

const reduceCollectionSelected = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {collectionSelected: action.value})
  return newState
}

const reduceCollections = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {collections: action.value})
  return newState
}

const store = redux.createStore(rootReducer, initialState, redux.compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))

const mapStateToProps = (state) => {
  return {
    collections: state.collections,
    collectionSelected: state.collectionSelected
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCollections (collections) {
    dispatch({type: SET_COLLECTIONS, value: collections})
  },
  setCollectionSelected (collectionId) {
    dispatch({type: SET_COLLECTION_SELECTED, value: collectionId})
  }
})

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store, rootReducer }
