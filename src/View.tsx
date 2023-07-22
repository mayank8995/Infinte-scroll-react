import * as React from 'react';

export default function View({ response }) {
  return (
    <div className="wrapper">
      <h1>Infinte scroll</h1>
      {response?.map((resp, index) => (
        <div key={index} className="card">
          <h2>{resp.title.substr(0, 15)}</h2>
          <p>{resp.body}</p>
        </div>
      ))}
    </div>
  );
}
