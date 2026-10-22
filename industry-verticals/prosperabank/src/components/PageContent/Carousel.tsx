import React, { useState, JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  RichTextField,
  LinkField,
  Text,
  Link,
  RichText,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
  Video: ImageField;
}

export type CarouselItemProps = {
  id: string;
  fields: Fields;
};

interface CarouselComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    items: CarouselItemProps[];
  };
}

export const Default = (props: CarouselComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [index, setIndex] = useState(0);
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`component carousel ${sxaStyles}`} id={id ? id : undefined}>
      <div className="carousel-inner">
        {props.fields.items.map((item, i) => (
          <div key={i} className={'carousel-item ' + (i == index ? 'active' : '')}>
            {!isPageEditing && item.fields?.Video?.value?.src ? (
              <video
                className="carousel-item-media"
                key={item.id}
                autoPlay={true}
                loop={true}
                muted
                playsInline
                poster={item.fields.Image?.value?.src}
              >
                <source src={item.fields.Video.value.src} type="video/webm" />
              </video>
            ) : (
              <NextImage
                field={item.fields.Image}
                className="carousel-item-media"
                width={1920}
                height={800}
              />
            )}

            <div className="side-content">
              <div className="container">
                <div className="col-lg-6 col-md-7 carousel-content">
                  <h1 className="carousel-title">
                    <Text field={item.fields.Title}></Text>
                  </h1>
                  <div className="carousel-body">
                    <RichText field={item.fields.Text}></RichText>
                  </div>
                  {(isPageEditing || item.fields?.Link?.value?.href) && (
                    <Link field={item.fields.Link} className="button button-carousel"></Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-indicators-wrapper">
        <div className="container">
          <ol className="carousel-indicators">
            {props.fields.items.map((_item, i) => (
              <li
                key={i}
                aria-label="Slide"
                className={i == index ? 'active' : ''}
                onClick={() => setIndex(i)}
              ></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
