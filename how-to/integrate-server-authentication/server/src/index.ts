import * as express from "express";
import * as cookieParser from "cookie-parser";

import router from "./routes";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(router);

const port = 8080;
app.listen(port, () => {
    console.log("server is listening on port", port);
});