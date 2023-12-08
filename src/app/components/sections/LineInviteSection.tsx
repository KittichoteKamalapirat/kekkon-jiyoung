"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import SectionWrapper from "../wrappers/SectionWrapper";
import { useTranslations } from "next-intl";
import { useAnimateOnSroll } from "../../hooks/useAnimateOnScroll";
import { Button } from "../../../components/ui/button";
import { ICON_SIZE, LINE_LINK } from "../../../constants";
import { IoMdAdd } from "react-icons/io";
interface Props {}

const LineInviteSection = ({}: Props) => {
  const lineInvite = useTranslations("lineInvite");
  const { ref: sectionRef, animateClassName } = useAnimateOnSroll();
  return (
    <SectionWrapper className="mx-8 relative w-screen h-[80vh] md:h-[60vh] flex items-center justify-center">
      {/* dummy */}
      <div
        ref={sectionRef}
        className="absolute top-1/2 left-1/2 w-10 h-10 opacity-0"
      />
      <div className={animateClassName}>
        <div className="container">
          <h2 className="heading2 text-center">{lineInvite("title")}</h2>
          <p className="text-center font-[Montserrat]">
            {lineInvite("description")}
          </p>

          <a
            href={LINE_LINK}
            className="hover:bg-primary-hover flex justify-center mt-4"
            target="_blank"
          >
            <Button variant="secondary" type="submit" className="gap-2">
              <IoMdAdd size={ICON_SIZE - 4} />
              {lineInvite("cta")}
            </Button>
          </a>

          <Image
            alt="line invite qr code"
            src="/images/line-qr.webp"
            width={200}
            height={200}
            className="mx-auto mt-4"
          />
        </div>
      </div>
      <div className="translate-x-[calc(8%-10px)] translate-y-0 absolute z-10 top-0 right-0 ">
        <img
          alt="flower"
          src="/images/sakura-top-right.svg"
          className="h-[100px] md:h-[150px] animate-wiggle"
        />
      </div>
    </SectionWrapper>
  );
};
export default LineInviteSection;
