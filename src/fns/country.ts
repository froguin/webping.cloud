const codeToName: { [code: string]: string } = {
  AE: 'United Arab Emirates',
  AU: 'Australia',
  BE: 'Belgium',
  BH: 'Bahrain',
  BR: 'Brazil',
  CA: 'Canada',
  CH: 'Switzerland',
  CL: 'Chile',
  CN: 'China',
  DE: 'Germany',
  ES: 'Spain',
  FI: 'Finland',
  FR: 'France',
  HK: 'Hong Kong',
  ID: 'Indonesia',
  IE: 'Ireland',
  IL: 'Israel',
  IN: 'India',
  IT: 'Italy',
  JP: 'Japan',
  KR: 'South Korea',
  MX: 'Mexico',
  MY: 'Malaysia',
  NL: 'Netherlands',
  NO: 'Norway',
  PH: 'Philippines',
  PL: 'Poland',
  SA: 'Saudi Arabia',
  SE: 'Sweden',
  SG: 'Singapore',
  TH: 'Thailand',
  TW: 'Taiwan',
  UK: 'United Kingdom',
  US: 'United States',
  ZA: 'South Africa',
}

export function getCountryName(countryCode: string): string {
  const name = codeToName[countryCode.toUpperCase()]
  if (!name) {
    throw new Error(`Country name not found for code '${countryCode}')`)
  }
  return name
}
