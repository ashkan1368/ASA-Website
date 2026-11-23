import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import faDefaultJson from './locales/fa.json';
import enDefaultJson from './locales/en.json';
import { Language } from '../data/catalogData';

export type TranslationDictionary = typeof faDefaultJson;

export interface FlatTranslationEntry {
  keyPath: string;
  faValue: string;
  enValue: string;
}

function flattenObject(
  obj: Record<string, any>,
  prefix = ''
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, nextKey));
    } else {
      result[nextKey] = String(value ?? '');
    }
  }
  return result;
}

const DEFAULT_FLAT_FA = flattenObject(faDefaultJson);
const DEFAULT_FLAT_EN = flattenObject(enDefaultJson);

interface LocalizationContextValue {
  lang: Language;
  isFa: boolean;
  dir: 'rtl' | 'ltr';
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (
    keyPath: string,
    params?: Record<string, string | number>,
    fallback?: string
  ) => string;
  flatEntries: FlatTranslationEntry[];
  updateTranslationKey: (
    keyPath: string,
    locale: Language,
    newValue: string
  ) => void;
  resetDictionariesToDefault: () => void;
  exportActiveLocaleJson: () => void;
}

const LocalizationContext = createContext<LocalizationContextValue | null>(null);

export const LocalizationProvider: React.FC<{
  initialLang?: Language;
  children: React.ReactNode;
}> = ({ initialLang = 'fa', children }) => {
  const [lang, setLang] = useState<Language>(initialLang);
  const [faMap, setFaMap] = useState<Record<string, string>>(() => ({
    ...DEFAULT_FLAT_FA,
  }));
  const [enMap, setEnMap] = useState<Record<string, string>>(() => ({
    ...DEFAULT_FLAT_EN,
  }));

  const isFa = lang === 'fa';
  const dir: 'rtl' | 'ltr' = isFa ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'fa' ? 'en' : 'fa'));
  }, []);

  const t = useCallback(
    (
      keyPath: string,
      params?: Record<string, string | number>,
      fallback?: string
    ): string => {
      const activeMap = lang === 'fa' ? faMap : enMap;
      const raw =
        activeMap[keyPath] ??
        (lang === 'fa' ? DEFAULT_FLAT_FA[keyPath] : DEFAULT_FLAT_EN[keyPath]) ??
        fallback ??
        keyPath;

      if (!params) return raw;

      return Object.entries(params).reduce((acc, [paramKey, paramVal]) => {
        const formattedVal =
          typeof paramVal === 'number' && lang === 'fa'
            ? paramVal.toLocaleString('fa-IR')
            : String(paramVal);
        return acc.split(`{${paramKey}}`).join(formattedVal);
      }, raw);
    },
    [lang, faMap, enMap]
  );

  const flatEntries = useMemo<FlatTranslationEntry[]>(() => {
    const allKeys = Array.from(
      new Set([...Object.keys(faMap), ...Object.keys(enMap)])
    );
    return allKeys.map((keyPath) => ({
      keyPath,
      faValue: faMap[keyPath] ?? '',
      enValue: enMap[keyPath] ?? '',
    }));
  }, [faMap, enMap]);

  const updateTranslationKey = useCallback(
    (keyPath: string, locale: Language, newValue: string) => {
      if (locale === 'fa') {
        setFaMap((prev) => ({ ...prev, [keyPath]: newValue }));
      } else {
        setEnMap((prev) => ({ ...prev, [keyPath]: newValue }));
      }
    },
    []
  );

  const resetDictionariesToDefault = useCallback(() => {
    setFaMap({ ...DEFAULT_FLAT_FA });
    setEnMap({ ...DEFAULT_FLAT_EN });
  }, []);

  const exportActiveLocaleJson = useCallback(() => {
    const activeMap = lang === 'fa' ? faMap : enMap;
    const jsonString = JSON.stringify(activeMap, null, 2);
    const blob = new Blob([jsonString], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asa-locale-${lang}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [lang, faMap, enMap]);

  const value = useMemo<LocalizationContextValue>(
    () => ({
      lang,
      isFa,
      dir,
      setLang,
      toggleLang,
      t,
      flatEntries,
      updateTranslationKey,
      resetDictionariesToDefault,
      exportActiveLocaleJson,
    }),
    [
      lang,
      isFa,
      dir,
      toggleLang,
      t,
      flatEntries,
      updateTranslationKey,
      resetDictionariesToDefault,
      exportActiveLocaleJson,
    ]
  );

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export function useLocalization(): LocalizationContextValue {
  const ctx = useContext(LocalizationContext);
  if (!ctx) {
    throw new Error(
      'useLocalization must be used within a LocalizationProvider'
    );
  }
  return ctx;
}
