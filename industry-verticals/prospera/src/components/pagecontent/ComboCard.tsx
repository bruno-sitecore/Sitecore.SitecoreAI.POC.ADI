'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  Link,
  LinkField,
  NextImage,
  RichText,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';

export type ComboCardVariantName =
  | 'Foundation'
  | 'Resource'
  | 'Homepage'
  | 'Product'
  | 'Content'
  | 'Variations';

interface CardFields {
  image?: ImageField;
  logo?: ImageField;
  overline?: Field<string>;
  title?: Field<string>;
  body?: RichTextField;
  list?: RichTextField;
  primaryLink?: LinkField;
  secondaryLink?: LinkField;
  ghostLinks: LinkField[];
  filledButton?: Field<boolean>;
}

interface ComboCardFields {
  Image1?: ImageField;
  Logo1?: ImageField;
  Overline1?: Field<string>;
  Title1?: Field<string>;
  Body1?: RichTextField;
  List1?: RichTextField;
  PrimaryLink1?: LinkField;
  SecondaryLink1?: LinkField;
  GhostLink1A?: LinkField;
  GhostLink1B?: LinkField;
  GhostLink1C?: LinkField;
  FilledButton1?: Field<boolean>;
  Image2?: ImageField;
  Logo2?: ImageField;
  Overline2?: Field<string>;
  Title2?: Field<string>;
  Body2?: RichTextField;
  List2?: RichTextField;
  PrimaryLink2?: LinkField;
  SecondaryLink2?: LinkField;
  GhostLink2A?: LinkField;
  GhostLink2B?: LinkField;
  GhostLink2C?: LinkField;
  FilledButton2?: Field<boolean>;
  Image3?: ImageField;
  Logo3?: ImageField;
  Overline3?: Field<string>;
  Title3?: Field<string>;
  Body3?: RichTextField;
  List3?: RichTextField;
  PrimaryLink3?: LinkField;
  SecondaryLink3?: LinkField;
  GhostLink3A?: LinkField;
  GhostLink3B?: LinkField;
  GhostLink3C?: LinkField;
  FilledButton3?: Field<boolean>;
  Image4?: ImageField;
  Logo4?: ImageField;
  Overline4?: Field<string>;
  Title4?: Field<string>;
  Body4?: RichTextField;
  List4?: RichTextField;
  PrimaryLink4?: LinkField;
  SecondaryLink4?: LinkField;
  GhostLink4A?: LinkField;
  GhostLink4B?: LinkField;
  GhostLink4C?: LinkField;
  FilledButton4?: Field<boolean>;
}

export type ComboCardProps = {
  params?: { [key: string]: string };
  fields?: ComboCardFields;
};

type SlotVisibility = {
  image: boolean;
  overline: boolean;
  title: boolean;
  body: boolean;
  buttons: boolean;
};

const VARIANT_PRESETS: Record<ComboCardVariantName, SlotVisibility> = {
  Foundation: { image: true, overline: true, title: true, body: true, buttons: true },
  Resource: { image: true, overline: true, title: true, body: true, buttons: false },
  Homepage: { image: true, overline: false, title: true, body: false, buttons: false },
  Product: { image: true, overline: false, title: true, body: true, buttons: true },
  Content: { image: false, overline: false, title: true, body: true, buttons: false },
  Variations: { image: true, overline: false, title: true, body: true, buttons: true },
};

const CARD_INDEXES = [1, 2, 3, 4] as const;

/**
 * Rendering parameters use Default to keep the variant preset, and Show/Hide
 * (or Image/NoImage for card style) to override it.
 */
function resolveFlag(param: string | undefined, preset: boolean): boolean {
  const value = (param ?? '').trim().toLowerCase().replace(/\s+/g, '');

  if (value === '' || value === 'default') {
    return preset;
  }

  if (['show', 'image', '1', 'true', 'yes'].includes(value)) {
    return true;
  }

  if (['hide', 'noimage', '0', 'false', 'no'].includes(value)) {
    return false;
  }

  return preset;
}

