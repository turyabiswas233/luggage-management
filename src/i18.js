import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translations from "./pages/Home/translations";
import blogs from "./pages/BlogDetails/blogs";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    returnObjects: true,
    resources: {
      en: {
        translation: {
          home: translations.en,
          blogs: blogs.en,
        },
      },
      es: {
        translation: {
          home: translations.es,
          blogs: blogs.es,
        },
      },
      zh: {
        translation: {
          home: translations.zh,
          blogs: blogs.zh,
        },
      },
    },
  });
