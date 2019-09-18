import React, { Component } from 'react';
// import { useState } from 'react';

export default function TokenRender({ tokens = [] }) {
  let lis = [];
  tokens.forEach((v, i) => {
    let token = JSON.stringify(v);
    lis.push((
      <li key={`token${i}`}>
        <pre>
          {token}
        </pre>
      </li>
    ))
  })

  return (
    <div className="tokens-container">
      <ul>
        {lis}
      </ul>
    </div>
  );
}