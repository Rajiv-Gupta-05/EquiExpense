import React from 'react';
import "./Bootstrap/GroupPage.css"
import { useParams } from 'react-router-dom';

const GroupPage = ({ groups }) => {
  const { groupId } = useParams();

  const selectedGroup = groups.find(group => group.id === groupId);

  return (
    <div>
      <div className="group-header">
        <h1>{selectedGroup ? selectedGroup.name : 'Group Details'}</h1>
      </div>
    </div>
  );
};

export default GroupPage;
