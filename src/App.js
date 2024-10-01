import React, { useEffect, useState, useCallback } from 'react';

import './App.css';

import List from './Components/List/List';
import Navbar from './Components/Navbar/Navbar';

function App() {
  const statusList = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
  const userList = ['Anoop sharma', 'Yogesh', 'Shankar Kumar', 'Ramesh', 'Suresh'];
  const priorityList = [
    { name: 'No priority', priority: 0 },
    { name: 'Urgent', priority: 4 },
    { name: 'High', priority: 3 },
    { name: 'Medium', priority: 2 },
    { name: 'Low', priority: 1 },
  ];

  const [groupValue, setGroupValue] = useState(getStateFromLocalStorage() || 'status');
  const [orderValue, setOrderValue] = useState('title');
  const [ticketDetails, setTicketDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const orderDataByValue = useCallback(
    (cardsArray) => {
      const sortedArray = [...cardsArray];

      if (orderValue === 'priority') {
        sortedArray.sort((a, b) => b.priority - a.priority);
      } else if (orderValue === 'title') {
        sortedArray.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        });
      }

      setTicketDetails(sortedArray);
    },
    [orderValue]
  );

  function saveStateToLocalStorage(state) {
    localStorage.setItem('groupValue', JSON.stringify(state));
  }

  function getStateFromLocalStorage() {
    const storedState = localStorage.getItem('groupValue');
    return storedState ? JSON.parse(storedState) : null;
  }

  useEffect(() => {
    saveStateToLocalStorage(groupValue);

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        await refactorData(data);
        console.log(data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    async function refactorData(data) {
      let ticketArray = [];
      if (data && data.tickets && data.users && data.tickets.length > 0 && data.users.length > 0) {
        data.tickets.forEach((ticket) => {
          const user = data.users.find((user) => user.id === ticket.userId);
          if (user) {
            const ticketWithUser = { ...ticket, userObj: user };
            ticketArray.push(ticketWithUser);
          }
        });
      }
      orderDataByValue(ticketArray);
    }

    fetchData();
  }, [orderDataByValue, groupValue]);

  function handleGroupValue(value) {
    setGroupValue(value);
    console.log('Group Value Changed:', value);
  }

  function handleOrderValue(value) {
    setOrderValue(value);
    console.log('Order Value Changed:', value);
  }

  return (
    <div>
      <Navbar
        groupValue={groupValue}
        orderValue={orderValue}
        handleGroupValue={handleGroupValue}
        handleOrderValue={handleOrderValue}
      />
      <section className="board-details">
        <div className="board-details-list">
          {loading && <p>Loading tickets...</p>}
          {error && <p className="error">Error: {error}</p>}
          {!loading && !error && (
            <>
              {groupValue === 'status' &&
                statusList.map((listItem) => (
                  <List
                    key={listItem}
                    groupValue="status"
                    orderValue={orderValue}
                    listTitle={listItem}
                    listIcon=""
                    statusList={statusList}
                    ticketDetails={ticketDetails}
                  />
                ))}

              {groupValue === 'user' &&
                userList.map((listItem) => (
                  <List
                    key={listItem}
                    groupValue="user"
                    orderValue={orderValue}
                    listTitle={listItem}
                    listIcon=""
                    userList={userList}
                    ticketDetails={ticketDetails}
                  />
                ))}

              {groupValue === 'priority' &&
                priorityList.map((listItem) => (
                  <List
                    key={listItem.priority}
                    groupValue="priority"
                    orderValue={orderValue}
                    listTitle={listItem.priority}
                    listIcon=""
                    priorityList={priorityList}
                    ticketDetails={ticketDetails}
                  />
                ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;