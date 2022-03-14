import *  as express from "express";

import router from "./routes";

const app = express();
app.use(router);

const port = 8080;
app.listen(port, () => {
    console.log("server is listening on port", port);
});