import axios from 'axios'
import browserDownload from '../helpers/browserDownload'
import * as auth from '../modules/auth'

function getApiUrl () {
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + 'localhost' + ':' + '3000' + '/api'
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return 'http://' + 'localhost' + ':' + '8080' + '/api'
}

export default function clientMiddleware (client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }

      const { promise, types, browserDownloadSettings, useAxios, ...rest } = action // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action)
      }
      const [REQUEST, SUCCESS, FAILURE] = types
      next({...rest, type: REQUEST})
      // If useAxios is set to false, use superagent, else use Axios http client
      if (!useAxios) {
        const actionPromise = promise(client)
        actionPromise.then(
          ({ body, header }) => {
            // Replace current active access token with new token with extended expiry date
            if (header.token) {
              dispatch(auth.saveTokenToCookie(header.token))
              dispatch(auth.setLoggedIn())
            }
            return next({...rest, result: body, type: SUCCESS})
          },
          (error) => {
            // if request was unauthorized
            if (error.status === 401) {
              // Remove expired token if present
              dispatch(auth.unsetToken())
              // Logout if logged in (should redirect to log in page)
              if (getState().auth.loggedIn) {
                dispatch(auth.setLoggedOut())
              }
            }
            return next({...rest, error, type: FAILURE})
          }
        ).catch((error) => {
          console.error('MIDDLEWARE ERROR:', error)
          next({...rest, error, type: FAILURE})
        })

        return actionPromise
      } else {
        let axiosClient
        if (window.localStorage.token) {
          axiosClient = axios.create({
            baseURL: getApiUrl(),
            headers: {'Authorization': window.localStorage.token}
          })
        } else {
          axiosClient = axios.create({
            baseURL: getApiUrl()
          })
        }
        const axiosPromise = promise(axiosClient)
        axiosPromise
        .then(result => {
          next({...rest, result, type: SUCCESS})
          if (browserDownloadSettings && browserDownloadSettings.filename && __CLIENT__) {
            browserDownload(result.data, browserDownloadSettings.filename)
          }
        })
        .catch(error => {
          next({...rest, error, type: FAILURE})
        })
      }
    }
  }
}
