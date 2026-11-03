import { SUPPORTED_LANGUAGES, SupportedLanguage } from './types';

/**
 * ISO 3166-1 alpha-2 country code -> SupportedLanguage mapping
 * for countries whose primary national language matches one of our 8 languages:
 * id, en, es, fr, ja, ar, ru, ko.
 * Countries not listed here (e.g. DE, BR, IT, NL, SE, VN, TH, TR) fall back
 * to secondary browser preferences or International English ('en').
 */
export const COUNTRY_TO_LANGUAGE: Readonly<Record<string, SupportedLanguage>> = {
  // Indonesian ('id')
  ID: 'id',

  // Japanese ('ja')
  JP: 'ja',

  // Korean ('ko')
  KR: 'ko',
  KP: 'ko',

  // Russian ('ru')
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
  KG: 'ru',

  // Spanish ('es')
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  EC: 'es',
  GT: 'es',
  CU: 'es',
  BO: 'es',
  DO: 'es',
  HN: 'es',
  PY: 'es',
  SV: 'es',
  NI: 'es',
  CR: 'es',
  PA: 'es',
  UY: 'es',
  PR: 'es',
  GQ: 'es',

  // French ('fr')
  FR: 'fr',
  MC: 'fr',
  LU: 'fr',
  SN: 'fr',
  CI: 'fr',
  CM: 'fr',
  ML: 'fr',
  BF: 'fr',
  NE: 'fr',
  TG: 'fr',
  BJ: 'fr',
  GA: 'fr',
  CD: 'fr',
  CG: 'fr',
  MG: 'fr',
  GN: 'fr',
  TD: 'fr',
  BI: 'fr',
  RW: 'fr',
  HT: 'fr',
  RE: 'fr',
  GP: 'fr',
  MQ: 'fr',
  GF: 'fr',
  NC: 'fr',
  PF: 'fr',

  // Arabic ('ar')
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  QA: 'ar',
  KW: 'ar',
  BH: 'ar',
  OM: 'ar',
  JO: 'ar',
  IQ: 'ar',
  LB: 'ar',
  SY: 'ar',
  YE: 'ar',
  PS: 'ar',
  MA: 'ar',
  DZ: 'ar',
  TN: 'ar',
  LY: 'ar',
  SD: 'ar',
  MR: 'ar',

  // English ('en')
  US: 'en',
  GB: 'en',
  AU: 'en',
  CA: 'en',
  NZ: 'en',
  IE: 'en',
  SG: 'en',
  PH: 'en',
  MY: 'en',
  IN: 'en',
  ZA: 'en',
  NG: 'en',
  KE: 'en',
  GH: 'en',
  HK: 'en',
  PK: 'en',
  BD: 'en',
};

/**
 * IANA Timezone -> ISO 3166-1 alpha-2 country mapping for instant 0ms
 * client-side country inference prior to server geo-header confirmation.
 */
