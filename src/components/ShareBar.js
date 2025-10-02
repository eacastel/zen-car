// src/components/ShareBar.js
import React, { useEffect, useMemo, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";

function ensureAbsolute(url, siteUrl) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  // treat as path
  const base = siteUrl?.replace(/\/+$/, "") || "";
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${base}${path}`;
}

function addUtm(url, source) {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", source.toLowerCase());
    u.searchParams.set("utm_medium", "social");
    u.searchParams.set("utm_campaign", "blog");
    return u.toString();
  } catch {
    return url;
  }
}

export default function ShareBar({ url, title }) {
  // 1) get siteUrl from gatsby-config (to build absolute URLs)
  const { site } = useStaticQuery(graphql`
    query ShareBarSiteUrl {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);
  const siteUrl = site?.siteMetadata?.siteUrl || "";

  // 2) resolve the share URL on the client if not provided
  const [resolvedUrl, setResolvedUrl] = useState("");
  useEffect(() => {
    // prefer explicit prop, else use window.location.href, else window.location.pathname + siteUrl
    let candidate = url;
    if (!candidate && typeof window !== "undefined") {
      candidate = window.location.href || window.location.pathname || "/";
    }
    setResolvedUrl(ensureAbsolute(candidate, siteUrl));
  }, [url, siteUrl]);

  // 3) build encoded URLs with UTM
  const { fb, li, tw, wa, copyUrl } = useMemo(() => {
    const base = resolvedUrl || "";
    const titleText = title || "";
    const withUtm = (platform) => addUtm(base, platform);
    const enc = encodeURIComponent;

    const uFb = withUtm("Facebook");
    const uLi = withUtm("LinkedIn");
    const uTw = withUtm("X");
    const uWa = withUtm("WhatsApp");

    return {
      fb: `https://www.facebook.com/sharer/sharer.php?u=${enc(uFb)}`,
      li: `https://www.linkedin.com/shareArticle?mini=true&url=${enc(uLi)}&title=${enc(titleText)}`,
      tw: `https://twitter.com/intent/tweet?url=${enc(uTw)}&text=${enc(titleText)}`,
      wa: `https://api.whatsapp.com/send?text=${enc(`${titleText} ${uWa}`)}`,
      copyUrl: withUtm("Copy"),
    };
  }, [resolvedUrl, title]);

  const track = (platform) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "share_click",
        platform,
        page_path: typeof window !== "undefined" ? window.location.pathname : "",
        page_title: title || "",
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyUrl);
      track("Copy");
      alert("Link copied!");
    } catch {
      // silent fail
    }
  };

  // If we haven't resolved a URL yet, render nothing to avoid empty share links
  if (!resolvedUrl) return null;

  return (
    <nav aria-label="Share this article"
         className="mt-4 mb-6 flex flex-wrap gap-2 sticky top-20 z-10">
      <a
        href={fb}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("Facebook")}
        className="px-3 py-1 text-sm rounded-lg bg-primary text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Facebook
      </a>
      <a
        href={li}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("LinkedIn")}
        className="px-3 py-1 text-sm rounded-lg bg-primary text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        LinkedIn
      </a>
      <a
        href={tw}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("X")}
        className="px-3 py-1 text-sm rounded-lg bg-primary text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        X
      </a>
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("WhatsApp")}
        className="px-3 py-1 text-sm rounded-lg bg-primary text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        WhatsApp
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="px-3 py-1 text-sm rounded-lg bg-secondary text-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        aria-label="Copy share link"
      >
        Copy link
      </button>
    </nav>
  );
}
