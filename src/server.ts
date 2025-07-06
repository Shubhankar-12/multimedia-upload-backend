import { app } from "./app";

const PORT = process.env.PORT;

app.listen(PORT, listener);

function listener() {
  setTimeout(() => {
    const message = `multimedia-upload-backend Server is listening on PORT ${PORT}`;
    console.log(message);
  }, 500);
}
