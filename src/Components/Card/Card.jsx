import React from 'react'

import './Card.css'
import high_Priority from '../../Assets/Images/high_Priority.svg'
import low_Priority from '../../Assets/Images/low_Priority.svg'
import medium_Priority from '../../Assets/Images/medium_Priority.svg'
import no_Priority from '../../Assets/Images/no_priority.svg'
// import urgent_Priority from '../../Assets/Images/urgent_Priority.svg'
import urgent_Priority_grey from '../../Assets/Images/urgent_Priority_grey.svg'

export default function Card(props) {
  return (
    <>
        <div className="card-container">
            <div className="card-id-wrapper">
                <div className="card-id">{props.cardDetails.id}</div>
                <div className="card-profile">
                    <div className="card-profile-initial">
                    {props.cardDetails.userObj.name[0]}{props.cardDetails.userObj.name[1]}
                    </div>
                    <div className={props.cardDetails.userObj.available ?"card-profile-initial-available card-profile-initial-available-true" : "card-profile-initial-available"}></div>
                </div>
            </div>
            <div className="card-title">
                {props.cardDetails.title}
            </div>
            <div className="card-tag">
                {
                    {
                        0: <div className="card-tag-icon"><img src={no_Priority} alt='tag'/></div>,
                        1: <div className="card-tag-icon"><img src={low_Priority} alt='tag'/></div>,
                        2: <div className="card-tag-icon"><img src={medium_Priority} alt='tag'/></div>,
                        3: <div className="card-tag-icon"><img src={high_Priority} alt='tag'/></div>,
                        4: <div className="card-tag-icon"><img src={urgent_Priority_grey} alt='tag'/></div>
                    }[props.cardDetails.priority]
                }

                {
                    props.cardDetails.tag.map((tag) => {
                        return(
                            <div className="card-tag-box">
                                <div className="card-tag-title">{tag}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}