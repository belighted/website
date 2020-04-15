import React from "react";
import Layout from "../components/layout/Layout";
import CategoriesList from "../components/categories/CategoriesList";
import BlogpostsList from "../components/blog/BlogpostsList";
import { findSection, Section } from "../components/layout/Section";
import { graphql } from "gatsby";
import Hero from "../components/home/hero/Hero";
import HomeProcess from "../components/home/process/Process";
import * as PropTypes from "prop-types";
import Cases from "../components/home/cases/Cases";
import Statistics from "../components/home/statistics/Statistics";
import Clients from "../components/home/clients/Clients";
import LastScene from "../components/splits/LastScene";

Cases.propTypes = { sections: PropTypes.any };
export default function Homepage({
  pageContext,
  data: {
    contentYaml: { sections, cases, slides },
    allPostsYaml: { nodes: posts }
  }
}) {
  return (
    <Layout context={pageContext} page={"home"}>
      <Hero slides={slides} />
      <Section
        section={findSection(sections, "categories")}
        modifier="light-bg"
      >
        <CategoriesList />
      </Section>
      <HomeProcess section={findSection(sections, "process")} />
      <Cases section={findSection(sections, "cases")} cases={cases} />
      <Statistics section={findSection(sections, "statistics")} />
      <LastScene />
      <Clients section={findSection(sections, "clients")} />
      <Section section={findSection(sections, "blog")} modifier="light-bg">
        <BlogpostsList nodes={posts} />
      </Section>
    </Layout>
  );
}

export const query = graphql`
  query Homepage($lang: String!) {
    contentYaml(slug: { eq: "home" }, lang: { eq: $lang }) {
      sections {
        slug
        title
        body
        subtitle
        button
      }

      slides {
        title
        body
        buttons {
          title
          modifier
        }
      }

      cases {
        ...HomeCaseItem
      }
    }
    allPostsYaml(
      limit: 3
      sort: { fields: [date], order: [DESC] }
      filter: { lang: { eq: $lang } }
    ) {
      nodes {
        slug
        title
      }
    }
  }
`;
