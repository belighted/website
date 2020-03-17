import React from "react";
import Layout from "../components/layout/Layout";
import DevNote from "../components/dev/DevNote";

export default function IndexPage({ pageContext }) {
  return (
    <Layout context={pageContext} page={"home"}>
      <section className="c-section">
        <h2>Hero</h2>
        <DevNote>slides qui ne sont affichées que sur la home</DevNote>
      </section>
      <section className={"c-section"}>
        <h2>What we do</h2>
        <DevNote>Liste des services ?</DevNote>
      </section>
      <section className={"c-section"}>
        <h2>How we work</h2>
        <DevNote>Liste des process ?</DevNote>
      </section>
      <section className={"c-section"}>
        <h2>Success stories</h2>
        <DevNote>Liste des cases</DevNote>
      </section>

      <section className={"c-section"}>
        <h2>Belighted by the numbers</h2>
        <DevNote>Liste des statistiques</DevNote>
      </section>

      <section className={"c-section"}>
        <h2>Success stories</h2>
        <DevNote>Liste des testimonials</DevNote>
      </section>

      <section className={"c-section"}>
        <h2>Latest SaaS & Software Stories</h2>
        <DevNote>Liste des derniers elements du blog</DevNote>
      </section>
    </Layout>
  );
}
