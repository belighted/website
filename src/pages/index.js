import React from "react";
import Layout from "../components/layout/Layout";
import CategoriesList from "../components/categories/CategoriesList";
import BlogpostsList from "../components/blog/BlogpostsList";
import { findSection, Section } from "../components/sections";
import { graphql } from "gatsby";
import Hero from "../components/home/hero/Hero";
import HomeProcess from "../components/home/process/Process";
import * as PropTypes from "prop-types";
import Cases from "../components/home/cases/Cases";
import Statistics from "../components/home/statistics/Statistics";
import Clients from "../components/home/clients/Clients";

Cases.propTypes = { sections: PropTypes.any };
export default function Homepage({
  pageContext,
  data: {
    contentYaml: { sections }
  }
}) {
  return (
    <Layout context={pageContext} page={"home"}>
      <Hero />

      <Section
        section={findSection(sections, "categories")}
        modifier="light-bg"
      >
        <CategoriesList />
      </Section>
      <HomeProcess section={findSection(sections, "process")} />
      <Cases section={findSection(sections, "cases")} />
      <Statistics section={findSection(sections, "statistics")} />
      <Clients section={findSection(sections, "clients")} />
      <Section section={findSection(sections, "blog")}>
        <BlogpostsList />
      </Section>
    </Layout>
  );
}

export const query = graphql`
  {
    contentYaml(slug: { eq: "home" }) {
      sections {
        slug
        title
        body
        subtitle
      }
    }
  }
`;