function resolveCardCount(param: string | undefined): 2 | 3 | 4 {
  const count = Number(param);
  if (count === 2 || count === 4) {
    return count;
  }

  return 3;
}

function hasText(field?: Field<string> | RichTextField): boolean {
  return Boolean(field?.value && String(field.value).trim());
}

function hasImage(field?: ImageField): boolean {
  return Boolean(field?.value?.src);
}

function hasLink(field?: LinkField): boolean {
  return Boolean(field?.value?.href);
}

function isFilledButton(field?: Field<boolean>): boolean {
  const value = field?.value as unknown;
  return value === true || value === '1';
}

function readCard(fields: ComboCardFields | undefined, index: (typeof CARD_INDEXES)[number]): CardFields {
  if (!fields) {
    return { ghostLinks: [] };
  }

  const card = fields as Record<string, ImageField | Field<string> | RichTextField | LinkField | Field<boolean>>;

  return {
    image: card[`Image${index}`] as ImageField | undefined,
    logo: card[`Logo${index}`] as ImageField | undefined,
    overline: card[`Overline${index}`] as Field<string> | undefined,
    title: card[`Title${index}`] as Field<string> | undefined,
    body: card[`Body${index}`] as RichTextField | undefined,
    list: card[`List${index}`] as RichTextField | undefined,
    primaryLink: card[`PrimaryLink${index}`] as LinkField | undefined,
    secondaryLink: card[`SecondaryLink${index}`] as LinkField | undefined,
    ghostLinks: [
      card[`GhostLink${index}A`] as LinkField | undefined,
      card[`GhostLink${index}B`] as LinkField | undefined,
      card[`GhostLink${index}C`] as LinkField | undefined,
    ].filter((link): link is LinkField => Boolean(link)),
    filledButton: card[`FilledButton${index}`] as Field<boolean> | undefined,
  };
}

function ExternalIcon(): JSX.Element {
  return (
    <svg className="combo-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
      />
    </svg>
  );
}

function BookmarkIcon(): JSX.Element {
  return (
    <svg className="combo-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
    </svg>
  );
}

function ArrowIcon(): JSX.Element {
  return (
    <svg className="combo-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M13.2 5.2 19 11H3v2h16l-5.8 5.8 1.4 1.4L23.2 12 14.6 3.8z" />
    </svg>
  );
}

function ChevronIcon(): JSX.Element {
  return (
    <svg className="combo-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="m9 6 1.4-1.4L18.8 13 10.4 21.4 9 20l6.9-7z" />
    </svg>
  );
}

type ComboCardViewProps = {
  variant: ComboCardVariantName;
  fields?: ComboCardFields;
  params?: { [key: string]: string };
  isPageEditing?: boolean;
};

/**
 * Configurable combo card row. Variants set the layout; rendering parameters
 * override image, overline, title, body, buttons, and the 2/3/4 card count.
 */
export function ComboCardView({
  variant,
  fields,
  params,
  isPageEditing = false,
}: ComboCardViewProps): JSX.Element {
  const id = params?.RenderingIdentifier;
  const sxaStyles = params?.styles?.trim() ?? '';
  const preset = VARIANT_PRESETS[variant];
  const visibility: SlotVisibility = {
    image: resolveFlag(params?.CardStyle, preset.image),
    overline: resolveFlag(params?.Overline, preset.overline),
    title: resolveFlag(params?.Title, preset.title),
    body: resolveFlag(params?.Body, preset.body),
    buttons: resolveFlag(params?.Buttons, preset.buttons),
  };
  const cardCount = resolveCardCount(params?.CardCount);
  const cards = CARD_INDEXES.slice(0, cardCount).map((index) => readCard(fields, index));
  const hasAnyContent = cards.some(
    (card) =>
      hasImage(card.image) ||
      hasImage(card.logo) ||
      hasText(card.overline) ||
      hasText(card.title) ||
      hasText(card.body) ||
      hasText(card.list) ||
      hasLink(card.primaryLink)
  );

  if (!fields || (!hasAnyContent && !isPageEditing)) {
    return (
      <section className={`component combo-card ${sxaStyles}`.trim()} id={id || undefined}>
        <div className="combo-card__empty">Combo Card content is not configured.</div>
      </section>
    );
  }

  const variantClass = variant.toLowerCase();

  return (
    <section
      className={`component combo-card combo-card--${variantClass} combo-card--count-${cardCount} ${sxaStyles}`.trim()}
      id={id || undefined}
      style={{ ['--combo-card-count' as string]: cardCount }}
      aria-label={`${variant} combo cards`}
    >
      <div className="combo-card__grid">
        {cards.map((card, index) => (
          <ComboCardItem
            key={`${variant}-${index}`}
            card={card}
            variant={variant}
            visibility={visibility}
            isPageEditing={isPageEditing}
          />
        ))}
      </div>
    </section>
  );
}

