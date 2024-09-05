import React from 'react';

export const Pay = ({ content }) => {
  return (
    <div className="my-16 border-t-2 mx-28">
      {content ? (
        <h1 className="m-2 my-8 text-3xl ml-28">pay</h1>
      ) : (
        <h1> no activated</h1>
      )}
    </div>
  );
};
