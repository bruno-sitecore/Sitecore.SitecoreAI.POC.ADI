import React from 'react';
import { LayoutServicePageState, SitecoreProvider } from '@sitecore-content-sdk/nextjs';
import components from '../.sitecore/component-map';
import scConfig from '../sitecore.config';
import '../src/assets/main.scss';
import { I18nProvider } from 'next-localization';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  breakpoints: {
    breakpointNames: {
      default: '0',
      sm: '640',
      md: '768',
      lg: '1024',
      xl: '1280',
      '2xl': '1536',
    },
    debounceTimeout: 200,
  },
};

const mockPage = {
  locale: 'en',
  siteName: 'prosperabank',
  mode: {
    name: LayoutServicePageState.Normal,
    isNormal: true,
    isPreview: false,
    isEditing: false,
    isDesignLibrary: false,
    designLibrary: {
      isVariantGeneration: false,
    },
  },
  layout: {
    sitecore: {
      context: {
        pageEditing: false,
        pageState: LayoutServicePageState.Normal,
        language: 'en',
        Languages: [
          { Name: 'en' },
          { Name: 'en-US' },
          { Name: 'fr' },
          { Name: 'fr-CA' },
          { Name: 'es-ES' },
          { Name: 'ja-JP' },
        ],
      },
      route: null,
    },
  },
};

export const decorators = [
  (Story) => (
    <SitecoreProvider
      api={scConfig.api}
      componentMap={components}
      page={mockPage}
      loadImportMap={() => import('../.sitecore/import-map')}
    >
      <I18nProvider>
        <Story />
      </I18nProvider>
    </SitecoreProvider>
  ),
];
