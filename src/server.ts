// import mongoose from "mongoose";
// import app from "./app/app";
// import config from "../src/app/config";

// async function main() {
//     try {
//         await mongoose.connect(config.database_url as string);
//         console.log("Database connected");

//         app.listen(config.port, () => {
//             console.log(`Server running on port ${config.port}`);
//         });

//     } catch (error) {
//         console.log(error);
//     }
// }

// main();


// import app from "./app/app";
// import config from "./app/config";
// import connectDB from "./app/config/db";
// import dotenv from "dotenv";
// dotenv.config();
// async function main() {
//     await connectDB();

//     app.listen(config.port, () => {
//         console.log(` Server running on port ${config.port}`);
//     });
// }

// main();


import dotenv from "dotenv";
dotenv.config();

import app from "./app/app";
import config from "./app/config";
import connectDB from "./app/config/db";

async function main() {

    await connectDB();

    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });

}

main();