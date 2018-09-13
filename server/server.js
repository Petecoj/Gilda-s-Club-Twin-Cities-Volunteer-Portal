
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const opportunitiesRouter = require('./routes/opportunities.router')
const volunteersRouter = require('./routes/volunteers.router')
const certificationsRouter = require('./routes/certifications.router')
const autocompleteRouter = require('./routes/autocomplete.router')
const announcementRouter = require('./routes/announcements.router');
const passwordResetRouter = require('./routes/password-reset.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/opportunities', opportunitiesRouter)
app.use('/api/volunteers', volunteersRouter)
app.use('/api/certifications', certificationsRouter)
app.use('/api/autocomplete', autocompleteRouter)
app.use('/api/announcements', announcementRouter)
app.use('/api/password', passwordResetRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
