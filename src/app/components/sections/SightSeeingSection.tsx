"use client";
/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import SectionWrapper from "../wrappers/SectionWrapper";
import Image from "next/image";

interface Props {}

interface Link {
  imageUrl: string;
  label: string;
  externalUrl: string;
}

const SightSeeingSection = ({}: Props) => {
  const gimcheon = useTranslations("gimcheon");

  const links: Link[] = [
    {
      imageUrl: "/images/sightseeing.webp",
      label: gimcheon("sightseeingLabel"),
      externalUrl:
        "https://www.trip.com/toplist/tripbest/gimcheon-si-best-things-to-do-111001446513/",
    },
    {
      imageUrl: "/images/food.webp",
      label: gimcheon("restaurantsLabel"),
      externalUrl: "",
    },
    {
      imageUrl: "/images/hotel.webp",
      label: gimcheon("hotelsLabel"),
      externalUrl:
        "https://www.agoda.com/ko-kr/search?city=212493&checkIn=2024-04-26&los=1&rooms=1&adults=2&children=0&locale=ko-kr&ckuid=78323e0e-36be-43ef-8ebd-81dc2f4c49f3&prid=0&currency=JPY&correlationId=52142ef7-3532-4790-8587-adadbb86b206&analyticsSessionId=8830242485623837409&pageTypeId=5&realLanguageId=9&languageId=9&origin=JP&cid=1844104&userId=78323e0e-36be-43ef-8ebd-81dc2f4c49f3&whitelabelid=1&loginLvl=0&storefrontId=3&currencyId=11&currencyCode=JPY&htmlLanguage=ko-kr&cultureInfoName=ko-kr&machineName=hk-geoweb-2001&trafficGroupId=1&sessionId=3mryij5mx51hvdbgv2oh3ise&trafficSubGroupId=84&aid=130589&useFullPageLogin=true&cttp=4&isRealUser=true&mode=production&browserFamily=Chrome&checkOut=2024-04-27&priceCur=JPY&textToSearch=%EA%B9%80%EC%B2%9C&travellerType=1&familyMode=off&productType=-1",
    },
  ];

  return (
    <SectionWrapper className="relative py-32 md:py-40 w-screen ">
      <div className=" px-4 py-20 w-fit mx-auto sm:min-w-[400px]">
        <h2 className="heading2 text-center">{gimcheon("title")}</h2>

        <ul className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {links.map((link, index) => (
            <li className="relative" key={`info-${index}`}>
              <a href={link.externalUrl} target="_blank">
                <Image
                  alt={link.label}
                  src={link.imageUrl}
                  width={400}
                  height={400}
                  className="rounded-lg hover:cursor-pointer shadow-lg brightness-50 hover:brightness-100 transition-all duration-500 ease-in-out peer-hover:brightness-90"
                />
                <p className="absolute top-1/2 left-1/2 z-10 text-white font-bold -translate-x-1/2 text-3xl -translate-y-1/2 peer hover:cursor-pointer pointer-events-none shadow-xl">
                  {link.label}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="translate-x-[calc(8%-24px)] translate-y-1/3 absolute z-10 top-0 left-0 ">
        <img
          alt="flower"
          src="/images/sakura-top-left.svg"
          className="h-[100px] md:h-[150px] animate-wiggle"
        />
      </div>
      <Image
        alt="Korean Temple"
        src="/images/temple.svg"
        width={200}
        height={200}
        className="absolute mx-auto"
      />
      <Image
        alt="Wheel"
        src="/images/wheel.svg"
        width={200}
        height={200}
        className="mx-auto"
      />
    </SectionWrapper>
  );
};
export default SightSeeingSection;
