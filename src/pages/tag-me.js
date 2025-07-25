import React, { useEffect } from "react";
import Button from "../components/Button";

const TagMePage = () => {
  useEffect(() => {
    document.cookie = "zen_internal=true; path=/; max-age=31536000";
    
    if (!sessionStorage.getItem("justTagged")) {
      sessionStorage.setItem("justTagged", "true");
      window.location.reload();
    } else {
      sessionStorage.removeItem("justTagged");
    }

  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center text-primary">
      <h1 className="text-3xl font-semibold mb-4">You're Tagged as Internal</h1>
      <p className="text-lg">
        We’ve set a cookie so you’ll be <strong>excluded from analytics</strong><br />
        (Google Tag Manager, Clarity, Meta Pixel).
      </p>
      <p className="mt-4 text-sm text-gray-500">
        You can remove the tag at any time by visiting <a href="/untag-me" className="underline text-accent">/untag-me</a>.
      </p>
      <div className="text-center my-12">
        <Button to="/" size="lg" color="accent">
            Go to Homepage
        </Button>
      </div>

    </main>
  );
};

export default TagMePage;

export const Head = () => (
  <>
    <title>Internal Tracking Tag Set</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);
