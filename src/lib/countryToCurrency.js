const countryToCurrency = {
  US: "USD", // United States
  CA: "CAD", // Canada
  GB: "GBP", // United Kingdom
  AFG: "AFN", // Afghanistan
  ALB: "ALL", // Albania
  ARM: "AMD", // Armenia
  AZE: "AZN", // Azerbaijan
  BGR: "BGN", // Bulgaria
  BIH: "BAM", // Bosnia and Herzegovina
  BLR: "BYN", // Belarus
  BD:  "BDT", // Bangladesh
  CAN: "CAD", // Canada
  CZE: "CZK", // Czech Republic
  DEU: "EUR", // Germany
  DNK: "DKK", // Denmark
  EST: "EUR", // Estonia
  FIN: "EUR", // Finland
  GEO: "GEL", // Georgia
  GRC: "EUR", // Greece
  HRV: "EUR", // Croatia
  HUN: "HUF", // Hungary
  ISL: "ISK", // Iceland
  KAZ: "KZT", // Kazakhstan
  KGZ: "KGS", // Kyrgyzstan
  LTU: "EUR", // Lithuania
  LVA: "EUR", // Latvia
  MNE: "EUR", // Montenegro
  MKD: "MKD", // North Macedonia
  MDA: "MDL", // Moldova
  MNG: "MNT", // Mongolia
  POL: "PLN", // Poland
  ROU: "RON", // Romania
  RUS: "RUB", // Russia
  SRB: "RSD", // Serbia
  SVK: "EUR", // Slovakia
  SVN: "EUR", // Slovenia
  SWE: "SEK", // Sweden
  TJK: "TJS", // Tajikistan
  TKM: "TMT", // Turkmenistan
  TUR: "TRY", // Turkey
  UKR: "UAH", // Ukraine
  UZB: "UZS"  // Uzbekistan,
  
};

export const getCurrencyByCountryCode = (countryCode) => {
  return countryToCurrency[countryCode] || 'USD';
}