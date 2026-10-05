import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link,
  Text,
  RichTextField,
  RichText,
  NextImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Image1: ImageField;
  Title1: Field<string>;
  Text1: RichTextField;
  Title2: Field<string>;
  Text2: RichTextField;
  Title3: Field<string>;
  Text3: RichTextField;
  Title4: Field<string>;
  Text4: RichTextField;
  Copyright: Field<string>;
  Link1: LinkField;
  Link2: LinkField;
  SocialsTitle: Field<string>;
  SocialLink1: LinkField;
  SocialIcon1: ImageField;
  SocialLink2: LinkField;
  SocialIcon2: ImageField;
  SocialLink3: LinkField;
  SocialIcon3: ImageField;
}

export type FooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FooterSocialLinks = ({ fields }: { fields: Fields }): JSX.Element | null => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const socialLinks = [
    { link: fields?.SocialLink1, icon: fields?.SocialIcon1 },
    { link: fields?.SocialLink2, icon: fields?.SocialIcon2 },
    { link: fields?.SocialLink3, icon: fields?.SocialIcon3 },
  ].filter(({ link }) => isPageEditing || link?.value?.href);

  if (!socialLinks.length) {
    return null;
  }

  return (
    <div className="footer-socials">
      {socialLinks.map(({ link, icon }, index) => (
        <Link key={index} field={link}>
          <NextImage field={icon} width={20} height={20} />
        </Link>
      ))}
    </div>
  );
};

export const Default = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component component-spaced footer ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="footer-main">
          <div className="row footer-columns g-4 g-xl-5">
            <div className="col-12 col-sm-6 col-lg-3 footer-logo-col">
              <NextImage
                field={props.fields?.Image1}
                width={200}
                height={60}
                className="footer-logo img-fluid"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-3 footer-column">
              <div className="title">
                <Text field={props.fields?.Title1} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text1} />
              </div>
              <div className="footer-utility">
                <RichText field={props.fields?.Text4} />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 footer-column">
              <div className="title">
                <Text field={props.fields?.Title2} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text2} />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 footer-column footer-promo">
              <div className="title">
                <Text field={props.fields?.Title3} />
              </div>
              <div className="links footer-promo-content">
                <RichText field={props.fields?.Text3} />
              </div>
            </div>
          </div>
        </div>

        <FooterSocialLinks fields={props.fields} />

        <div className="footnote">
          <div className="legal-links">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </div>
          <div className="copyright">
            <Text field={props.fields?.Copyright} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const WithSocials = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component component-spaced footer with-socials ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="footer-main">
          <div className="row footer-columns g-4 g-xl-5">
            <div className="col-12 col-sm-6 col-lg-3 footer-logo-col">
              <NextImage
                field={props.fields?.Image1}
                width={200}
                height={60}
                className="footer-logo img-fluid"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-3 footer-column">
              <div className="title">
                <Text field={props.fields?.Title1} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text1} />
              </div>
              <div className="footer-utility">
                <RichText field={props.fields?.Text4} />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 footer-column">
              <div className="title">
                <Text field={props.fields?.Title2} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text2} />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 footer-column footer-promo">
              <div className="title">
                <Text field={props.fields?.SocialsTitle} />
              </div>
              <div className="links footer-promo-content">
                <RichText field={props.fields?.Text3} />
              </div>
            </div>
          </div>
        </div>

        <FooterSocialLinks fields={props.fields} />

        <div className="footnote">
          <div className="legal-links">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </div>
          <div className="copyright">
            <Text field={props.fields?.Copyright} />
          </div>
        </div>
      </div>
    </div>
  );
};
