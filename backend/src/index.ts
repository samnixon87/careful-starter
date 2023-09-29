import createApp from "./application";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;

const app = createApp();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
