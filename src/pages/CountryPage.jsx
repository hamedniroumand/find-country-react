import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';

import useHttp from '../hooks/useHttp';
import Spinner from '../components/ui/Spinner';

const countryDetails = [
  {
    title: 'Native Name',
    key: 'nativeName',
    formatter: (value) => value.toLocaleString(),
  },
  {
    title: 'Population',
    key: 'population',
    formatter: (value) => value.toLocaleString(),
  },
  {
    title: 'Region',
    key: 'region',
    formatter: (value) => value,
  },
  {
    title: 'Sub Region',
    key: 'subregion',
    formatter: (value) => value,
  },
  {
    title: 'Capital',
    key: 'capital',
    formatter: (value) => value,
  },
  {
    title: 'Top Level Domain',
    key: 'topLevelDomain',
    formatter: (value) => value,
  },
  {
    title: 'Currencies',
    key: 'currencies',
    formatter: (currencies) => currencies.map((currency) => currency.name).join(','),
  },
  {
    title: 'Languages',
    key: 'languages',
    formatter: (languages) => languages.map((currency) => currency.name).join(','),
  },
];

export default function CountryPage() {
  const navigate = useNavigate();
  const country = React.useRef(null);
  const { code } = useParams();

  const { http, loading } = useHttp();

  const fetchCountry = async () => {
    try {
      const response = await http.get(`/alpha/${code}`);
      country.current = (response?.data);
    } catch (err) {
      if (err?.response?.status === 400) {
        navigate('/404');
      }
    }
  };

  const backToPreviousRoute = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    fetchCountry();
  }, []);

  if (loading || !country.current) {
    return (
      <div className="flex my-20 justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-10">
      {/* Back Button */}
      <button
        type="button"
        className="px-5 py-2 rounded shadow-border mb-10 flex items-center gap-2"
        onClick={backToPreviousRoute}
      >
        <ArrowLeftIcon className="text-gray-500 w-4 h-4" />
        Back
      </button>

      <main className="grid grid-cols-2 gap-20">
        {/* Left Section */}
        <div className="col-span-1">
          <img src={country.current.flag} alt={country.current.name} />
        </div>

        {/* Right Section */}
        <div className="col-span-1">
          {/* Country title */}
          <h1 className="text-2xl font-bold">{country.current?.name}</h1>

          {/* Country Detail */}
          <ul className="grid grid-cols-2 gap-x-5 gap-y-2 mt-4">
            {countryDetails.map((countryDetail) => (
              <li key={countryDetail.key} className="col-span-1">
                <span className="font-semibold">
                  {countryDetail.title}
                  :
                </span>
                <span>{ ` ${countryDetail.formatter(country.current[countryDetail.key])}` }</span>
              </li>
            ))}
          </ul>

          {/* Country Borders */}
        </div>
      </main>
    </div>
  );
}
