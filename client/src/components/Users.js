import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/users').then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <>
      <h2>All Users</h2>
      <p>Users and their age</p>
      <table className='table' style={{ width: '50%' }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <React.Fragment key={i}>
                <tr>
                  <td>{user.username}</td>
                  <td>{user.age}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
