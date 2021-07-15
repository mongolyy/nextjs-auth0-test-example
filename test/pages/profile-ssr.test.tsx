import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import httpMocks from 'node-mocks-http';
import { GetServerSidePropsContext } from "next";
import { WithPageAuthRequiredOptions } from "@auth0/nextjs-auth0";

describe('Profile-ssr page', () => {
  jest.spyOn(require('@auth0/nextjs-auth0'), 'withPageAuthRequired')
    // @ts-ignore
    .mockImplementation((opts: WithPageAuthRequiredOptions) => {
      return opts.getServerSideProps;
    });

  const Profile = require('../../src/pages/profile-ssr').default;
  const getServerSideProps = require('../../src/pages/profile-ssr').getServerSideProps;

  describe('Profile-ssr component', () => {
    test('propsを渡すと、メールアドレスとsamplePropが表示される', () => {
      const user = {
        email: 'test@example.com'
      };
      const expectedSampleProps = 'barProps';
      const { getByTestId } = render(<Profile user={user} sampleProp={expectedSampleProps} />);
      expect(getByTestId('email')).toHaveTextContent(user.email);
      expect(getByTestId('sampleProp')).toHaveTextContent(expectedSampleProps);
    });
  });

  describe('getServerSideProps', () => {
    const expectedKey = 'bar';

    const ctx: GetServerSidePropsContext = {
      req: httpMocks.createRequest(),
      res: httpMocks.createResponse(),
      params: undefined,
      query: { 'key': expectedKey },
      resolvedUrl: ''
    };

    test('ログインしている場合はpropsを返す', async () => {
      const result = await getServerSideProps(ctx);
      expect(result).toStrictEqual({ props: { sampleProp: expectedKey }});
    });

    test('クエリストリングにkeyがない場合は、noKeyを返す', async () => {
      const noKeyCtx = {
        ...ctx,
        query: {}
      };
      const result = await getServerSideProps(noKeyCtx);
      expect(result).toStrictEqual({ props: { sampleProp: 'noKey' }});
    });
  });
});
