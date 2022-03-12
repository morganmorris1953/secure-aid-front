import helpers from '../helpers/helpers'
const BASE_URL = "http://127.0.0.1:8000/ticket_api/tickets/"

const tryCatchFetch = async (url, init) => {
  try {
    const response = await fetch(url, init)
    if (response.ok && response.status !==204) {
      let data = await response.json()
      return data
    }
    else if (response.ok){
      return response
    }
    else {
      throw new Error(`Bad response: ${response.status} ${response.statusText}`)
    }
  }
  catch (e) {
    console.error(e)
    return null
  }
}

const getTickets = async (token) => {
  const url = BASE_URL 
  const init = {headers: {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`
  }}
  return await tryCatchFetch(url, init)
}

const getMyTickets = async (user_id, group, token) => {
  const groups = {
    1: "sponsor_id",
    2: "aid_recipient_id",
    3: "aid_provider_id"
  }
  const url = BASE_URL+`?${groups[group]}=${user_id}`
  const init = {headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    }
  }
  return await tryCatchFetch(url, init)
}

const fetchTicketByID = async (ticketID, token) => {
  const url = BASE_URL + `${ticketID}/`
  const init = {headers: {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`
  }}
  return await tryCatchFetch(url, init)
}

const addTicket = async (ticketObj, token) => {
  const url = BASE_URL
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${token}`
    },
    body: JSON.stringify(ticketObj)
  }
  return await tryCatchFetch(url, init)
}

const updateTicket = async (ticketObj, id, token) => {
  const url = BASE_URL + `${id}/`
  const init = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${token}`
    },
    body: JSON.stringify(ticketObj)
  }
  return await tryCatchFetch(url, init)
}

const deleteTicket = async (id, token) => {
  const url = BASE_URL + `${id}/`
  const init = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${token}`
    }
  }
  return await tryCatchFetch(url, init)
}

const assignProvider = async (ticketID, providerID, token) =>{
  const url = BASE_URL + `${ticketID}/`
  const init = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${token}`
    },
    body: JSON.stringify({aid_provider_id:providerID,status:"In-Progress"})
  }
  return await tryCatchFetch(url, init)
}

const completeTicket= async (ticketID, token) =>{
  const url = BASE_URL + `${ticketID}/`
  const init = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${token}`
    },
    body: JSON.stringify({status:"Complete"})
  }
  return await tryCatchFetch(url, init)
}

const fetchAidRecipIDs = async (sponsorID, token) => {
  const url = `http://localhost:8000/api/user/recipients?sponsor_id=${sponsorID}`
  const init = {headers: {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`
  }}
  return await tryCatchFetch(url, init)
}

const fetchUserName = async (userID, token) => {
  const url = `http://localhost:8000/api/user?user_id=${userID}`
  const init = {headers: {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`
  }}
  return await tryCatchFetch(url, init)
}

const exportItems = {
  getTickets,
  fetchTicketByID,
  addTicket,
  updateTicket,
  deleteTicket,
  getMyTickets,
  fetchAidRecipIDs,
  assignProvider,
  completeTicket,
  fetchUserName,
}

export default exportItems;