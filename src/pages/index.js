import React from "react";
import Layout from "../components/layout/Layout";
import CategoriesList from "../components/categories/CategoriesList";
import BlogpostsList from "../components/blog/BlogpostsList";
import { findSection, Section } from "../components/layout/Section";
import { graphql } from "gatsby";
import Hero from "../components/home/hero/Hero";
import HomeProcess from "../components/home/process/Process";
import Cases from "../components/home/cases/Cases";
import Statistics from "../components/home/statistics/Statistics";
import Clients from "../components/home/clients/Clients";
import LastScene from "../components/splits/LastScene";

export default function Homepage({
  pageContext,
  data: {
    singlesYaml: { sections, cases, slides, statistics },
    posts: { nodes: posts },
    allTestimonialsYaml: { nodes: testimonials }
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
      <Statistics
        section={findSection(sections, "statistics")}
        statistics={statistics}
      />
      <LastScene />
      <Clients
        section={findSection(sections, "clients")}
        testimonials={testimonials}
      />
      <Section section={findSection(sections, "blog")} modifier="light-bg">
        <BlogpostsList nodes={posts} />
      </Section>
    </Layout>
  );
}

export const query = graphql`
  query Homepage($lang: String!) {
    singlesYaml(slug: { eq: "home" }, lang: { eq: $lang }) {
      sections {
        slug
        title
        body
        subtitle
        button
      }
      statistics {
        value
        label
      }
      slides {
        title
        body
        buttons {
          title
          modifier
          link
        }
      }

      cases {
        ...HomeCaseItem
      }
    }
    allTestimonialsYaml(filter: { lang: { eq: $lang } }) {
      nodes {
        slug
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
    posts: allMarkdownRemark(
      limit: 3
      sort: { fields: frontmatter___date, order: [DESC] },
      filter: {
        frontmatter: { lang: { eq: $lang } }
        fields: { collection: { eq: "articles" } }
      }
    ) {
      nodes {
        frontmatter {
          slug
          title
        }
        excerpt
      }
    }
  }
`;
