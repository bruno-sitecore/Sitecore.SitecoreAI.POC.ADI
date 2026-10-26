'use client';

import { useId, useState, JSX } from 'react';
import { Field, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';

const ITEM_COUNT = 5;

interface ContentAccordionFields {
  SectionTitle?: Field<string>;
  Title1?: Field<string>;
  Content1?: Field<string>;
  Title2?: Field<string>;
  Content2?: Field<string>;
  Title3?: Field<string>;
  Content3?: Field<string>;
  Title4?: Field<string>;
  Content4?: Field<string>;
  Title5?: Field<string>;
  Content5?: Field<string>;
}

export type ContentAccordionProps = {
  params: { [key: string]: string };
  fields: ContentAccordionFields;
};

type AccordionSlot = {
  title?: Field<string>;
  content?: Field<string>;
};

const hasFieldValue = (field?: Field<string>): boolean => Boolean(field?.value);

const ContentAccordionItem = ({
  item,
  index,
  isOpen,
  isEditing,
  panelId,
  onToggle,
}: {
  item: AccordionSlot;
  index: number;
  isOpen: boolean;
  isEditing: boolean;
  panelId: string;
  onToggle: (index: number) => void;
}): JSX.Element | null => {
  const showItem = isEditing || hasFieldValue(item.title) || hasFieldValue(item.content);

  if (!showItem) {
    return null;
  }

  const isExpanded = isEditing || isOpen;

  return (
    <div className={`content-accordion-item ${isExpanded ? 'expanded' : ''}`}>
      <h3 className="content-accordion-heading">
        <button
          type="button"
          className="button-clear-appearance"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
        >
          <Text field={item.title} />
          <span className="content-accordion-icon" aria-hidden="true" />
        </button>
      </h3>
      {(isExpanded || isEditing) && (
        <div className="content-accordion-panel" id={panelId} role="region">
          <RichText field={item.content} />
        </div>
      )}
    </div>
  );
};

export const Default = (props: ContentAccordionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const fields = props.fields;

  const items: AccordionSlot[] = [
    { title: fields?.Title1, content: fields?.Content1 },
    { title: fields?.Title2, content: fields?.Content2 },
    { title: fields?.Title3, content: fields?.Content3 },
    { title: fields?.Title4, content: fields?.Content4 },
    { title: fields?.Title5, content: fields?.Content5 },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  if (!fields) {
    return (
      <div className={`component content-accordion ${sxaStyles}`} id={id ? id : undefined}>
        <div className="container">
          <span className="is-empty-hint">Content Accordion</span>
        </div>
      </div>
    );
  }

  return (
    <section className={`component content-accordion ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        {(hasFieldValue(fields.SectionTitle) || isEditing) && (
          <Text tag="h2" className="content-accordion-title" field={fields.SectionTitle} />
        )}
        <div className="content-accordion-list">
          {items.slice(0, ITEM_COUNT).map((item, index) => (
            <ContentAccordionItem
              key={`${baseId}-${index}`}
              item={item}
              index={index}
              isOpen={openIndex === index}
              isEditing={isEditing}
              panelId={`${baseId}-panel-${index}`}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
