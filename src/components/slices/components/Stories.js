import React, { useContext } from "react";
import TestimonialsList from "../../testimonials/TestimonialsList";
import { graphql, useStaticQuery } from "gatsby";
import { I18nContext } from "../../i18n/I18n";

const Stories = () => {
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
      <TestimonialsList testimonials={testimonials} />
    </div>
  );
};

export default Stories;
