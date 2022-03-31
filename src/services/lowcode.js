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

export function getAllProject() {
  return lowcodeServer
    .request({
      method: 'GET',
      url: '',
      params: {},
    })
    .then((res) => res.data)
}

export function createProject(data) {
  return lowcodeServer
    .request({
      method: 'POST',
      url: '',
      data: data,
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.data)
}

export function updateProject(data) {
  return lowcodeServer
    .request({
      method: 'POST',
      url: `${data.id}`,
      data: data,
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.data)
}

export function deleteProject(id) {
  return lowcodeServer
    .request({
      method: 'DELETE',
      url: `${id}`,
    })
    .then((res) => res.data)
}
