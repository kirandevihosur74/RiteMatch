import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("username") || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [matchedJobs, setMatchedJobs] = useState([]);

  useEffect(() => {
    const cachedJobs = localStorage.getItem("matchedJobs");
    if (cachedJobs) {
      setMatchedJobs(JSON.parse(cachedJobs));
    }
  }, []);

  // Also keep username in localStorage for session persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem("username", user);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, matchedJobs, setMatchedJobs }}
    >
      {children}
    </UserContext.Provider>
  );
};