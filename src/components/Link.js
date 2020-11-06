import React from 'react';

function Link({ title, path }) {
  return (
    <a href={path} className="link" target="_blank" rel="noreferrer">
      <h3 className="link__title">{title}</h3>
    </a>
  )
};

export default Link

