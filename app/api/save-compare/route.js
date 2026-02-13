import clientPromise from "@/lib/mongodb";
import { exec } from "child_process";

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("optifare");
    const collection = db.collection("comparisons");

    await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    // TRAIN MODEL AFTER DATA SAVED
    exec("python train_model.py", (err, stdout, stderr) => {
      if (err) {
        console.error("Training error:", err);
        return;
      }
      console.log("AI model retrained successfully");
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false }, { status: 500 });
  }
}




