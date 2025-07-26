
import React, { useEffect } from "react";

const UnTagMePage = () => {
  useEffect(() => {
    document.cookie = "zen_internal=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    if (!sessionStorage.getItem("justUntagged")) {
      sessionStorage.setItem("justUntagged", "true");
      window.location.reload();
    } else {
      sessionStorage.removeItem("justUntagged");
    }
    
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center text-primary">
      <h1 className="text-3xl font-semibold mb-4">Tracking Re-enabled</h1>
      <p className="text-lg">
        We’ve removed a cookie so you’ll be <strong>included in analytics</strong><br />
        (Google Tag Manager, Clarity, Meta Pixel).
      </p>
      <p className="mt-4 text-sm text-gray-500">
        You can exclude yourself anytime by visiting <a href="/tag-me" className="underline text-accent">/tag-me</a>.
      </p>
    </main>
  );
};

export default UnTagMePage;

export const Head = () => (
  <>
    <title>Internal Tracking Tag Removed</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);
