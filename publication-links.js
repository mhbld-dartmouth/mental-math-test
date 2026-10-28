/* MHBLD publication links and citation. Does not modify test logic. */
(() => {
  "use strict";

  const HOME = "https://mhbld-dartmouth.github.io/mental-math-test/";
  const SOURCE = "https://github.com/mhbld-dartmouth/mental-math-test";
  const DOI = "https://doi.org/10.5281/zenodo.23740026";
  const CITATION = "Bhat, Y. R. (2026). Mental Math Assessment (Version 1.0.0) [Computer software]. Zenodo. " + DOI;

  function makeLink(label, href) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  function citationPanel() {
    const panel = document.createElement("section");
    panel.className = "research-citation";
    panel.setAttribute("aria-label", "Software citation and links");
    const heading = document.createElement("h2");
    heading.textContent = "Software citation";
    const intro = document.createElement("p");
    intro.textContent = "If you use this assessment in a publication or project, please cite the archived software:";
    const cite = document.createElement("p");
    cite.className = "citation-line";
    cite.textContent = CITATION;
    const links = document.createElement("nav");
    links.className = "citation-links";
    links.setAttribute("aria-label", "Assessment resources");
    links.append(
      makeLink("Open assessment", HOME),
      makeLink("GitHub source code", SOURCE),
      makeLink("Zenodo DOI", DOI)
    );
    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "citation-copy";
    copy.textContent = "Copy citation";
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CITATION);
        copy.textContent = "Copied";
      } catch (_) {
        /* The citation remains visible and selectable if clipboard is unavailable. */
        copy.textContent = "Select citation above to copy";
      }
    });
    links.append(copy);
    panel.append(heading, intro, cite, links);
    return panel;
  }

  function addPanelTo(screenId) {
    const screen = document.getElementById(screenId);
    if (!screen || screen.querySelector(".research-citation")) return;
    const footer = screen.querySelector(".site-footer");
    if (footer) footer.before(citationPanel());
    else screen.append(citationPanel());
  }

  function init() {
    const intro = document.getElementById("intro-screen");
    if (intro && !intro.querySelector(".resource-nav")) {
      const nav = document.createElement("nav");
      nav.className = "resource-nav";
      nav.setAttribute("aria-label", "Assessment webpage and software resources");
      nav.append(
        makeLink("Live assessment", HOME),
        makeLink("Source code", SOURCE),
        makeLink("Zenodo DOI", DOI)
      );
      const subtitle = intro.querySelector(".intro-subtitle");
      if (subtitle) subtitle.after(nav);
      else intro.prepend(nav);
    }
    addPanelTo("intro-screen");
    addPanelTo("results-screen");
    /* The countdown and timed test screens are intentionally untouched. */
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
