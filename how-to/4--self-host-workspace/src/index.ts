import * as express from "express";

import router from "./routes";

const app = express();
app.use(router);

const port = 3030;
app.listen(port, () => {
  console.log("server is listening on port", port);
});
