/**
 * Theming.
 *
 * Supports the preferred color scheme of the operation system as well as
 * the theme choice of the user.
 */
const themeToggle = document.querySelector(".theme-toggle");
let chosenTheme = window.localStorage && window.localStorage.getItem("theme");
let chosenThemeIsDark = chosenTheme == "dark";
let chosenThemeIsLight = chosenTheme == "light";

// Detect the color scheme the operating system prefers.
function detectOSColorTheme() {
  chosenTheme = window.localStorage && window.localStorage.getItem("theme");
  chosenThemeIsDark = chosenTheme == "dark";
  chosenThemeIsLight = chosenTheme == "light";

  let utteranceTheme = {};

  if (chosenThemeIsDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    utteranceTheme = window.UtteranceDark;
  } else if (chosenThemeIsLight) {
    document.documentElement.setAttribute("data-theme", "light");
    utteranceTheme = window.UtteranceLight;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");

    utteranceTheme = window.UtteranceDark;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    utteranceTheme = window.UtteranceLight;
  }

  let utteranceDiv = document.querySelector(".utterances");
  if (utteranceDiv) {
    let new_utterance = document.createElement("script");
    new_utterance.setAttribute("id", "utterances");
    new_utterance.setAttribute("src", "https://utteranc.es/client.js");
    new_utterance.setAttribute("repo", window.UtteranceRepository);
    new_utterance.setAttribute("label", window.UtteranceLabel);
    new_utterance.setAttribute(
      "issue-term",
      window.UtteranceIssueTerm,
    );
    new_utterance.setAttribute("theme", utteranceTheme);
    new_utterance.setAttribute(
      "crossorigin",
      "anonymous",
    );
    new_utterance.setAttribute("async", true);

    utteranceDiv.parentNode.replaceChild(new_utterance, utteranceDiv);
  }
}

// Switch the theme.
function switchTheme(e) {
  if (chosenThemeIsDark) {
    localStorage.setItem("theme", "light");
  } else if (chosenThemeIsLight) {
    localStorage.setItem("theme", "dark");
  } else {
    if (document.documentElement.getAttribute("data-theme") == "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  }

  detectOSColorTheme();
  //window.location.reload();
}

// Event listener
if (themeToggle) {
  themeToggle.addEventListener("click", switchTheme, false);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());

  detectOSColorTheme();
} else {
  localStorage.removeItem("theme");
}
