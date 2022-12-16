import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

const CountryListCard = React.lazy(() => import('./CountryListCard'));
const Spinner = React.lazy(() => import('./ui/Spinner'));

function CountryList({ countries, loading = false }) {
  return (
    <div className="container mx-auto">
      {loading && <Spinner className="text-gray-700 w-6 h-6 mx-auto block my-20" />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        {countries.map((country) => (
          <div key={country.alpha3Code} className="col-span-1">
            <CountryListCard country={country} />
          </div>
        ))}
      </div>
    </div>
  );
}

CountryList.propTypes = {
  loading: PropTypes.bool,
  countries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default React.memo(CountryList, (prevProps, nextProps) => (
  prevProps.loading === nextProps.loading
    && prevProps.countries.length && nextProps.countries.length
    && isEqual(prevProps.countries, nextProps.countries)
));
