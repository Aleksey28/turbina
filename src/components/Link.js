import React from 'react';

function Link({ title, path }) {
  return (
    <a href={path} className="link">
      <h3 className="link__title">{title}</h3>
    </a>
  )
};

export default Link
