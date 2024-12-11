import { useEffect } from "react";

const GoogleTranslate = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,hi,te,ta,kn,ml,mr,gu",
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

    const style = document.createElement('style');
    style.innerHTML = `
      .skiptranslate iframe {
        display: none !important;
      }
      .goog-te-banner-frame {
        display: none !important;
      }
      body {
        top: 0px !important;
        position: static !important;
      }
      .goog-te-gadget {
        color: transparent !important;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        padding: 8px 12px !important;
        background-color: white;
      }
      .goog-te-gadget .goog-te-combo {
        padding: 8px 28px 8px 10px !important; /* Increased right padding */
        border-radius: 6px;
        border: 1px solid #ddd;
        color: #333;
        font-size: 14px;
        outline: none;
        background-color: white;
        cursor: pointer;
        transition: all 0.2s ease;
        width: 200px;
        margin: 0 !important;
        height: 40px;
        appearance: menulist !important; /* Ensures dropdown arrow appears */
        -webkit-appearance: menulist !important;
        -moz-appearance: menulist !important;
      }
      .goog-te-gadget .goog-te-combo:hover {
        border-color: #bbb;
      }
      .goog-te-gadget .goog-te-combo:focus {
        border-color: #4a90e2;
        box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
      }
      div#google_translate_element div.goog-te-gadget-simple {
        border: none;
        background-color: transparent;
      }
      .goog-te-gadget img {
        display: none !important;
      }
      .VIpgJd-ZVi9od-l4eHX-hSRGPd {
        display: none !important;
      }
      .goog-te-combo option {
        padding: 8px;
        color: #333;
        font-size: 14px;
      }
      #google_translate_element {
        padding: 2px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(addScript);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div id="google_translate_element"></div>
    </>
  );
};

export default GoogleTranslate;