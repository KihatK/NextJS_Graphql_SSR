import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApollo, initializeApollo, addApolloState } from '../../lib/apolloClient';
import { USER_DETAIL, GET_POST } from '../../gql/user';

const UserDetail = ({ user_info }) => {
  const router = useRouter();
  const [user, setUser] = useState(user_info);

  const apolloClient = useApollo();

  useEffect(() => {
    const getData = async () => {
      // const { query: { id: userId } } = router;
      // if (!userId) {
      //   return;
      // }
  
      // const { loading, error, data } = await apolloClient.query({
      //   query: USER_DETAIL,
      //   variables: { userId },
      // });
      const url = "www.prisma.io";
      const description = "Prisma replaces traditional ORMs";
      const result = await apolloClient.mutate({
        mutation: GET_POST,
        variables: { url, description },
      });
      console.log('result', result.data);
      // console.log('loading: ', loading);
      // console.log('error: ', error);
      // console.log('data: ', data);
      // setUser(data.user);
    }
    
    getData();
  }, []);

  return (
    <>
      <div className="user-detail-page">
        <h1>User Detail</h1>
        {user ? (
          <>
            <h2>{user.name}</h2>
            <p>아이디: {user.id}</p>
            <p>색상: {user.color}</p>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo();
  
  const result = await apolloClient.query({
    query: USER_DETAIL,
    variables: { userId: context.params.id },
  });

  return addApolloState(apolloClient, {
    props: { user_info: result.data.user },
  });
}

export default UserDetail;