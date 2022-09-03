import { connectToDatabase } from "../../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const page = req.query.page - 1;
  const limit = 50;
  const skip = page * limit;

  const posts = await db
    .collection("ceps")
    .find({ })
    .limit(limit)
    .skip(skip)
    .toArray();

  res.json(posts);
};