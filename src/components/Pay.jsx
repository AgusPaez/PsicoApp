import React from 'react';

export const Pay = ({ content }) => {
  return (
    <div className="m-4">
      {{ content } ? <h1>pay</h1> : <h1> no activated</h1>}
    </div>
  );
};
