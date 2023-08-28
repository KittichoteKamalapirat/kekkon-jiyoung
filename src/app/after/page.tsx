import React from "react";
import SharePhotosSection from "../components/sections/SharePhotosSection";
import Navbar from "../components/Navbar";

interface Props {}

const AfterPage = ({}: Props) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center overflow-hidden">
      <Navbar />
      <SharePhotosSection />
    </main>
  );
};
export default AfterPage;