function ComboCardItem({
  card,
  variant,
  visibility,
  isPageEditing,
}: {
  card: CardFields;
  variant: ComboCardVariantName;
  visibility: SlotVisibility;
  isPageEditing: boolean;
}): JSX.Element {
  const logoReplacesTitle =
    variant === 'Variations' && visibility.title && hasImage(card.logo) && !isPageEditing;
  const showLogo =
    variant === 'Variations' && visibility.title && (isPageEditing || hasImage(card.logo));
  const showTitleText = visibility.title && !logoReplacesTitle && (isPageEditing || hasText(card.title));
  const showOverline = visibility.overline && (isPageEditing || hasText(card.overline));
  const ghostLinks = card.ghostLinks.filter((link) => isPageEditing || hasLink(link));
  const showGhosts = variant === 'Variations' && visibility.body && ghostLinks.length > 0;
  const showList = variant === 'Variations' && visibility.body && (isPageEditing || hasText(card.list));
  const showBody = visibility.body && (isPageEditing || hasText(card.body) || showGhosts || showList);
  const showImage = visibility.image && (isPageEditing || hasImage(card.image));
  const showPrimary = visibility.buttons && (isPageEditing || hasLink(card.primaryLink));
  const showSecondary =
    visibility.buttons &&
    variant !== 'Variations' &&
    (isPageEditing || hasLink(card.secondaryLink));
  const showActions = showPrimary || showSecondary;
  const isWholeCardLink =
    !isPageEditing &&
    !showActions &&
    hasLink(card.primaryLink) &&
    (variant === 'Resource' || variant === 'Homepage' || variant === 'Content');
  const compactTitle = variant === 'Homepage' || variant === 'Content';
  const mediaClass =
    variant === 'Variations'
      ? 'combo-card__media combo-card__media--icon'
      : variant === 'Product'
        ? 'combo-card__media combo-card__media--product'
        : variant === 'Homepage'
          ? 'combo-card__media combo-card__media--photo combo-card__media--thumb'
          : 'combo-card__media combo-card__media--photo';

  const cardClass = [
    'combo-card__card',
    variant === 'Resource' || variant === 'Homepage' || variant === 'Content' ? 'is-active' : '',
    variant === 'Homepage' ? 'is-horizontal' : '',
    variant === 'Content' && !showActions ? 'is-arrow' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <div className="combo-card__top">
        {showImage && card.image && (
          <div className={mediaClass}>
            <NextImage field={card.image} width={640} height={420} />
          </div>
        )}
        <div className="combo-card__copy">
          <div className="combo-card__copy-block">
            {showOverline && <Text tag="p" field={card.overline} className="combo-card__overline" />}
            {showLogo && card.logo && (
              <NextImage field={card.logo} width={180} height={36} className="combo-card__logo" />
            )}
            {showTitleText && (
              <CardTitle
                card={card}
                variant={variant}
                compact={compactTitle}
                solo={variant === 'Homepage'}
              />
            )}
            {showBody && (
              <div className="combo-card__body">
                {(isPageEditing || hasText(card.body)) && <RichText field={card.body} />}
                {showList && <RichText field={card.list} />}
                {showGhosts &&
                  ghostLinks.map((link, index) => (
                    <Link
                      key={`${link.value?.href ?? 'ghost'}-${index}`}
                      field={link}
                      className="combo-card__ghost"
                      showLinkTextWithChildrenPresent
                    >
                      <ChevronIcon />
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {showActions && (
        <div className="combo-card__actions">
          {showPrimary && card.primaryLink && (
            <Link
              field={card.primaryLink}
              className={
                variant === 'Variations' && isFilledButton(card.filledButton)
                  ? 'combo-card__button combo-card__button--filled'
                  : 'combo-card__button combo-card__button--outline'
              }
            />
          )}
          {showSecondary && card.secondaryLink && variant === 'Product' && (
            <Link
              field={card.secondaryLink}
              className="combo-card__icon-button"
              aria-label={card.secondaryLink.value?.text || 'Secondary action'}
            >
              <BookmarkIcon />
            </Link>
          )}
          {showSecondary && card.secondaryLink && variant !== 'Product' && (
            <Link
              field={card.secondaryLink}
              className="combo-card__button combo-card__button--quiet"
              showLinkTextWithChildrenPresent
            >
              <ExternalIcon />
            </Link>
          )}
        </div>
      )}
      {variant === 'Content' && !showActions && (
        <div className="combo-card__arrow" aria-hidden="true">
          <ArrowIcon />
        </div>
      )}
    </>
  );

  if (isWholeCardLink && card.primaryLink) {
    return (
      <Link field={card.primaryLink} className={cardClass}>
        {content}
      </Link>
    );
  }

  return <article className={cardClass}>{content}</article>;
}

function CardTitle({
  card,
  variant,
  compact,
  solo,
}: {
  card: CardFields;
  variant: ComboCardVariantName;
  compact: boolean;
  solo: boolean;
}): JSX.Element {
  const className = [
    variant === 'Product' && hasLink(card.primaryLink) ? 'combo-card__title-link' : 'combo-card__title',
    compact ? 'combo-card__title--compact' : '',
    solo ? 'combo-card__title--solo' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'Product' && card.primaryLink && hasLink(card.primaryLink)) {
    return (
      <Link field={card.primaryLink} className={className}>
        <Text field={card.title} />
      </Link>
    );
  }

  return <Text tag="h3" field={card.title} className={className} />;
}

function ComboCardVariant({
  variant,
  ...props
}: ComboCardProps & { variant: ComboCardVariantName }): JSX.Element {
  const { page } = useSitecore();

  return (
    <ComboCardView
      variant={variant}
      fields={props.fields}
      params={props.params}
      isPageEditing={page.mode.isEditing}
    />
  );
}

/** Foundation layout, used when no rendering variant is selected. */
export const Default = (props: ComboCardProps): JSX.Element => (
  <ComboCardVariant variant="Foundation" {...props} />
);

/** Photo, gradient overline, title, body, and two buttons. */
export const Foundation = (props: ComboCardProps): JSX.Element => (
  <ComboCardVariant variant="Foundation" {...props} />
);

/** Gray surface card. Buttons are hidden until the Buttons parameter is Show. */
export const Resource = (props: ComboCardProps): JSX.Element => (
  <ComboCardVariant variant="Resource" {...props} />
);

/** Horizontal thumbnail and title, used for compact homepage rows. */
export const Homepage = (props: ComboCardProps): JSX.Element => (
  <ComboCardVariant variant="Homepage" {...props} />
);

/** Contained product image, linked title, outline action, and icon action. */
export const Product = (props: ComboCardProps): JSX.Element => (
  <ComboCardVariant variant="Product" {...props} />
);

/** Text card with a trailing arrow. The whole card uses the primary link. */
export const Content = (props: ComboCardProps): JSX.Element => (
  <ComboCardVariant variant="Content" {...props} />
);

/** Icon tile, optional logo, rich text, ghost links, and a filled or outline button. */
export const Variations = (props: ComboCardProps): JSX.Element => (
  <ComboCardVariant variant="Variations" {...props} />
);
