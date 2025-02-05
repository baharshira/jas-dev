const express = require('express');
const path = require('path')
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser')

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const cartRouter = require('./routes/cartRoutes');
const materialsRouter = require('./routes/materialsRoutes');

const app = express();
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))

// Serving static files
app.use(express.static(path.join(__dirname,'public')));

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));


// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({extended: true, limit: '10kb'}))
app.use(cookieParser())


// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price'
        ]
    })
);


// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log('from test middleware - cookie is',req.cookies);
    next();
});

// 3) ROUTES
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/materials', materialsRouter);
app.use('/', viewRouter);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;