import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/booksRoute.js";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// app.get("/", (request, response) => {
//   console.log(request);
//   return response.status(234).send("welcome to MERN project");
// });

app.use("/books", bookRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
