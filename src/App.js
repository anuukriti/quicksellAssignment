import React, { useEffect, useState, useCallback, useMemo } from 'react';
import './App.css';
import List from './Components/List/List';
import Navbar from './Components/Navbar/Navbar';

const STATUS_LIST = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
const USER_LIST = ['Anoop sharma', 'Yogesh', 'Shankar Kumar', 'Ramesh', 'Suresh'];
const PRIORITY_LIST = [
  { name: 'No priority', priority: 0 },
  { name: 'Low', priority: 1 },
  { name: 'Medium', priority: 2 },
  { name: 'High', priority: 3 },
  { name: 'Urgent', priority: 4 },
];

const LOCAL_STORAGE_KEY = 'groupValue';

function App() {
  const [groupValue, setGroupValue] = useState(() => 
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || 'status'
  );
  const [orderValue, setOrderValue] = useState('title');
  const [ticketDetails, setTicketDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // order
  const orderDataByValue = useCallback((cardsArray) => {
    return [...cardsArray].sort((a, b) => {
      if (orderValue === 'priority') return b.priority - a.priority;
      if (orderValue === 'title') {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      return 0;
    });
  }, [orderValue]);

  // Fetching
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(groupValue));

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const ticketArray = data.tickets
          .map(ticket => ({
            ...ticket,
            userObj: data.users.find(user => user.id === ticket.userId),
          }))
          .filter(ticket => ticket.userObj);
        
        setTicketDetails(orderDataByValue(ticketArray));
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupValue, orderDataByValue]);

  const handleGroupValue = useCallback((value) => {
    setGroupValue(value);
  }, []);

  const handleOrderValue = useCallback((value) => {
    setOrderValue(value);
  }, []);

  // Render list items
  const renderLists = useMemo(() => {
    if (loading) return <p>Loading tickets...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    const listMap = {
      status: STATUS_LIST,
      user: USER_LIST,
      priority: PRIORITY_LIST.map(item => item.priority),
    };

    return listMap[groupValue]?.map((listItem) => (
      <List
        key={listItem}
        groupValue={groupValue}
        orderValue={orderValue}
        listTitle={listItem}
        priorityList={PRIORITY_LIST}
        ticketDetails={ticketDetails}
      />
    ));
  }, [groupValue, orderValue, ticketDetails, loading, error]);

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
          {renderLists}
        </div>
      </section>
    </div>
  );
}

export default App;
