import { useState } from 'react'
import './App.css'

// API URL - will be replaced with your Render backend URL after deployment
const API_URL = import.meta.env.VITE_API_URL || 'https://backend-api-4g4s.onrender.com';

function App() {
  const [inputValue, setInputValue] = useState('')
  const [displayValue, setDisplayValue] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    await send();
  }

  const send = async () => {
    try {
      console.log('Sending request to backend with name:', inputValue);
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputValue }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Backend response:', data);
      setDisplayValue(data.message || data);
    } catch (error) {
      console.error('Error calling backend:', error);
      setDisplayValue(`Error: ${error.message}`);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Enter your name' 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      
      {displayValue && (
        <div>
          <h3>{displayValue}</h3>
        </div>
      )}
    </>
  )
}

export default App
