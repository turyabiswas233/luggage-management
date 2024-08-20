
const languageOptions = {
    en: 'English',
    es: 'Spanish',
    zh: 'Chinese',
    ar: 'Arabic',
  };
  
  export const changeLanguage = (lang) => {
    if (languageOptions[lang]) {
      // Logic to change the language
      console.log(`Language changed to: ${languageOptions[lang]}`);
      // You can add more logic here to actually change the language,
      // such as updating a global state or context
    } else {
      console.error('Unsupported language code:', lang);
    }
  };
  
  export default languageOptions;
  