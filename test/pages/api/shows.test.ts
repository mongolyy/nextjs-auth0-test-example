import { NextApiRequest, NextApiResponse } from 'next';
import '@testing-library/jest-dom';
import httpMocks from 'node-mocks-http';

describe('shows api', () => {
  jest.spyOn(require('@auth0/nextjs-auth0'), 'withApiAuthRequired')
    .mockImplementation((apiRoute) => {
      return apiRoute;
    });
  const shows = require('../../../src/pages/api/shows').default;

  test('keyがある場合、keyを返す', async () => {
    const expectedKey = 'fooKey';
    const mockReq = httpMocks.createRequest<NextApiRequest>({
      method: 'GET',
      query: { key: expectedKey }
    });
    const mockRes = httpMocks.createResponse<NextApiResponse>();

    await shows(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes._getData()).toBe(JSON.stringify({ key: expectedKey }));
  });

  test('keyがない場合、デフォルトのkeyを返す', async () => {
    const mockReq = httpMocks.createRequest<NextApiRequest>({
      method: 'GET',
      query: {}
    });
    const mockRes = httpMocks.createResponse<NextApiResponse>();

    await shows(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(200);
    expect(mockRes._getData()).toBe(JSON.stringify({ key: 'noKey' }));
  });

  test('リクエストのメソッドがGET以外の場合、404を返す', async () => {
    const mockReq = httpMocks.createRequest<NextApiRequest>({
      method: 'POST',
      query: {}
    });
    const mockRes = httpMocks.createResponse<NextApiResponse>();

    await shows(mockReq, mockRes);

    expect(mockRes.statusCode).toBe(404);
    expect(mockRes._getData()).toBe(JSON.stringify({ errorMessage: 'Not Found' }));
  });
});
