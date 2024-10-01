import React from 'react';

import './Card.css';
import high_Priority from '../../Assets/Images/high_Priority.svg';
import low_Priority from '../../Assets/Images/low_Priority.svg';
import medium_Priority from '../../Assets/Images/medium_Priority.svg';
import no_Priority from '../../Assets/Images/no_priority.svg';
import urgent_Priority_grey from '../../Assets/Images/urgent_Priority_grey.svg';

const AnoopProfileImg = "https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png";
const YogeshProfileimg = "https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg";

export default function Card({ cardDetails }) {
  return (
    <>
      <div className="card-container">
        <div className="card-id-wrapper">
          <div className="card-id">{cardDetails.id}</div>
          <div className="card-profile">
            <div className="card-profile-initial">
              {/* Check the user's name to display the correct image or fallback */}
              {cardDetails.userObj.name === "Anoop sharma" ? (
                <img className="card-profile-image" src={AnoopProfileImg} alt="Anoop" />
              ) : cardDetails.userObj.name === "Yogesh" ? (
                <img className="card-profile-image" src={YogeshProfileimg} alt="Yogesh" />
              ) : (
                // Render the initials if it's neither "Anoop" nor "Yogesh"
                <div className="card-profile-initial-fallback">
                  {cardDetails.userObj.name
                    .split(' ')
                    .map((n) => n[1])
                    .join('')}
                </div>
              )}
            </div>
            <div
              className={
                cardDetails.userObj.available
                  ? 'card-profile-initial-available card-profile-initial-available-true'
                  : 'card-profile-initial-available'
              }
            ></div>
          </div>
        </div>

        <div className="card-title">{cardDetails.title}</div>

        <div className="card-tag">
          {
            {
              0: <div className="card-tag-icon"><img src={no_Priority} alt="No Priority" /></div>,
              1: <div className="card-tag-icon"><img src={low_Priority} alt="Low Priority" /></div>,
              2: <div className="card-tag-icon"><img src={medium_Priority} alt="Medium Priority" /></div>,
              3: <div className="card-tag-icon"><img src={high_Priority} alt="High Priority" /></div>,
              4: <div className="card-tag-icon"><img src={urgent_Priority_grey} alt="Urgent Priority" /></div>
            }[cardDetails.priority]
          }

          {cardDetails.tag.map((tag, index) => {
            return (
              <div key={index} className="card-tag-box">
                <div className="card-tag-title">{tag}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
