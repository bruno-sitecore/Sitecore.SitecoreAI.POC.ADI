'use client';

import type { ReactNode } from 'react';
import { SitecoreProvider } from '@sitecore-content-sdk/nextjs';
import { ComboCardView, type ComboCardProps } from 'src/components/pagecontent/ComboCard';

function PreviewProvider({ children }: { children: ReactNode }) {
  return (
    <SitecoreProvider
      api={{
        edge: {
          contextId: '',
          clientContextId: '',
          edgeUrl: 'https://edge-platform.sitecorecloud.io',
        },
        local: {
          apiKey: '',
          apiHost: '',
          path: '',
        },
      }}
      page={
        {
          locale: 'en',
          siteName: 'prospera',
          mode: {
            isNormal: true,
            isEditing: false,
            isPreview: false,
          },
        } as never
      }
      componentMap={new Map()}
    >
      {children}
    </SitecoreProvider>
  );
}

const image = (src: string, alt: string) => ({ value: { src, alt } });
const text = (value: string) => ({ value });
const rich = (value: string) => ({ value });
const link = (href: string, label: string, target = '') => ({
  value: { href, text: label, target, title: '' },
});

const photo = (file: string, alt: string) =>
  image(`https://solutions-infographic.com/images/${file}`, alt);

const bodyCopy =
  'By supporting our people and what drives them, we are changing the world together.';

const listBody = `<ul><li><strong>Connect</strong> with like-minded members</li><li><strong>Learn</strong> new skills</li><li><strong>Engage</strong> with rich content including blogs &amp; webinars</li></ul>`;

const ghost = (label: string) => link('https://www.analog.com', label);

function card(
  index: 1 | 2 | 3 | 4,
  options?: { logo?: boolean; list?: boolean; filled?: boolean; ghosts?: boolean }
) {
  const photos = ['spot01.jpg', 'spot02.jpg', 'spot03.jpg', 'spot04.jpg'];
  const prefix = String(index);

  return {
    [`Image${prefix}`]: photo(photos[index - 1], `Combo card ${index}`),
    [`Logo${prefix}`]: options?.logo
      ? image('https://solutions-infographic.com/images/EngineerZone_logo.svg', 'EngineerZone')
      : undefined,
    [`Overline${prefix}`]: text('Our culture'),
    [`Title${prefix}`]: text('Live Your Passion'),
    [`Body${prefix}`]: rich(`<p>${bodyCopy}</p>`),
    [`List${prefix}`]: options?.list ? rich(listBody) : undefined,
    [`PrimaryLink${prefix}`]: link('https://www.analog.com', 'Explore'),
    [`SecondaryLink${prefix}`]: link('https://www.analog.com/careers', 'Careers', '_blank'),
    [`GhostLink${prefix}A`]: options?.ghosts === false ? undefined : ghost('Product Cross-Reference'),
    [`GhostLink${prefix}B`]: options?.ghosts === false ? undefined : ghost('Product Security Response'),
    [`GhostLink${prefix}C`]: options?.ghosts === false ? undefined : ghost('Vulnerability Disclosure'),
    [`FilledButton${prefix}`]: { value: index === 1 || options?.filled },
  };
}

const fields = {
  ...card(1, { filled: true }),
  ...card(2, { logo: true, list: true, ghosts: false }),
  ...card(3),
  ...card(4),
} as ComboCardProps['fields'];

const variants = ['Foundation', 'Resource', 'Homepage', 'Product', 'Content', 'Variations'] as const;

export default function ComboCardPreviewPage() {
  return (
    <PreviewProvider>
    <main style={{ background: '#f7f8f9', minHeight: '100vh', padding: '48px 24px 80px' }}>
      <div style={{ width: 'min(1216px, 100%)', margin: '0 auto 40px' }}>
        <h1 style={{ fontFamily: 'Barlow, sans-serif', fontSize: 32, marginBottom: 8 }}>Combo Card</h1>
        <p style={{ margin: 0, maxWidth: 720 }}>
          Rendering variants set the layout. Card number, card style, overline, title, body, and
          buttons are rendering parameters. Default keeps each variant&apos;s preset.
        </p>
      </div>
      {variants.map((variant) => (
        <section key={variant} style={{ marginBottom: 48 }}>
          <h2
            style={{
              width: 'min(1216px, 100%)',
              margin: '0 auto 16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {variant}
          </h2>
          <ComboCardView variant={variant} fields={fields} params={{ CardCount: '3' }} />
        </section>
      ))}
      <section>
        <h2
          style={{
            width: 'min(1216px, 100%)',
            margin: '0 auto 16px',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Foundation with parameters: 4 cards, no image, hide overline
        </h2>
        <ComboCardView
          variant="Foundation"
          fields={fields}
          params={{ CardCount: '4', CardStyle: 'NoImage', Overline: 'Hide' }}
        />
      </section>
    </main>
    </PreviewProvider>
  );
}
