import React, { createContext, useContext, useState } from 'react';
const RoleContext = createContext();
export const useRole = () => useContext(RoleContext);
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('Agent'); 
  const [customerEmail, setCustomerEmail] = useState('customer@example.com');
  const toggleRole = () => {
    setRole(prev => prev === 'Agent' ? 'Customer' : 'Agent');
  };
  return (
    <RoleContext.Provider value={{ role, toggleRole, customerEmail }}>
      {children}
    </RoleContext.Provider>
  );
};
