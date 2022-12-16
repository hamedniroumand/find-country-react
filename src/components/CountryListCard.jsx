import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const countryDetails = [
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
    title: 'Capital',
    key: 'capital',
    formatter: (value) => value,
  },
];

export default function CountryCard({ country }) {
  const countryLink = `/countries/${country.alpha3Code.toLowerCase()}`;

  return (
    <div className="dark:bg-primaryDark shadow-border rounded-md overflow-hidden h-full">
      <Link to={countryLink}>
        <img src={country.flag} className="object-cover aspect-[1.4/1]" alt={country.name} />
      </Link>

      <div className="px-4 pt-7 pb-10">
        <Link className="font-semibold text-xl" to={countryLink}>{ country.name }</Link>
        <ul className="mt-4 space-y-2">
          {countryDetails.map((countryDetail) => (
            <li key={countryDetail.key}>
              <span className="font-semibold">
                {countryDetail.title}
                :
              </span>
              <span>{ ` ${countryDetail.formatter(country[countryDetail.key])}` }</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

CountryCard.propTypes = {
  country: propTypes.shape({
    name: propTypes.string,
    flag: propTypes.string,
    alpha3Code: propTypes.string,
  }).isRequired,
};