const TIMEZONE_TO_COUNTRY: Readonly<Record<string, string>> = {
  // Indonesia
  'Asia/Jakarta': 'ID',
  'Asia/Pontianak': 'ID',
  'Asia/Makassar': 'ID',
  'Asia/Ujung_Pandang': 'ID',
  'Asia/Jayapura': 'ID',

  // Japan
  'Asia/Tokyo': 'JP',
  Japan: 'JP',

  // South Korea
  'Asia/Seoul': 'KR',
  ROK: 'KR',

  // Russia & CIS
  'Europe/Kaliningrad': 'RU',
  'Europe/Moscow': 'RU',
  'Europe/Simferopol': 'RU',
  'Europe/Kirov': 'RU',
  'Europe/Volgograd': 'RU',
  'Europe/Astrakhan': 'RU',
  'Europe/Saratov': 'RU',
  'Europe/Ulyanovsk': 'RU',
  'Europe/Samara': 'RU',
  'Asia/Yekaterinburg': 'RU',
  'Asia/Omsk': 'RU',
  'Asia/Novosibirsk': 'RU',
  'Asia/Barnaul': 'RU',
  'Asia/Tomsk': 'RU',
  'Asia/Novokuznetsk': 'RU',
  'Asia/Krasnoyarsk': 'RU',
  'Asia/Irkutsk': 'RU',
  'Asia/Chita': 'RU',
  'Asia/Yakutsk': 'RU',
  'Asia/Khandyga': 'RU',
  'Asia/Vladivostok': 'RU',
  'Asia/Ust-Nera': 'RU',
  'Asia/Magadan': 'RU',
  'Asia/Sakhalin': 'RU',
  'Asia/Srednekolymsk': 'RU',
  'Asia/Kamchatka': 'RU',
  'Asia/Anadyr': 'RU',
  'Europe/Minsk': 'BY',
  'Asia/Almaty': 'KZ',
  'Asia/Qyzylorda': 'KZ',
  'Asia/Aqtobe': 'KZ',
  'Asia/Aqtau': 'KZ',
  'Asia/Atyrau': 'KZ',
  'Asia/Oral': 'KZ',
  'Asia/Bishkek': 'KG',

  // Arabic-speaking countries
  'Asia/Riyadh': 'SA',
  'Asia/Dubai': 'AE',
  'Asia/Muscat': 'OM',
  'Asia/Qatar': 'QA',
  'Asia/Bahrain': 'BH',
  'Asia/Kuwait': 'KW',
  'Asia/Baghdad': 'IQ',
  'Asia/Amman': 'JO',
  'Asia/Damascus': 'SY',
  'Asia/Beirut': 'LB',
  'Asia/Aden': 'YE',
  'Asia/Gaza': 'PS',
  'Asia/Hebron': 'PS',
  'Africa/Cairo': 'EG',
  'Africa/Casablanca': 'MA',
  'Africa/Algiers': 'DZ',
  'Africa/Tunis': 'TN',
  'Africa/Tripoli': 'LY',
  'Africa/Khartoum': 'SD',
  'Africa/Nouakchott': 'MR',

  // French-speaking countries & territories
  'Europe/Paris': 'FR',
  'Europe/Monaco': 'MC',
  'Europe/Luxembourg': 'LU',
  'Africa/Dakar': 'SN',
  'Africa/Abidjan': 'CI',
  'Africa/Douala': 'CM',
  'Africa/Bamako': 'ML',
  'Africa/Ouagadougou': 'BF',
  'Africa/Niamey': 'NE',
  'Africa/Lome': 'TG',
  'Africa/Porto-Novo': 'BJ',
  'Africa/Libreville': 'GA',
  'Africa/Kinshasa': 'CD',
  'Africa/Lubumbashi': 'CD',
  'Africa/Brazzaville': 'CG',
  'Indian/Antananarivo': 'MG',
  'America/Port-au-Prince': 'HT',
  'Indian/Reunion': 'RE',
  'America/Guadeloupe': 'GP',
  'America/Martinique': 'MQ',
  'America/Cayenne': 'GF',
  'Pacific/Noumea': 'NC',
  'Pacific/Tahiti': 'PF',

  // Spanish-speaking countries
  'Europe/Madrid': 'ES',
  'Atlantic/Canary': 'ES',
  'Africa/Ceuta': 'ES',
  'America/Mexico_City': 'MX',
  'America/Cancun': 'MX',
  'America/Merida': 'MX',
  'America/Monterrey': 'MX',
  'America/Matamoros': 'MX',
  'America/Mazatlan': 'MX',
  'America/Chihuahua': 'MX',
  'America/Ojinaga': 'MX',
  'America/Hermosillo': 'MX',
  'America/Tijuana': 'MX',
  'America/Bahia_Banderas': 'MX',
  'America/Buenos_Aires': 'AR',
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Argentina/Cordoba': 'AR',
  'America/Argentina/Salta': 'AR',
  'America/Argentina/Jujuy': 'AR',
  'America/Argentina/Tucuman': 'AR',
  'America/Argentina/Catamarca': 'AR',
  'America/Argentina/La_Rioja': 'AR',
  'America/Argentina/San_Juan': 'AR',
  'America/Argentina/Mendoza': 'AR',
  'America/Argentina/San_Luis': 'AR',
  'America/Argentina/Rio_Gallegos': 'AR',
  'America/Argentina/Ushuaia': 'AR',
  'America/Bogota': 'CO',
  'America/Santiago': 'CL',
  'America/Lima': 'PE',
  'America/Caracas': 'VE',
  'America/Guayaquil': 'EC',
  'Pacific/Galapagos': 'EC',
  'America/Guatemala': 'GT',
  'America/Havana': 'CU',
  'America/La_Paz': 'BO',
  'America/Santo_Domingo': 'DO',
  'America/Tegucigalpa': 'HN',
  'America/Asuncion': 'PY',
  'America/El_Salvador': 'SV',
  'America/Managua': 'NI',
  'America/Costa_Rica': 'CR',
  'America/Panama': 'PA',
  'America/Montevideo': 'UY',
  'America/Puerto_Rico': 'PR',

  // English-speaking countries (prevents US/GB/AU/SG from mis-inferring another country)
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Phoenix': 'US',
  'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US',
  'Europe/London': 'GB',
  'Europe/Dublin': 'IE',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Brisbane': 'AU',
  'Australia/Perth': 'AU',
  'Australia/Adelaide': 'AU',
  'Pacific/Auckland': 'NZ',
  'Asia/Singapore': 'SG',
  'Asia/Manila': 'PH',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Kolkata': 'IN',
  'Asia/Calcutta': 'IN',
};

const RESERVED_COUNTRY_CODES = new Set(['XX', 'ZZ', 'T1', 'A1', 'A2', 'O1']);

