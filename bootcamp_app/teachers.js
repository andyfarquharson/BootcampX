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
    client.end()
  })
const cohort = process.argv[2];

client.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`, [cohort])
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
  client.end();
});