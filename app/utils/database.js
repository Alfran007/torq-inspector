import SQLite from 'react-native-sqlite-2';

// Open the database or create it if it doesn't exist
const db = SQLite.openDatabase('torque_inspection.db', '1.0', '', 1);

// Function to store inspection results
export const storeInspectionResult = (results, timestamp, imagePath) => {
  // Ensure the table is created before inserting data
  console.log('Storing Inspection Results');

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS inspections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        status TEXT,
        timestamp DATETIME,
        image_path TEXT
      )`,
      [],
      () => {
        console.log('Table created or already exists');

        // Insert the results after table creation
        results.forEach(result => {
          tx.executeSql(
            'INSERT INTO inspections (status, timestamp, image_path) VALUES (?, ?, ?)',
            [result.status, timestamp, imagePath],
            (tx, res) => {
              console.log('Inspection result stored successfully');
            },
            (tx, err) => {
              console.error('Error storing inspection result:', err);
            }
          );
        });
      },
      (tx, error) => {
        console.error('Error creating table:', error);
      }
    );
  });
};
