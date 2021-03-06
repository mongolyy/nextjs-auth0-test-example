import React from 'react';

import useApi from '../lib/use-api';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function TvShows(): React.ReactElement {
  const { response, error, isLoading } = useApi('/api/shows');

  return (
    <>
      <h1>TV Shows</h1>

      {isLoading && <p>Loading TV shows...</p>}

      {!isLoading && response && (
        <>
          <p>My favourite TV shows:</p>
          <pre>
            {JSON.stringify(
              response.shows.map((s: any) => s.show.name),
              null,
              2
            )}
          </pre>
        </>
      )}

      {!isLoading && error && (
        <>
          <p>Error loading TV shows</p>
          <pre style={{ color: 'red' }}>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
    </>
  );
});
