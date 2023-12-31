"use client"; // for translation to work
import HamburgerNav from "../components/HamburgerNav";
import MapSection from "../components/MapSection";
import FooterSection from "../components/sections/FooterSection";
import HeaderSection from "../components/sections/HeaderSection";
import ImagesSection from "../components/sections/ImagesSection";
import InviteSection from "../components/sections/InviteSection";
import LineInviteSection from "../components/sections/LineInviteSection";
import RsvpSection from "../components/sections/RsvpSection";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <HamburgerNav />
        <HeaderSection />
        <InviteSection />
        <MapSection />
        <RsvpSection />
        {/* added below so overflow absolute don't cause scrollable */}
        {/* https://stackoverflow.com/questions/64344836/absolutely-positioned-elements-adding-scroll-on-mobile */}
        <meta name="viewport" content="initial-scale=1.0, user-scalable=0" />

        {/* <HeaderSection /> */}

        {/* <VideoSection /> */}

        {/* <DateTimeSection /> */}
        <LineInviteSection />
        <ImagesSection />

        {/* <SightSeeingSection /> */}
        {/* <SeatMapSection /> */}
        {/* <FormSection /> */}
        <FooterSection />
      </main>
    </div>
  );
}
