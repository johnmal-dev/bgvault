import React from 'react';

const HomeCard = ({ title }) => {
  return (
    <div className={`card ${title}`}>
      <h3>{title[0].toUpperCase() + title.slice(1)}</h3>
    </div>
  );
};

export default HomeCard;
