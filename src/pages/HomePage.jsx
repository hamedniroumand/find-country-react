import React from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'react-router-dom';

import useHttp from '../hooks/useHttp';

const CountryList = React.lazy(() => import('../components/CountryList'));
const Input = React.lazy(() => import('../components/ui/Input'));
const SelectBox = React.lazy(() => import('../components/ui/SelectBox'));

const sortCountryItems = [
  { title: 'Sort as Country Name', value: 'name' },
  { title: 'Sort as Population', value: 'population' },
];
const filterRegionItems = [
  { title: 'Africa', value: 'africa' },
  { title: 'America', value: 'americas' },
  { title: 'Asia', value: 'asia' },
  { title: 'Europe', value: 'europe' },
  { title: 'Oceania', value: 'oceania' },
];

export default function HomePage() {
  const [searchParam, setSearchParam] = useSearchParams();
  const { http } = useHttp();

  const pageLoading = React.useRef(false);
  const [countries, setCountries] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState(searchParam.get('name') || '');
  const [filteredCountries, setFilteredCountries] = React.useState([]);
  const [countrySortFilter, setCountrySortFilter] = React.useState(() => {
    const sort = searchParam.get('sort');
    return sort || null;
  });
  const [countryRegionFilter, setCountryRegionFilter] = React.useState(() => {
    const region = searchParam.get('region');
    return region || null;
  });

  /** ***** HANDLERS ****** */
  const fetchAllCountries = async () => {
    try {
      pageLoading.current = true;
      const { data } = await http.get('/all');
      setCountries(data);
    } catch (err) {
      console.error('err', err);
    }
  };
  const filterCountriesViaSearch = (data, search) => {
    const filteredCountriesViaSearch = data.filter(
      (country) => country.name.toLowerCase().includes(search.toLowerCase()),
    );
    return filteredCountriesViaSearch;
  };
  const filterCountriesViaRegion = (data, region) => {
    const filteredCountriesViaRegion = data.filter(
      (country) => country.region.toLowerCase() === region.toLowerCase(),
    );
    return filteredCountriesViaRegion;
  };
  const filterCountriesViaSort = (data, sort = 'country') => {
    let filteredCountriesViaSort;
    if (sort === 'population') {
      filteredCountriesViaSort = data.sort((a, b) => b.population - a.population);
    } else {
      filteredCountriesViaSort = data.sort((a, b) => a.name.localeCompare(b.name));
    }
    return filteredCountriesViaSort;
  };
  const handleSearchInputChanged = (search) => {
    setSearchValue(search);
    if (!search || !search.trim().length) {
      searchParam.delete('name');
    } else {
      searchParam.set('name', search);
    }
    setSearchParam(searchParam, { replace: true });
  };
  const handleSortChanged = (sort) => {
    if (sort === countrySortFilter) {
      searchParam.delete('sort');
      setCountrySortFilter(null);
    } else {
      searchParam.set('sort', sort);
      setCountrySortFilter(sort);
    }
    setSearchParam(searchParam, { replace: true });
  };
  const handleRegionChanged = (region) => {
    if (region === countryRegionFilter) {
      searchParam.delete('region');
      setCountryRegionFilter(null);
    } else {
      searchParam.set('region', region);
      setCountryRegionFilter(region);
    }
    setSearchParam(searchParam, { replace: true });
  };
  const filterCountriesViaQueryParams = debounce(() => {
    const name = searchParam.get('name');
    const region = searchParam.get('region');
    const sort = searchParam.get('sort');
    setCountryRegionFilter(region);
    setCountrySortFilter(sort);
    setSearchValue(name || '');
    let foundedCountries = [...countries];
    if (name) {
      foundedCountries = filterCountriesViaSearch(foundedCountries, name);
    }
    if (region) {
      foundedCountries = filterCountriesViaRegion(foundedCountries, region);
    }
    if (sort) {
      foundedCountries = filterCountriesViaSort(foundedCountries, sort);
    }
    setFilteredCountries(foundedCountries);
  }, 350);
  /** ***** END OF HANDLERS ****** */

  /** ***** HOOKS ****** */
  React.useEffect(() => {
    fetchAllCountries();
  }, []);
  React.useEffect(() => {
    if (countries.length) {
      filterCountriesViaQueryParams();
      pageLoading.current = false;
    }
  }, [countries]);
  React.useEffect(() => {
    if (countries.length) {
      filterCountriesViaQueryParams();
    }
  }, [searchParam]);
  /** ***** END OF HOOKS ****** */

  return (
    <>
      <div className="container mx-auto my-12">
        <div className="flex justify-between items-center">
          <Input
            value={searchValue}
            className="max-w-[400px] flex-1"
            placeHolder="Search for country..."
            icon={<MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-white" />}
            onChanged={(e) => handleSearchInputChanged(e.target.value)}
          />
          <div className="flex gap-2">
            <SelectBox
              value={countrySortFilter}
              placeholder="Sort Country"
              className="w-56"
              items={sortCountryItems}
              onChanged={(item) => handleSortChanged(item.value)}
            />
            <SelectBox
              value={countryRegionFilter}
              placeholder="Filter by Region"
              className="w-56"
              items={filterRegionItems}
              onChanged={(item) => handleRegionChanged(item.value)}
            />
          </div>
        </div>
      </div>
      <CountryList loading={pageLoading.current} countries={filteredCountries} />
      {Boolean(countries.length) && !pageLoading.current && !filteredCountries.length && (
        <div className="text-center col-span-4">
          <p>No country found</p>
        </div>
      )}
    </>
  );
}
