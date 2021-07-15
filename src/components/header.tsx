import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

const Header: React.FunctionComponent = () => {
  const { user, isLoading } = useUser();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/shows">
              <a>TV Shows</a>
            </Link>
          </li>
          {!isLoading &&
            (user ? (
              <>
                <li>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </li>{' '}
                <li>
                  <a href="/profile-ssr?key=fooProps">Profile (SSR)</a>
                </li>{' '}
                <li>
                  <a href="/api/auth/logout" id="logout">
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/api/auth/login" id="login">
                    Login
                  </a>
                </li>
              </>
            ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
