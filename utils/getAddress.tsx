import prefCityData from '@/assets/data/pref_city.json';

// 定义类型
type PrefData = {
  id: string;
  name: string;
  short: string;
  kana: string;
  en: string;
  city: { citycode: string; city: string; }[];
};

type PrefCityData = {
  [key: string]: PrefData;
};

// 将导入的数据断言为正确的类型
const typedPrefCityData = prefCityData as PrefCityData;

export function getCities(code: string): { citycode: string; city: string; }[] | undefined {
  return typedPrefCityData[code]?.city;
}

export function getObjByCode(code: string): { citycode: string; city: string; } | undefined {
  const prefCode = code.slice(1, 3);
  const pref = typedPrefCityData[prefCode];
  return pref ? pref.city.find(city => city.citycode === code) : undefined;
}

export function getPrefList(): { id: string; name: string; }[] {
  return Object.values(typedPrefCityData).map(pref => ({ id: pref.id, name: pref.name }));
}

