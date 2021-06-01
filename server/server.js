const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseSDK.json");
//initialize admin SDK using serciceAcountKey
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

app.put("/", (req, res) => {
  const search = req.body.search;
  let result = [];
  let data = [];
  db.collection("adminTransactions")
    .get()
    .then((r) => {
      data = r.docs.map((card) => {
        return card.data();
      });
      result = data.filter((card) => {
        if (card.username.toLowerCase().includes(search)) {
          return card.username;
        }
      });

      res.json(result);
    });
});

app.listen(5000, () => {
  console.log("its working");
});
