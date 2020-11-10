import nextConnect from "next-connect";
import middleware from "../../../middlewares/middleware";
import { ObjectId } from "mongodb";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const { name, description, genres, text } = req.body;

  if (!name || !description || !genres || !text) {
    res.status(400).send("Missing field(s)");
    return;
  }
  const data = {
    name,
    description,
    genres,
    text,
    creator: ObjectId(req.user._id),
  };
  await req.db.collection("posts").insertOne(data);

  res.status(201).json({
    post: data,
  });
});

handler.get(async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }
  const posts = await req.db
    .collection("posts")
    .find({ creator: ObjectId(req.user._id) })
    .toArray();
  res.json({ posts });
});

handler.delete(async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }
  const { id } = req.body;
  const postsCollection = req.db.collection("posts");
  if (typeof id === "string") {
    await postsCollection.deleteOne({ _id: ObjectId(id) });
  } else if (typeof id === "object") {
    await postsCollection.deleteMany({ _id: { $in: id.map(e=>ObjectId(e)) } });
  }
  const posts = await postsCollection
    .find({ creator: ObjectId(req.user._id) })
    .toArray();
  res.json({ posts });
});

export default handler;
