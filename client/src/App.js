import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { Alert } from '@mantine/core';
import { BsFillCheckCircleFill } from 'react-icons/bs';

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState('false');

  const showSnackbar = () => {
    setSnackbar(!snackbar);
  }

  const hideSnackbar = () => {
    setTimeout(() => {
      setSnackbar(!snackbar);
    }, 3000);
  }
  
  const sendData = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/user/insert', {
      email: email,
      password: password
    })
      .then((response) => {
        if (response.data === 'success') {
          showSnackbar();
          hideSnackbar();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <form>
        <input type='text' onChange={(e) => { setEmail(e.target.value); }} placeholder='Email' name='email' id='email' />
        <br />
        <input type='password' onChange={(e) => { setPassword(e.target.value); }} placeholder='Password' name='password' id='password' />
        <br />
        <button type='submit' onClick={sendData}>Submit</button>
        <Alert className={snackbar ? 'showSnack' : 'hideSnack'} icon={<BsFillCheckCircleFill size="1rem" />} title="Bummer!" color="green">
          Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
        </Alert>
      </form>
    </div>
  );
}

export default App;
