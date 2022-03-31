import axios from 'axios'

const lowcodeServer = axios.create({
  baseURL: `http://localhost:4000/project`,
  withCredentials: true,
})

export function apiGetProject(id) {
  return lowcodeServer
    .request({
      method: 'GET',
      url: `${id}`,
      params: {},
    })
    .then((res) => res.data)
}
