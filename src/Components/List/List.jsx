import React from 'react'

import './List.css'
import Card from '../Card/Card'

import Backlog from '../../Assets/Images/Backlog.svg'
import Cancelled from '../../Assets/Images/Cancelled.svg'
import To_do from '../../Assets/Images/To-do.svg'
import inProgress from '../../Assets/Images/in-progress.svg'
import Done from '../../Assets/Images/Done.svg'

import high_Priority from '../../Assets/Images/high_Priority.svg'
import low_Priority from '../../Assets/Images/low_Priority.svg'
import medium_Priority from '../../Assets/Images/medium_Priority.svg'
import no_Priority from '../../Assets/Images/no_priority.svg'
import urgent_Priority from '../../Assets/Images/urgent_Priority.svg'
// import urgent_Priority_grey from '../../Assets/Images/urgent_Priority_grey.svg'

import add from '../../Assets/Images/add.svg'

let cardCount = 0;

export default function List(props) {
  return (
    <>
        <div className="list-container">
            <div className="list-header">
                <div className="list-header-left">
                    {
                        {
                            'status' : <>{
                                {
                                    'Backlog': <div className="list-icon">
                                    <img src={Backlog} alt='status'/>
                                    </div>,
                                    'Todo': <div className="list-icon">
                                    <img src={To_do} alt='status'/>
                                    </div>,
                                    'In progress': <div className="list-icon">
                                    <img src={inProgress} alt='status'/>
                                    </div>,
                                    'Done': <div className="list-icon">
                                    <img src={Done} alt='status'/>
                                    </div>,
                                    'Cancelled': <div className="list-icon">
                                    <img src={Cancelled} alt='status'/>
                                    </div>
                                }[props.listTitle]
                            } </>,
                            'user': <></>,
                            'priority' : <>{
                                {
                                    0: <div className="card-tag-icon"><img src={no_Priority} alt='tag'/></div>,
                                    1: <div className="card-tag-icon"><img src={low_Priority} alt='tag'/></div>,
                                    2: <div className="card-tag-icon"><img src={medium_Priority} alt='tag'/></div>,
                                    3: <div className="card-tag-icon"><img src={high_Priority} alt='tag'/></div>,
                                    4: <div className="card-tag-icon"><img src={urgent_Priority} alt='tag'/></div>
                                }[props.listTitle]
                            } </>
                        }[props.groupValue]
                    }
                    
                    <div className="list-title">
                        {
                            {
                                'priority' : <>{
                                                props.priorityList
                                                    ? props.priorityList.map(priorityProperty => (
                                                        priorityProperty.priority === props.listTitle
                                                        ? <>{priorityProperty.name}</>
                                                        : null
                                                    ))
                                                    : null
                                                }</>,
                                'status' : <>{props.listTitle}</>,
                                'user' : <>{props.listTitle}</>
                            }[props.groupValue]
                        }
                    </div>
                    <div className="list-sum">{cardCount}</div>
                </div>
                <div className="list-header-right">
                    <div className="list-add-item">
                    <img src={add} alt='tag'/>
                    </div>
                </div>
            </div>

            <div className="list-card-items">
                {
                    props.ticketDetails.map(ticket => {
                        if(ticket.status === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} />)
                        }
                        else if(ticket.priority === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} />)
                        }
                        else if(ticket.userObj.name === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} />)
                        }
                        return null
                    }, cardCount = 0)
                    
                }
            </div>
        </div>
    </>
  )
}