import React, { useEffect } from "react";
import { navigate } from "gatsby";

const UnTagMe = () => {
  useEffect(() => {
    document.cookie = "ga_internal=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  }, []);

  return <p>Removing internal tag and redirecting…</p>;
};

export default UnTagMe;

export const Head = () => (
  <>
    <title>Internal Tracking Tag UnSet</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);