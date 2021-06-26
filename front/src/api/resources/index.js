import axios from 'axios'
// import {
//   toObject,
//   sortAlphabetically,
//   sortByUpdate
// } from '../utils'

const

  URL = process.env.VUE_APP_API + '/',

  getAll = () => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'resources')
      .then(response => 
        resolve(
          response
        )
      )
      .catch(error => 
        reject(
          error
        )
      )
    )
  },

  getTicker = () => {
    return new Promise ((resolve, reject) => axios
      .get(URL + 'ticker')
      .then(response => resolve(
        response.data
      ))
      .catch(error => reject(
        error
      ))
    )
  }

export default {
  getTicker,
  getAll
}
