import React, { useState } from 'react';
import './search.css'

const SearchTextField = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input className='searchTextField'
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Enter text..."
    />
  );
};

export default SearchTextField;
