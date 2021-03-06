import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export default function Home(): React.ReactElement {
  const { user, isLoading } = useUser();

  return (
    <>
      <h1>Next.js and Auth0 Example</h1>

      {isLoading && <p>Loading login info...</p>}

      {!isLoading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in <i>Profile</i> and <i>Logout</i>
          </p>
        </>
      )}

      {user && (
        <>
          <h4>Rendered user info on the client</h4>
          <pre id="profile">{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </>
  );
}
