import { HeaderConstrained } from "@/components/headers/header-constrained";
import { FooterFourColumnWithCompanyMissionOnDark } from "@/ui/home/footer-four-column-with-company-mission-on-dark";

type Props = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: Props) {
  return (
    <div>
      <HeaderConstrained />
      {children}
      <FooterFourColumnWithCompanyMissionOnDark />
    </div>
  );
}
