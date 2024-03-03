"use client";
import type { CTAProps } from "@/components/small-cta";
import {
  SmallCTA,
  SmallCTAAction,
  SmallCTAIcon,
  SmallCTAInfo,
  SmallCTASubtitle,
  SmallCTATitle,
} from "@/components/small-cta";
import { EnvelopeIcon } from "@heroicons/react/20/solid";

import { CallbackFormModal } from "@/components/modal-callback-form";

const howWeWorkCallToAction: CTAProps = {
  title: "Оставьте заявку",
  subtitle: "Мы свяжемся с вами сразу, как только ее получим",
};

export function HowWeWorkSmallCTA() {
  return (
    <>
      <SmallCTA
        className="mt-6"
        cta={howWeWorkCallToAction}
        info={
          <SmallCTAInfo>
            <SmallCTAIcon icon={<EnvelopeIcon />} />
            <SmallCTATitle />
            <SmallCTASubtitle />
          </SmallCTAInfo>
        }
        action={
          <CallbackFormModal
            dialogTrigger={<SmallCTAAction>Заявка</SmallCTAAction>}
          />
        }
      />
    </>
  );
}
