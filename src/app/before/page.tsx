import MapSection from "../components/MapSection";
import Navbar from "../components/Navbar";
import DateTimeSection from "../components/sections/DateTimeSection";
import DressCodeSection from "../components/sections/DressCodeSectionSection";
import FooterSection from "../components/sections/FooterSection";
import HeaderSection from "../components/sections/HeaderSection";
import ImagesSection from "../components/sections/ImagesSection";
import InviteSection from "../components/sections/InviteSection";
import SeatMapSection from "../components/sections/SeatMapSection";

export default function BeforePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      {/* added below so overflow absolute don't cause scrollable */}
      {/* https://stackoverflow.com/questions/64344836/absolutely-positioned-elements-adding-scroll-on-mobile */}
      <meta name="viewport" content="initial-scale=1.0, user-scalable=0" />
      {/* <a
        href="#seat-map"
        className="bg-white fixed bottom-2 right-2 z-50 ring-2 px-2 py-1 rounded-md text-lg ring-primary shadow-inner"
      >
        Find my seat 🪑
      </a> */}

      <HeaderSection />

      <InviteSection />
      {/* <VideoSection /> */}
      <MapSection />

      <DateTimeSection />
      <ImagesSection />
      <DressCodeSection />
      <SeatMapSection />

      {/* <FormSection /> */}
      <FooterSection />
    </main>
  );
}
