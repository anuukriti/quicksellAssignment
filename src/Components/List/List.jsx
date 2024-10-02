import React, { useMemo } from 'react';
import './List.css';
import Card from '../Card/Card';

import Backlog from '../../Assets/Images/Backlog.svg';
import Cancelled from '../../Assets/Images/Cancelled.svg';
import To_do from '../../Assets/Images/To-do.svg';
import inProgress from '../../Assets/Images/in-progress.svg';
import Done from '../../Assets/Images/Done.svg';

import high_Priority from '../../Assets/Images/high_Priority.svg';
import low_Priority from '../../Assets/Images/low_Priority.svg';
import medium_Priority from '../../Assets/Images/medium_Priority.svg';
import no_Priority from '../../Assets/Images/no_priority.svg';
import urgent_Priority from '../../Assets/Images/urgent_Priority.svg';

import add from '../../Assets/Images/add.svg';

const statusIcons = {
  'Backlog': Backlog,
  'Todo': To_do,
  'In progress': inProgress,
  'Done': Done,
  'Cancelled': Cancelled
};

const priorityIcons = {
  0: no_Priority,
  1: low_Priority,
  2: medium_Priority,
  3: high_Priority,
  4: urgent_Priority
};

export default function List({ groupValue, listTitle, priorityList, ticketDetails }) {

  const filteredTickets = useMemo(() => {
    return ticketDetails.filter(ticket => {
      if (groupValue === 'status') return ticket.status === listTitle;
      if (groupValue === 'priority') return ticket.priority === listTitle;
      if (groupValue === 'user') return ticket.userObj.name === listTitle;
      return false;
    });
  }, [groupValue, listTitle, ticketDetails]);

  const cardCount = filteredTickets.length;

  const renderIcon = () => {
    if (groupValue === 'status') return <img src={statusIcons[listTitle]} alt="status" />;
    if (groupValue === 'priority') return <img src={priorityIcons[listTitle]} alt="priority" />;
    return null; 
  };

  const renderTitle = () => {
    if (groupValue === 'priority' && priorityList) {
      const priorityObj = priorityList.find(p => p.priority === listTitle);
      return priorityObj ? priorityObj.name : listTitle;
    }
    return listTitle;
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="list-header-left">
          <div className="list-icon">{renderIcon()}</div>
          <div className="list-title">{renderTitle()}</div>
          <div className="list-sum">{cardCount}</div>
        </div>
        <div className="list-header-right">
          <div className="list-add-item">
            <img src={add} alt="add" />
          </div>
        </div>
      </div>

      <div className="list-card-items">
        {filteredTickets.map((ticket, index) => (
          <Card key={index} cardDetails={ticket} />
        ))}
      </div>
    </div>
  );
}
