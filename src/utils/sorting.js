const priorityMap = {
  0: "No priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent"
};

const groupTickets = (tickets, users, groupBy) => {
  // First, map userId to user name for easier grouping by user
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  // Grouping logic
  const grouped = tickets.reduce((acc, ticket) => {
    let groupKey;

    if (groupBy === "status") {
      groupKey = ticket.status; // Group by status ("Todo", "In progress", "Done", "Cancelled", "Backlog")
    } else if (groupBy === "user") {
      groupKey = userMap[ticket.userId]; // Group by user name (map userId to name)
    } else if (groupBy === "priority") {
      groupKey = priorityMap[ticket.priority]; // Group by priority (0 to 4)
    }

    // Initialize the group if it doesn't exist
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    // Add ticket to the group
    acc[groupKey].push(ticket);

    return acc;
  }, {});

  
  //if any column is missing, add an empty array to it so that the column is displayed
  if (groupBy === 'status' && !grouped["Cancelled"]) {
    grouped["Cancelled"] = [];
  }
  if (groupBy === 'status' &&!grouped["Done"]) {
    grouped["Done"] = [];
  }
  if (groupBy === 'status' &&!grouped["In progress"]) {
    grouped["In progress"] = [];
  }
  if (groupBy === 'status' &&!grouped["Todo"]) {
    grouped["Todo"] = [];
  }
  if (groupBy === 'status' &&!grouped["Backlog"]) {
    grouped["Backlog"] = [];
  }
  
  return grouped;
};

const sortTickets = (groupedTickets, sortBy) => {
  const sortedGroups = {};

  // Loop through each group
  for (const groupKey in groupedTickets) {
    const ticketsInGroup = groupedTickets[groupKey];

    // Sort by priority or title
    if (sortBy === "priority") {
      ticketsInGroup.sort((a, b) => b.priority - a.priority); // Descending priority
    } else if (sortBy === "title") {
      ticketsInGroup.sort((a, b) => a.title.localeCompare(b.title)); // Ascending title
    }

    // Store the sorted group
    sortedGroups[groupKey] = ticketsInGroup;
  }

  return sortedGroups;
};

export { groupTickets, sortTickets };
