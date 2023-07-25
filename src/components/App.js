import React, { useState } from "react";
import '../styles/App.css';

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleSecondNameChange = (e) => {
    setSecondName(e.target.value);
  };

  const calculateRelationshipStatus = () => {
    if (firstName.trim() === '' || secondName.trim() === '') {
      setRelationshipStatus('Please Enter valid input');
      return;
    }
  
    const commonLetters = new Set([...firstName].filter(char => secondName.includes(char)));
    const commonLettersPattern = `[${[...commonLetters].join('')}]`;
    const firstNameAfterRemoval = firstName.replace(new RegExp(commonLettersPattern, 'g'), '');
    const secondNameAfterRemoval = secondName.replace(new RegExp(commonLettersPattern, 'g'), '');
  
    if (firstNameAfterRemoval.length < 3 || secondNameAfterRemoval.length < 3) {
      setRelationshipStatus('Names must have at least three characters');
      return;
    }
  
    const sumOfLengths = (firstNameAfterRemoval.length + secondNameAfterRemoval.length) % 6;
    const statusMap = {
      1: 'Friends',
      2: 'Love',
      3: 'Affection',
      4: 'Marriage',
      5: 'Enemy',
      0: 'Siblings',
    };
  
    setRelationshipStatus(statusMap[sumOfLengths]);
  };
  

  const handleClear = () => {
    setFirstName('');
    setSecondName('');
    setRelationshipStatus('');
  };

  return (
    <div>
      <div>
        <label htmlFor="input1">First Name:</label>
        <input
          name="name1"
          type="text"
          id="input1"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div>
        <label htmlFor="input2">Second Name:</label>
        <input
          name="name2"
          type="text"
          id="input2"
          value={secondName}
          onChange={handleSecondNameChange}
        />
      </div>
      <button onClick={calculateRelationshipStatus}>
        Calculate Relationship Future
      </button>
      <button onClick={handleClear}>
        Clear
      </button>
      <h3>{relationshipStatus}</h3>
    </div>
  );
};

export default App;
