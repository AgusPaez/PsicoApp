import React from 'react';

export const Contact = ({ contentMail }, { contentNro }) => {
  return (
    <section className="m-4">
      <div>
        <h2>Contact </h2>
        <div>
          <h1>{contentMail} </h1>
          <h1>{contentNro}</h1>
        </div>
      </div>
    </section>
  );
};
