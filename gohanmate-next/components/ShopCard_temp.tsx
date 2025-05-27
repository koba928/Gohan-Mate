// // ShopCard.tsx
'use client';

import React from 'react';

type Props = {
  name: string;
  image: string;
  description: string;
  category: string[];
};

const ShopCard: React.FC<Props> = ({ name, image, description, category }) => {
  return (
    <div
  style={{
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'box-shadow 0.2s ease-in-out',
  }}
>

      <img
        src={image}
        alt={name}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div style={{ padding: '12px' }}>
        <h3>{name}</h3>
        <p>{description}</p>
        <div>
        {category.map((tag, idx) => (
  <span
    key={idx}
    style={{
      display: 'inline-block',
      marginRight: '8px',
      marginBottom: '4px',
      padding: '2px 10px',
      backgroundColor: '#f0f0f0',
      borderRadius: '12px',
      fontSize: '0.8em',
      color: '#333'
    }}
  >
    {tag}
  </span>
))}

        </div>
      </div>
    </div>
  );
};

export default ShopCard;
