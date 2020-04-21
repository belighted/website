import React  from "react";
import GatsbyImage from "gatsby-image";

const TestimonialsList = ({ testimonials }) => {
  //const [currentIndex] = useState(0);
  //const node = testimonials[currentIndex];
  return (
    <ul className="o-list-bare">
      {testimonials.map(node => (
        <li className="u-margin-bottom c-quote" key={node.slug}>
          <div className="o-box o-box--large o-box--brand-bg u-margin-bottom c-quote__body">
            <div className="c-body c-body--3 u-color-white">
              <span className="c-quote__open-quote">&quot;</span>
              {node.body}
              <span className="c-quote__close-quote">&quot;</span>
            </div>
          </div>
          <div className="o-flag">
            <div className="o-flag__img">
              <div className="c-avatar c-avatar--small">
                <GatsbyImage fixed={node.image.childImageSharp.fixed} />
              </div>
            </div>
            <p className="o-flag__body c-quote-author">
              <span className="c-body c-body--3 c-quote-author__name">
                {node.author}
              </span>
              <span className="c-body c-body--2 c-quote-author__role">
                {node.role}
              </span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TestimonialsList;
