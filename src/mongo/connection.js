import mongoose from 'mongoose';

function connectToDatabase() {
  mongoose.connect("mongodb+srv://laura:laura@nodecluster.cufafqj.mongodb.net/?retryWrites=true&w=majority&appName=nodeCluster",{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const db = mongoose.connection;
  db.on("error", error => console.error(error));
  db.once("open", () => console.log("👏 Database connected"));

};

module.exports = connectToDatabase;

