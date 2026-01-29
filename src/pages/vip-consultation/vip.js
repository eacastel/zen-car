// src/pages/vip-consultation/vip.js

import React from "react";
import Seo from '../../components/Seo'
import VipConsultationPage from "../vip-consultation";

export default function VipConsultationVip() {
  return <VipConsultationPage forceVip />;
}

export const Head = () => (
  <Seo
    title="VIP Consultation"
    description="Schedule your consultation with a Zen Guide."
    pathname="/vip-consultation/vip/"
    noIndex={true}
  />
);