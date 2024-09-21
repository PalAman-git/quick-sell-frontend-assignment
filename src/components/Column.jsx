import Avatar from "react-avatar";

const priorityIcons = {
  Low: "/low.svg",
  Medium: "/medium.svg",
  High: "/high.svg",
  "No priority": "No-priority.svg",
  Urgent: "/urgentPriorityColor.svg"
}

const priorityIconsInNumbers = {
  1: "/low.svg",
  2: "/medium.svg",
  3: "/high.svg",
  0: "No-priority.svg",
  4: "/urgentPriorityGrey.svg"
}

const statusIcons = {
  Backlog:'/Backlog.svg',
  Todo:'To-do.svg',
  "In progress" : "in-progress.svg",
  Done : 'Done.svg',
  Cancelled : 'Cancelled.svg'
}


const Column = ({ group, users, groupBy, tickets }) => {
  
  return (
    <div className="kanban-column">
      <div className="column-header">
        <h3 className="column-header-left">
          {groupBy === "user" ? (
            <Avatar className="avatar" name={group} size="30" round={true} />
          ) : null}
          {
            groupBy === "priority" ? (<img className="priority-icon" src={priorityIcons[group]}/>) : null
          }
          {
            groupBy === "status" ? (<img className="status-icon" src={statusIcons[group]}/>) : null
          }
          {group}
          <div className="ticket-count">{tickets.length}</div>
        </h3>
        <div className="column-header-right">
            <img className="icon" src="/add.svg"/>
            <img className="icon" src="/menu.svg"/>
        </div>
      </div>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} groupBy={groupBy} ticket={ticket} />
      ))}
    </div>
  );
};

const TicketCard = ({ ticket, groupBy }) => {

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h5 className="ticket-card-id">{ticket.id}</h5>
        {groupBy !== "user" && (
          <div className="ticket-header-avatar">
            <Avatar name={"Aman Pal"} size={30} round={true} />
          </div>
        )}
      </div>
      <h4 className="ticket-card-title">{groupBy !== 'status' ? <img className="ticket-card-status-icon" src={statusIcons[ticket.status]} /> : null}{ticket.title}</h4>
      <div className="ticket-tags">
        {
          ticket.tag.map((tag) => {
            return <div className="tag"><img src={groupBy !== 'priority' ?priorityIconsInNumbers[ticket.priority]:'/blackdot.svg'}/>{tag}</div>
          })
        }
      </div>
    </div>
  );
};

export default Column;