export function isSupportedLanguage(value: string | null | undefined): value is SupportedLanguage {
  return Boolean(value && SUPPORTED_LANGUAGES.some((item) => item.code === value));
}

export function sanitizeCountryCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const normalized = raw.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized) || RESERVED_COUNTRY_CODES.has(normalized)) {
    return null;
  }
  return normalized;
}

export interface ParsedLocaleTag {
  language: SupportedLanguage | null;
  region: string | null;
}

/**
 * Parses a BCP-47 locale tag (e.g. "id-ID", "in-ID", "ja-JP", "es-419", "en-ID")
 * into a normalized SupportedLanguage (if matched) and an ISO 2-letter region code.
 */
export function parseLocaleTag(rawTag: string | null | undefined): ParsedLocaleTag {
  if (!rawTag) {
    return { language: null, region: null };
  }
  const cleaned = rawTag.trim().replace(/_/g, '-');
  if (!cleaned) {
    return { language: null, region: null };
  }

  const parts = cleaned.split('-').filter(Boolean);
  const primary = parts[0]?.toLowerCase() ?? '';

  let region: string | null = null;
  for (let i = 1; i < parts.length; i++) {
    const candidate = parts[i].toUpperCase();
    if (/^[A-Z]{2}$/.test(candidate) && !RESERVED_COUNTRY_CODES.has(candidate)) {
      region = candidate;
      break;
    }
  }

  // Legacy & regional ISO language aliases
  let mappedLang: SupportedLanguage | null = null;
  if (primary === 'in' || primary === 'id' || primary === 'jv' || primary === 'su') {
    mappedLang = 'id';
  } else if (primary === 'be') {
    mappedLang = 'ru';
  } else if (isSupportedLanguage(primary)) {
    mappedLang = primary;
  }

  return { language: mappedLang, region };
}

export function normalizeUrlLangParam(rawParam: string | null | undefined): SupportedLanguage | null {
  if (!rawParam) return null;
  const parsed = parseLocaleTag(rawParam);
  return parsed.language;
}

export function detectTimezoneCountry(timeZone: string | null | undefined): string | null {
  if (!timeZone) return null;
  return TIMEZONE_TO_COUNTRY[timeZone.trim()] ?? null;
}

export interface VisitorLocaleSignals {
  browserLanguages?: readonly string[];
  timeZone?: string | null;
  serverCountry?: string | null;
}

/**
 * Resolves the most natural SupportedLanguage for a first-time visitor:
 * 1. If the visitor's primary browser language explicitly requests one of the
 *    7 non-English supported languages (id, es, fr, ja, ar, ru, ko), honor it immediately.
 * 2. Otherwise (e.g. factory-default "en-US"/"en-GB" browser or regional OS locale),
 *    check the visitor's physical/regional country via:
 *      a) Server Geo-IP country header (Cloudflare / Cloud Run / proxy)
 *      b) Device IANA timezone (e.g. Asia/Jakarta -> ID -> id, Asia/Tokyo -> JP -> ja)
 *      c) Explicit non-generic locale region subtag (e.g. en-ID -> ID -> id)
 *    If that country maps to one of our 8 supported languages, return it.
 * 3. Check secondary browser language preferences (e.g. ["de-CH", "fr-CH", "en-US"] -> "fr").
 * 4. Fall back to International English ('en') for all other countries worldwide.
 */
export function resolveVisitorLanguage(signals: VisitorLocaleSignals): SupportedLanguage {
  const rawLangs = (signals.browserLanguages ?? []).filter(Boolean);
  const parsedList = rawLangs.map((tag) => parseLocaleTag(tag));

  // 1. Primary explicit non-English language preference
  const primary = parsedList[0];
  if (primary?.language && primary.language !== 'en') {
    return primary.language;
  }

  // 2. Country-based detection (Geo-IP -> Timezone -> Non-generic locale region)
  const validServerCountry = sanitizeCountryCode(signals.serverCountry);
  const tzCountry = detectTimezoneCountry(signals.timeZone);
  const explicitLocaleRegion =
    primary?.region && primary.region !== 'US' && primary.region !== 'GB'
      ? primary.region
      : null;

  const detectedCountry = validServerCountry ?? tzCountry ?? explicitLocaleRegion;
  if (detectedCountry && COUNTRY_TO_LANGUAGE[detectedCountry]) {
    return COUNTRY_TO_LANGUAGE[detectedCountry];
  }

  // 3. Secondary browser language preferences (e.g. multilingual countries CH/BE/CA/UA)
  for (let i = 1; i < parsedList.length; i++) {
    const candidate = parsedList[i];
    if (candidate.language) {
      return candidate.language;
    }
    if (candidate.region && COUNTRY_TO_LANGUAGE[candidate.region]) {
      return COUNTRY_TO_LANGUAGE[candidate.region];
    }
  }

  // 4. Primary 'en' or universal international fallback
  return 'en';
}
