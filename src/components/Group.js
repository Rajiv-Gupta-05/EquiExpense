import React, { useState } from "react";
import "./Bootstrap/GroupList.css";

const GroupList = ({ groups }) => {
  const [isGroupListVisible, setIsGroupListVisible] = useState(true);

  return (
    <div className="group-list-container">
      <h2
        className={`group-list-header ${isGroupListVisible ? "active" : ""}`}
        onClick={() => setIsGroupListVisible(!isGroupListVisible)}
      >
        Groups <i className={`fas fa-object-group ${isGroupListVisible ? 'active' : ''}`}></i>
      </h2>
      {isGroupListVisible && (
        <ul className="group-list">
          {groups.map((group) => (
            <li key={group.id} className="group-list-item">
              <strong>{group.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupList;
