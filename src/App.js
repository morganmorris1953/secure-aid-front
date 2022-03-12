
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import jwt_decode from "jwt-decode";

import Callback from './Components/Callback';
import LoginPage from './Pages/Login';

import ProviderDashboard from './Pages/Users/Provider';
import RecipientDashboard from './Pages/Users/Recipient';
import VeteranDashboard from './Pages/Users/Veteran';

import LandingPage from './Pages/LandingPage';
import ChatPage from './Components/Chat';

import TicketPage from './Pages/Tickets/Ticket';
import ModifyTicketPage from './Pages/Tickets/ModifyTicket';
import DeleteTicketPage from './Pages/Tickets/DeleteTicket'

import UserContext from './Contexts/UserContext';

import { refreshToken, fetchUserToken, } from './API/Auth';

import User from './helpers/groups'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Components/Navigation';
import TokenAccountSignUpPage from './Pages/TokenAccountSignUp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      let token = JSON.parse(localStorage.getItem("token"))
      if (token) {
        let newToken = await refreshToken(token.refresh)
        if (newToken) {
          setIsLoggedIn(true)
          const userData = jwt_decode(newToken.access)
          setUser(new User(userData))
        } else {
          handleLogout()
        }
      }
    }

    if (!user) {
      getUser()
    }

  }, [user])

  const handleStandardLogin = async (formData) => {
    const { username, password } = formData;
    const token = await fetchUserToken(username, password)

    if (token) {
      handleTokenLogin(token)
    }
  }

  const handleTokenLogin = (token) => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      setIsLoggedIn(true);
      const userData = jwt_decode(token.access)
      setUser(new User(userData))
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    setIsLoggedIn(false);
    setUser(null);
    navigate("/")
  }

  return (
    <div className="App">
      <UserContext.Provider value={user} >

        <Routes>
          <Route path="/" element={<LandingPage handleTokenLogin={handleTokenLogin} handleStandardLogin={handleStandardLogin} />} />
          <Route path="/login" element={<LoginPage handleStandardLogin={handleStandardLogin} />} />
          <Route path="/callback" element={<Callback handleTokenLogin={handleTokenLogin} />} />

          <Route path="/veteran" element={<VeteranDashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/provider" element={<ProviderDashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/recipient" element={<RecipientDashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />

          <Route path="/tickets/add" element={<ModifyTicketPage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/tickets/:ticketID" element={<TicketPage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/tickets/:ticketID/update/" element={<ModifyTicketPage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/tickets/:ticketID/delete/" element={<DeleteTicketPage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        </Routes>

      </UserContext.Provider>
    </div>
  );
}

export default App;

