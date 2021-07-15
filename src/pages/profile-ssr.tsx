import React from 'react';
import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';

type ProfileProps = {
  user: UserProfile
  sampleProp: string
};

const Profile: NextPage<ProfileProps> = ({ user, sampleProp }: ProfileProps) => {
  return (
    <>
      <h1>Profile</h1>

      <div>
        <h3>Profile (server rendered)</h3>
        <pre data-testid="email">{JSON.stringify(user, null, 2)}</pre>
        <pre data-testid="sampleProp">{sampleProp}</pre>
      </div>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const key = ctx.query.key || 'noKey';

    return { props: { sampleProp: key }};
  }
});

export default Profile;
