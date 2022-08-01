import 'dotenv/config.js';
import pg from 'pg';

export default (() => {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  if (process.env.NODE_ENV === 'development') {
    pool.options.connectionString = process.env.DATABASE_DEV_URL;
  };

  pool.connect((err) => {
    if (err) {
      return console.error('Error:', err.stack)
    };
    console.log('Database Connected 📶');
  });


  return {
    query: (text, params) => {
      if (process.env.NODE_ENV === 'development') { console.log(text); }
        return pool.query(text, params);
      },
      ...pool,
  };
})();
