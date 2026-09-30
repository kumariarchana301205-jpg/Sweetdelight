const mysql = require('mysql2');

const rootDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'server'
});

rootDb.connect((connectErr) => {
  if (connectErr) {
    console.error('DB_CONN_ERR', connectErr.message);
    process.exit(1);
  }

  rootDb.query('CREATE DATABASE IF NOT EXISTS cakeweb', (dbErr) => {
    if (dbErr) {
      console.error('CREATE_DB_ERR', dbErr.message);
      rootDb.end();
      process.exit(1);
    }

    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'server',
      database: 'cakeweb'
    });

    db.connect((dbConnectErr) => {
      if (dbConnectErr) {
        console.error('DB_USE_ERR', dbConnectErr.message);
        rootDb.end();
        process.exit(1);
      }

      const queries = [
        `CREATE TABLE IF NOT EXISTS users (
          id INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(150) NOT NULL,
          email VARCHAR(150) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'buyer',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

        `CREATE TABLE IF NOT EXISTS categories (
          id INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(150) NOT NULL,
          PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

        `CREATE TABLE IF NOT EXISTS cakes (
          id INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(150) NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          image VARCHAR(255) DEFAULT NULL,
          category_id INT DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          KEY category_id (category_id),
          CONSTRAINT cakes_ibfk_1 FOREIGN KEY (category_id) REFERENCES categories(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

        `CREATE TABLE IF NOT EXISTS cart (
          id INT NOT NULL AUTO_INCREMENT,
          user_id INT NOT NULL,
          cake_id INT NOT NULL,
          quantity INT NOT NULL DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          UNIQUE KEY unique_user_cake (user_id, cake_id),
          KEY idx_user_id (user_id),
          KEY idx_cake_id (cake_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

        `CREATE TABLE IF NOT EXISTS orders (
          id INT NOT NULL AUTO_INCREMENT,
          user_id INT NOT NULL,
          cake_id INT NOT NULL,
          quantity INT NOT NULL,
          total_amount DECIMAL(10,2) NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          address TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          KEY idx_user_id (user_id),
          KEY idx_cake_id (cake_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
      ];

      let index = 0;

      const runNext = () => {
        if (index >= queries.length) {
          const seedSql = `
            INSERT INTO cakes (id, name, description, price, image)
            VALUES
              (1, 'Chocolate Truffle', 'Rich chocolate cake with creamy chocolate ganache.', 599, '🍫'),
              (2, 'Red Velvet', 'Soft red velvet cake with delicious cream cheese frosting.', 699, '🍰'),
              (3, 'Strawberry Delight', 'Fresh strawberry cake with smooth whipped cream.', 649, '🍓'),
              (4, 'Black Forest', 'Classic chocolate cake with cherries and fresh cream.', 549, '🍒')
            ON DUPLICATE KEY UPDATE
              name = VALUES(name),
              description = VALUES(description),
              price = VALUES(price),
              image = VALUES(image)
          `;

          db.query(seedSql, (seedErr) => {
            if (seedErr) {
              console.error('SEED_ERR', seedErr.message);
              db.end();
              rootDb.end();
              process.exit(1);
            }

            db.query('SELECT COUNT(*) AS total FROM cakes', (countErr, rows) => {
              if (countErr) {
                console.error('COUNT_ERR', countErr.message);
                db.end();
                rootDb.end();
                process.exit(1);
              }

              console.log('CAKES_COUNT', JSON.stringify(rows));
              console.log('Database ready: cakeweb');
              db.end();
              rootDb.end();
            });
          });
          return;
        }

        db.query(queries[index], (queryErr) => {
          if (queryErr) {
            console.error('TABLE_ERR', queryErr.message);
            db.end();
            rootDb.end();
            process.exit(1);
          }

          index += 1;
          runNext();
        });
      };

      runNext();
    });
  });
});
