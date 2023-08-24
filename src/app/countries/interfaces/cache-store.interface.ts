import { Country } from "./country.interface";
import { Region } from "./region.type";


export interface CacheStore {
  byCapital: TermCountires;
  byCountries: TermCountires;
  byRegion: RegionCountries;
}

export interface TermCountires {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  region?: Region;
  countries: Country[];
}
