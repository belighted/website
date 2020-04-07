import React from "react";
import info from "../../../../../content/data/info.json";
import Youtube from "../../../../../assets/feather/youtube.svg";
import Twitter from "../../../../../assets/feather/twitter.svg";
import Instagram from "../../../../../assets/feather/instagram.svg";
import RSS from "../../../../../assets/feather/rss.svg";
import Facebook from "../../../../../assets/feather/facebook.svg";
import LinkedIn from "../../../../../assets/feather/linkedin.svg";
import Github from "../../../../../assets/feather/github.svg";

const icons = {
  youtube: Youtube,
  twitter: Twitter,
  instagram: Instagram,
  rss: RSS,
  facebook: Facebook,
  linkedin: LinkedIn,
  github: Github
};

const Social = () => {
  return (
    <div className="l-grid l-grid--4cols u-margin-top">
      {info.contact.social.map(social => {
        const Component = icons[social.icon];
        return (
          <a
            href={social.link}
            className="c-button c-button--outline-primary"
            key={social.icon}
          >
            <Component />
          </a>
        );
      })}
    </div>
  );
};

export default Social;
