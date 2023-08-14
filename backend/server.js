import expresse from "express";
import path from 'path';
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

connectDB();

const app = expresse();
app.use(cookieParser());

app.use(expresse.json());
app.use(expresse.urlencoded({extended: true}));

app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(expresse.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
    res.send('API is running....');
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server runs on port ${port}`));