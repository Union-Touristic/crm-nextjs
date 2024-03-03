import { HowWeWork } from "@/components/HowWeWork/how-we-work";
import { WhyUs } from "@/components/WhyUs";
import { CallbackForm } from "@/components/callback-form";
import { ContactSectionSideBySideGrid } from "@/components/contact-section/side_by_side_grid";
import { CTASectionTwoColumnsWithPhotoOnDark } from "@/components/cta-sections/two-columns-with-photo-on-dark";
import { HeaderSectionCentered } from "@/components/header-sections/centered";
import { HeroWithImageTiles } from "@/components/heroes/with-image-tiles";
import { LogoClouds } from "@/components/logo-clouds";
import { PopularDestinations } from "@/components/popular-destinations";

export default async function HomePageWithRedirection() {
  return (
    <main>
      <HeroWithImageTiles />
      <LogoClouds />
      <CTASectionTwoColumnsWithPhotoOnDark />
      <PopularDestinations />
      <WhyUs />
      <HowWeWork />
      <HeaderSectionCentered>
        <div className="mx-auto mt-10 max-w-sm">
          <CallbackForm />
        </div>
      </HeaderSectionCentered>
      <ContactSectionSideBySideGrid />
    </main>
  );
}
