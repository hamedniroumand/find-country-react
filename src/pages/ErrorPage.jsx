import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ErrorPage({ statusCode, title }) {
  return (
    <div className="mt-20 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">{ statusCode }</h1>
      <h2 className="text-2xl mt-2 mb-3">{ title }</h2>
      <Link to="/">Back to home</Link>
    </div>
  );
}

ErrorPage.propTypes = {
  statusCode: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
