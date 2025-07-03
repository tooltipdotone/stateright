import { useRouter } from 'next/router';
import { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'kk', name: 'Қазақша', flag: '🇰🇿' },
  { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === router.locale) || languages[0];
  
  const switchLanguage = (langCode) => {
    const currentPath = router.asPath;
    // Remove current locale from path if it exists
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
    const newPath = langCode === 'en' ? pathWithoutLocale : `/${langCode}${pathWithoutLocale}`;
    
    router.push(newPath, newPath, { locale: langCode });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:block">{currentLanguage.name}</span>
        <span className="block sm:hidden">{currentLanguage.code.toUpperCase()}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`${
                  language.code === router.locale
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                } flex items-center space-x-3 px-4 py-2 text-sm w-full text-left`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
                {language.code === router.locale && (
                  <span className="ml-auto text-indigo-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
