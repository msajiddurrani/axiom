/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (email: string, userName: string) => {
    setUserEmail(email);
    setUsername(userName);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUsername('');
  };

  return (
    <div id="atomz-app-kernel" className="min-h-screen bg-charcoal-black text-camel-white overflow-x-hidden antialiased select-none selection:bg-camel/20 selection:text-camel-white">
      {isLoggedIn ? (
        <Dashboard userEmail={userEmail} username={username} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
