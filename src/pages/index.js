import React from "react";
import Layout from "../components/layout/Layout";
import CategoriesList from "../components/categories/CategoriesList";
import StatisticsList from "../components/statistics/StatisticsList";
import CasesList from "../components/cases/CasesList";
import TestimonialsList from "../components/testimonials/TestimonialsList";
import ProcessesList from "../components/processes/ProcessesList";
import BlogpostsList from "../components/blog/BlogpostsList";
import { findSection, Section } from "../components/sections";
import LocalizedLink from "../components/links/LocalizedLink";
import { graphql } from "gatsby";
import Hero from "../components/home/hero/Hero";

export default function IndexPage({
  pageContext,
  data: {
    contentYaml: { sections }
  }
}) {
  return (
    <Layout context={pageContext} page={"home"}>
      <Hero />

      <Section section={findSection(sections, "categories")}>
        <CategoriesList />
      </Section>
      <Section section={findSection(sections, "process")}>
        <ProcessesList />
      </Section>
      <Section section={findSection(sections, "cases")}>
        <CasesList />
        <LocalizedLink route={"/clients"}>See all cases</LocalizedLink>
      </Section>

      <Section section={findSection(sections, "statistics")}>
        <StatisticsList />
        <LocalizedLink route={"/about"}>Find out more about us</LocalizedLink>
      </Section>

      <Section section={findSection(sections, "testimonials")}>
        <TestimonialsList />
      </Section>

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
      }
    }
  }
`;
