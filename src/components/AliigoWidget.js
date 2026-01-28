// src/components/AliigoWidget.js
import { useEffect } from "react";
import { injectAliigoWidget } from "../utils/aliigoWidget";

export default function AliigoWidget() {
  useEffect(() => {
    injectAliigoWidget();
  }, []);

  return null;
}
