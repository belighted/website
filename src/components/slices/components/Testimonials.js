import React, { useContext } from "react";
import TestimonialsList from "../../testimonials/TestimonialsList";
import { graphql, useStaticQuery } from "gatsby";
import { I18nContext } from "../../i18n/I18n";

const Testimonials = ({ title, body }) => {
  const {
    allTestimonialsYaml: { nodes: allTestimonialsYaml }
  } = useStaticQuery(graphql`
    {
      allTestimonialsYaml {
        nodes {
          slug
          lang
          author
          client
          body
          role
          image {
            childImageSharp {
              # Specify the image processing specifications right in the query.
              # Makes it trivial to update as your page's design changes.
              fixed(width: 80, height: 80, grayscale: true) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `);
  const lang = useContext(I18nContext);
  const testimonials = allTestimonialsYaml.filter(l => l.lang === lang);

  return (
    <div className="o-wrapper u-margin-vertical">
      <div className="u-margin-bottom">
        <h2 className="c-heading c-heading--2">{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: body }} className="c-body c-body--3"></div>
      </div>
      <TestimonialsList testimonials={testimonials} />
    </div>
  );
};

export default Testimonials;
