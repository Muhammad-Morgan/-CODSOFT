import React from 'react';
import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <section className='error-page'>
        <div className="container text-center">
        <div class="card"
        style={{border: 'none', boxShadow: 'none',
      marginInline: 'auto'
      }}
        >
          <h1 className='error-page-h1'>Nothing Here...</h1>
          <h3 className='error-page-h3'>Are you lost?
          </h3>
          <p className='error-page-p'>Click on <Link
          to="/"
          className='btn btn-outline-primary'>Return To Home</Link>
          </p>

        </div>
        </div>
      </section>
);
}

export default Error;
