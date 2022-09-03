import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { cep } = req.query;

  const posts = await db
    .collection("ceps")
    .find({ cep: cep })
    .limit(20)
    .toArray();

  res.json(posts);
};