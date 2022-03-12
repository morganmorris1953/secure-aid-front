import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"

function TicketList(props) {
  // render
  const renderTickets = () => {
    if (props.tickets==undefined)
      return null

    return props.tickets.map((ticket, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td><Link to={`/tickets/${ticket.id}/`}>{ticket.title}</Link></td>
        </tr>
      )
    })
  }

  return (
    <div>
      <div className="tickets-list-div">
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
            { renderTickets() }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default TicketList