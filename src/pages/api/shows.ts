import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function shows(req, res) {
  if (req.method === 'GET') {
    const key = req.query.key || 'noKey';
    res.status(200).json({ key });
  } else {
    res.status(404).json({ errorMessage: 'Not Found' });
  }
});
