import React from 'react';
import { useUser } from '../lib/hooks';
import Loader from '../components/loader'

const IndexPage = () => {
	const {user,loading} = useUser();

	if (loading){
		return <Loader/>
	}

  return (
    <>
      <style jsx>
        {`
          p {
            text-align: center;
            color: #888;
          }
          h3 {
            color: #555;
          }
        `}
      </style>
      <div style={{ marginBottom: '2rem' }}>
        <h2>
          Hello,
          {' '}
          {user ? user.name : 'stranger'}
          !
        </h2>
        <p>Have a wonderful day.</p>
      </div>

    </>
  );
};

export default IndexPage;
