// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("./config/cloudinary");
const fileupload = require("express-fileupload");

//const dotenv = require("dotenv");

//const fileupload = require("fileupload");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
//dotenv.config();

// Connecting to database
database.connect();


app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp'
}));

// Connecting to cloudinary
cloudinary.cloudinaryConnect();
console.log("cloudinary connect successfully");

 
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);


// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Testing the server
/*app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});*/

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

// End of code.
