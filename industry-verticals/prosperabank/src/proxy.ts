import { type NextRequest, NextResponse } from 'next/server';
import {
  defineProxy,
  MultisiteProxy,
  PersonalizeProxy,
  RedirectsProxy,
} from '@sitecore-content-sdk/nextjs/proxy';
import sites from '.sitecore/sites.json';
import scConfig from 'sitecore.config';

const multisite = new MultisiteProxy({
  /**
   * List of sites for site resolver to work with
   */
  sites,
  ...scConfig.api.edge,
  ...scConfig.multisite,
  skip: () => false,
});

const redirects = new RedirectsProxy({
  sites,
  ...scConfig.api.edge,
  ...scConfig.api.local,
  ...scConfig.redirects,
  skip: () => false,
});

const personalize = new PersonalizeProxy({
  sites,
  ...scConfig.api.edge,
  ...scConfig.personalize,
  skip: () => false,
});

export default function proxy(req: NextRequest) {
  if (!scConfig.api?.edge?.contextId && !scConfig.api?.local?.apiHost) {
    return NextResponse.next();
  }
  return defineProxy(multisite, redirects, personalize).exec(req);
}

export const config = {
  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /_next (Next.js internals)
   * 3. /sitecore/api (Sitecore API routes)
   * 4. /- (Sitecore media)
   * 5. /healthz (Health check)
   * 7. all root files inside /public
   */
  matcher: ['/', '/((?!api/|_next/|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg).*)'],
};
