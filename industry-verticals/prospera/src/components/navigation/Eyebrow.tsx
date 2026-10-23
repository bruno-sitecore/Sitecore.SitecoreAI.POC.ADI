'use client';

import {
  AppPlaceholder,
  ComponentMap,
  ImageField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX, useEffect, useRef, useState } from 'react';

export type EyebrowProps = ComponentProps & {
  fields: {
    LogoImage: ImageField;
  };
  componentMap: ComponentMap;
};

export const Default = (props: EyebrowProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const searchPanelRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={`component eyebrow relative z-[60] bg-white ${props.params.styles?.trimEnd() ?? ''}`}
        id={id || undefined}
      >
        <div
          className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}
        >
          <div className="row">
            <div className="col col-placeholder flex items-center justify-between">
              <AppPlaceholder
                name="eyebrow-left"
                rendering={props.rendering}
                page={page}
                componentMap={props.componentMap}
              />

              <div className="flex items-center gap-4">
                <AppPlaceholder
                  name="eyebrow-right"
                  rendering={props.rendering}
                  page={page}
                  componentMap={props.componentMap}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
