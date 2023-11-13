"use client"; // for translation to work
import HamburgerNav from "../components/HamburgerNav";
import MapSection from "../components/MapSection";
import FooterSection from "../components/sections/FooterSection";
import HeaderSection from "../components/sections/HeaderSection";
import ImagesSection from "../components/sections/ImagesSection";
import InviteSection from "../components/sections/InviteSection";
import LineInviteSection from "../components/sections/LineInviteSection";
import RsvpSection from "../components/sections/RsvpSection";
import SightSeeingSection from "../components/sections/SightSeeingSection";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* <Navbar /> */}
        <HamburgerNav />
        <HeaderSection />
        <InviteSection />
        <MapSection />
        <RsvpSection />
        {/* added below so overflow absolute don't cause scrollable */}
        {/* https://stackoverflow.com/questions/64344836/absolutely-positioned-elements-adding-scroll-on-mobile */}
        <meta name="viewport" content="initial-scale=1.0, user-scalable=0" />
        {/* <a
        href="#seat-map"
        className="bg-white fixed bottom-2 right-2 z-50 ring-2 px-2 py-1 rounded-md text-lg ring-primary shadow-inner"
      >
        Find my seat 🪑
      </a> */}
        {/* <HeaderSection /> */}

        {/* <VideoSection /> */}

        {/* <DateTimeSection /> */}

        <ImagesSection />

        <LineInviteSection />
        <SightSeeingSection />
        {/* <SeatMapSection /> */}
        {/* <FormSection /> */}
        <FooterSection />
      </main>
    </div>
  );
}
