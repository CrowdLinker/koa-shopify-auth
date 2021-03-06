import querystring from 'querystring';

import { Context } from 'koa';
import getHost from '../lib/get-host';
import redirectionPage from './redirection-page';

export default function createTopLevelRedirect(apiKey: string, path: string) {
  return function topLevelRedirect(ctx: Context) {
    const host = getHost(ctx);
    const { query } = ctx;
    const { shop } = query;

    const params = { shop };
    const queryString = querystring.stringify(params);

    ctx.body = redirectionPage({
      origin: shop,
      redirectTo: `https://${host}${path}?${queryString}`,
      apiKey,
    });
  };
}
