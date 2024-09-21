import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { groupTickets, sortTickets } from "./utils/sorting";
import Column from "./components/Column";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");
  const [isOpen, setIsOpen] = useState(true);

  const toggleDisplay = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    //fetching data for tickets
    const fetchTickets = async () => {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.data;
      setTickets(data.tickets);
      setUsers(data.users);
    };
    fetchTickets();

    //loading the saved group and sort values from the local storage
    const savedGroup = localStorage.getItem("kanbanGroup") || "status";
    const savedSort = localStorage.getItem("kanbanSort") || "priority";
    setGroupBy(savedGroup);
    setSortBy(savedSort);
  }, []);

  const handleGroupOnChange = (e) => {
    setGroupBy(e.target.value);
    localStorage.setItem("kanbanGroup", e.target.value); //saving the group value to local storage
  };

  const handleSortOnChange = (e) => {
    setSortBy(e.target.value);
    localStorage.setItem("kanbanSort", e.target.value); //saving the sort value to local storage
  };

  const groupedTickets = groupTickets(tickets, users, groupBy);
  const sortedTickets = sortTickets(groupedTickets, sortBy);

  return (
    <>
      <div className="display-container" onClick={toggleDisplay}>
        <img src="/display.svg" />{" "}
        <span className="display-title">Display</span> <img src="./down.svg" className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
      </div>

      {isOpen && (
        <div className="labels">
          <label className="group-by-label">
            Grouping
            <select value={groupBy || ""} onChange={handleGroupOnChange}>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="user">User</option>
            </select>
          </label>

          <label className="sort-by-label">
           Ordering
            <select value={sortBy || ""} onChange={handleSortOnChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
      )}

      <div className="column-container">
        {Object.keys(sortedTickets).map((group) => (
          <Column
            key={group}
            group={group}
            groupBy={groupBy}
            users={users}
            tickets={sortedTickets[group]}
          />
        ))}
      </div>
    </>
  );
}

export default App;
