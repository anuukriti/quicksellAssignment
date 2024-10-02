import React, { useState } from 'react';
import filterIcon from '../../Assets/Images/Tuning.svg';
import downIcon from '../../Assets/Images/Down.svg';
import './Navbar.css';

export default function Navbar({ groupValue, orderValue, handleGroupValue, handleOrderValue }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function handleToggle() {
    setIsFilterOpen(prev => !prev);
  }

  function handleChange(e, callback) {
    setIsFilterOpen(false);
    if (e.target.value) {
      callback(e.target.value);
    }
  }

  const Dropdown = ({ label, value, onChange, options }) => (
    <div className="nav-disp-filters">
      <div className="nav-dropdown-category">{label}</div>
      <div className="nav-dropdown-selector">
        <select value={value} onChange={onChange} className="nav-selector">
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <section className="nav">
      <div className="nav-container">
        <div>
          <div className="nav-disp-btn" onClick={handleToggle}>
            <div className="nav-disp-icon nav-disp-filter">
              <img src={filterIcon} alt="icon" />
            </div>
            <div className="nav-disp-heading">Display</div>
            <div className="nav-disp-icon nav-disp-drop">
              <img src={downIcon} alt="icon" />
            </div>
          </div>

          <div className={isFilterOpen ? "nav-disp-dropdown nav-disp-dropdown-show" : "nav-disp-dropdown"}>
            <Dropdown
              label="Grouping"
              value={groupValue}
              onChange={e => handleChange(e, handleGroupValue)}
              options={[
                { value: 'status', label: 'Status' },
                { value: 'user', label: 'User' },
                { value: 'priority', label: 'Priority' },
              ]}
            />
            <Dropdown
              label="Ordering"
              value={orderValue}
              onChange={e => handleChange(e, handleOrderValue)}
              options={[
                { value: 'priority', label: 'Priority' },
                { value: 'title', label: 'Title' },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
