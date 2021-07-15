import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { UserProvider } from "@auth0/nextjs-auth0";

describe('Profile page', () => {
  jest.spyOn(require('@auth0/nextjs-auth0'), 'withPageAuthRequired')
    .mockImplementation((Component) => {
      return Component;
    });

  const Profile = require('../../src/pages/profile').default;

  test('propsを渡すと、メールアドレスが表示される', async () => {
    const user = {
      email: 'test@example.com'
    };
    const { getByTestId } = render(
      <UserProvider user={user}>
        <Profile user={user} />
      </UserProvider>
    );
    expect(getByTestId('h1')).toHaveTextContent('Profile');
    expect(await screen.findByText('Profile:')).toBeInTheDocument();
    expect(getByTestId('email')).toHaveTextContent(user.email);
  });
});
