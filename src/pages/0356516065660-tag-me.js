import React, { useEffect } from "react";
import { navigate } from "gatsby";

const TagMePage = () => {
  useEffect(() => {
    document.cookie = "ga_internal=true; path=/; max-age=31536000";
    navigate("/");
  }, []);

  return <p>Tagging you as internal and redirecting…</p>;
};

export default TagMePage;

export const Head = () => (
  <>
    <title>Internal Tracking Tag Set</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);
