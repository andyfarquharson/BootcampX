const pg = require('pg')

const configObject = {
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx',
  port: 5432
};

const client = new pg.Client(configObject);

client.connect()
.then(() => {
  console.log('DB Connected:', configObject)
})
.catch((error) => {
  console.log('DB Connection Error', error)
})

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

client.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
  client.end();
}).catch(err => console.error('query error', err.stack));