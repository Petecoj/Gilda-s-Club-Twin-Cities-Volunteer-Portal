const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    pool.query(`SELECT distinct users.id, users.first_name, user_certifications.certification_id, user_certifications.is_certified
    FROM users
    LEFT OUTER JOIN "user_certifications" ON "users".id= user_certifications.user_id
    LEFT OUTER JOIN "user_opportunities" ON "users".id = user_opportunities.user_id
    LEFT OUTER JOIN "opportunities" ON opportunities.id = user_opportunities.opportunity_id;`)
.then((results) => {
    res.send(results.rows)
    console.log(results.rows);

}).catch((err) => {
    console.log(err);
    res.sendStatus(500);
})
})
/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;