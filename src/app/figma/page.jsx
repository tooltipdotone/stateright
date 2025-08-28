"use client";
import Layout from "@/components/Layout/Layout";
import MissionSection from "@/components/InfoPage/OurMission";
import OurStory from "@/components/InfoPage/OurStory";
import InfoPageHero from "@/components/InfoPage/InfoPageHero";
import LetsConnect from "@/components/InfoPage/LetsConnect";
import WeStandFor from "@/components/InfoPage/WeStandFor";
import WhereWeWork from "@/components/InfoPage/WhereWeWork";

export default function AboutPage() {
  return (
    <Layout>
      <InfoPageHero />
      <MissionSection />
      <OurStory />
      <WeStandFor />
      <WhereWeWork />
      <LetsConnect />
    </Layout>
  );
}
