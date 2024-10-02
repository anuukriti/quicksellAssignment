import React from 'react';
import './Card.css';
import high_Priority from '../../Assets/Images/high_Priority.svg';
import low_Priority from '../../Assets/Images/low_Priority.svg';
import medium_Priority from '../../Assets/Images/medium_Priority.svg';
import no_Priority from '../../Assets/Images/no_priority.svg';
import urgent_Priority_grey from '../../Assets/Images/urgent_Priority_grey.svg';

const profileImages = {
  "Anoop sharma": "https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png",
  "Yogesh": "https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg"
};

const priorityIcons = {
  0: no_Priority,
  1: low_Priority,
  2: medium_Priority,
  3: high_Priority,
  4: urgent_Priority_grey
};

export default function Card({ cardDetails }) {
  const { id, userObj, title, priority, tag } = cardDetails;
  const userImage = profileImages[userObj.name];

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <div className="card-container">
      <div className="card-id-wrapper">
        <div className="card-id">{id}</div>
        <div className="card-profile">
          <div className="card-profile-initial">
            {userImage ? (
              <img className="card-profile-image" src={userImage} alt={userObj.name} />
            ) : (
              <div className="card-profile-initial-fallback">
                {getUserInitials(userObj.name)}
              </div>
            )}
          </div>
          <div
            className={
              userObj.available
                ? 'card-profile-initial-available card-profile-initial-available-true'
                : 'card-profile-initial-available'
            }
          ></div>
        </div>
      </div>

      <div className="card-title">{title}</div>

      <div className="card-tag">
        <div className="card-tag-icon">
          <img src={priorityIcons[priority]} alt="Priority" />
        </div>
        {tag.map((tagItem, index) => (
          <div key={index} className="card-tag-box">
            <div className="card-tag-title">{tagItem}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
