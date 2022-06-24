import * as express from "express";
import * as cookieParser from "cookie-parser";
import router from "./routes";
var path = require('path');

const commonPath = path.join(__dirname, "..","..","..","common",'public');
console.log("Common Path /common = " + commonPath);
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/common", express.static(commonPath));
app.use(router);
const port = 8080;

app.listen(port, () => {
    console.log("server is listening on port", port);
});
