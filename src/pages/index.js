import React from "react";
import Layout from "../components/layout/Layout";
import CategoriesList from "../components/categories/CategoriesList";
import StatisticsList from "../components/statistics/StatisticsList";
import CasesList from "../components/cases/CasesList";
import TestimonialsList from "../components/testimonials/TestimonialsList";
import ProcessesList from "../components/processes/ProcessesList";
import BlogpostsList from "../components/blog/BlogpostsList";
import { findSection, Section } from "../components/sections";

export default function IndexPage({
  pageContext,
  data: {
    contentYaml: { sections }
  }
}) {
  return (
    <Layout context={pageContext} page={"home"}>
      <Section section={findSection(sections, "hero")}>
        <h2>Hero</h2>
        <ul>
          {findSection(sections, "hero").slides.map(slide => (
            <li key={slide.title}>{slide.title}</li>
          ))}
        </ul>
      </Section>
      <Section section={findSection(sections, "categories")}>
        <CategoriesList />
      </Section>
      <Section section={findSection(sections, "process")}>
        <ProcessesList />
      </Section>
      <Section section={findSection(sections, "cases")}>
        <CasesList />
      </Section>

      <Section section={findSection(sections, "statistics")}>
        <StatisticsList />
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
        slides {
          title
        }
      }
    }
  }
`;
