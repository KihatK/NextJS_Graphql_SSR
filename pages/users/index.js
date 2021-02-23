import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';

import { useApollo } from '../../lib/apolloClient';

const Users = () => {
  const [users, setUsers] = useState([]);

  const apolloClient = useApollo();
  
  useEffect(() => {
    const getUsers = async () => {
      const result = await apolloClient.query({
        query: gql`
          query users {
            users {
              id
              name
              color
              married
            }
          }
        `
      });
      console.log(result.data.users);
      setUsers(result.data.users);
    }

    getUsers();
  }, []);

  // useEffect(() => {
  //   (
  //     async () => {
  //         const response = await fetch('http://localhost:3000/api/graphql', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-type': 'applocation/json',
  //             },
  //             body: JSON.stringify({ query: '{ users { id name color } }' }),
  //         });
  //         const { data } = await response.json();
  //         console.log( data );
  //         setUsers( data.users );
  //     }
  //   )();
  // }, []);

  return (
    <div className="users-page">
      <ul>
        {users.map((user) => {
          const { id, name, color } = user;
          return (
            <Link href={`/users/${id}`} key={id}>
              <a><li style={{ color }}>{`${id}. ${name}(${color})`}</li></a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Users;