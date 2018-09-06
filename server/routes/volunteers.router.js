const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM users;`;
    pool.query(queryText)
        .then((results) => {
            res.send(results.rows)
            console.log(results.rows);

        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});
//edting volunteer
router.put('/updateInfo', (req, res) => {
    console.log('I have :', req.body);
    let info = req.body
    if(req.isAuthenticated){
        const queryText = `UPDATE "users" SET "first_name" = $1, "middle_name" = $2, "last_name" = $3, "email"= $4 , "primary_phone"= $5,
                                            "secondary_phone"= $6, "street_address1"= $7, "street_address2"= $8, "city"= $9,
                                            "zip"= $10, "admin_notes"= $11, "active"= $12, "regular_basis"= $13, "specific_event"= $14,
                                            "as_needed"= $15, "limitations_allergies"= $16, "why_excited"= $17, "employer"= $18,
                                            "job_title"= $19, "date_of_birth" = $20 WHERE users."id" = $21;`
                                            pool.query(queryText, [info.first_name, info.middle_name, info.last_name, info.email, info.primary_phone, 
                                                info.secondary_phone, info.street_address1, info.street_address2, info.city, info.zip, info.admin_notes, 
                                                info.active, info.regular_basis, info.specific_event, info.as_needed, 
                                                info.limitations_allergies, info.why_excited, info.employer, info.job_title, info.date_of_birth, ])
                                                .then(() => {
                                                    res.sendStatus(201)
                                                })
         }else{
             res.sendStatus(403)
         }
})


router.get('/info', (req, res)=> {
    console.log('got to get')
    const queryText = `SELECT * FROM crosstab(
    $$
    SELECT
        "users"."email",
        "users"."id",
        "users"."first_name",
        "users"."middle_name",
        "users"."last_name",
        "users"."primary_phone",
        "users"."secondary_phone",
        "certifications"."certification_name",
        "user_certifications"."is_certified"
    FROM "users"
    JOIN "user_certifications" ON "users"."id" = "user_certifications"."user_id"
    JOIN "certifications" ON "user_certifications"."certification_id" = "certifications"."id"
    WHERE "users"."access_level" != 3
    ORDER BY 1
    $$,
    $$
    SELECT DISTINCT "certifications"."certification_name" FROM "certifications" ORDER BY 1
    $$
    ) 
    AS final_result(
        email VARCHAR,
        id INT,
        first_name VARCHAR,
        middle_name VARCHAR,
        last_name VARCHAR,
        primary_phone VARCHAR,
        secondary_phone VARCHAR,
        av_support BOOLEAN,
        cash_handling BOOLEAN,
        clinic_ambassador BOOLEAN,
        communications BOOLEAN,
        data_entry BOOLEAN,
        gilda_greeter BOOLEAN,
        instructor BOOLEAN,
        noogieland BOOLEAN,
        outreach_ambassador BOOLEAN,
        special1 BOOLEAN,
        special2 BOOLEAN,
        special3 BOOLEAN
    );`
    pool.query(queryText)
        .then((results) => {
            console.log('here are the results:', results.rows)
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error on /api/volunteers/info GET:', error);
            res.sendStatus(500);
        });
});





module.exports = router;