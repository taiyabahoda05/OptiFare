import clientPromise from "@/lib/mongodb";
import { execFile } from "child_process";
import path from "path";

export async function POST(request) {
  try {
    const body = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      typeof body.pickup !== "string" ||
      typeof body.drop !== "string" ||
      typeof body.city !== "string" ||
      typeof body.time !== "string" ||
      !Number.isFinite(Number(body.distance)) ||
      !Array.isArray(body.fares) ||
      !body.best ||
      typeof body.best !== "object"
    ) {
      return Response.json(
        { success: false, error: "Invalid comparison data" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("optifare");
    const collection = db.collection("comparisons");

    const result = await collection.insertOne({
      pickup: body.pickup,
      drop: body.drop,
      city: body.city,
      distance: Number(body.distance),
      time: body.time,
      fares: body.fares,
      best: body.best,
      createdAt: new Date(),
    });

    const configuredPython = process.env.PYTHON_EXECUTABLE;
    const executable =
      configuredPython || (process.platform === "win32" ? "py" : "python3");
    const pythonArgs =
      process.platform === "win32" && !configuredPython ? ["-3"] : [];

    execFile(
      executable,
      [...pythonArgs, path.join(process.cwd(), "train_model.py")],
      { cwd: process.cwd() },
      (err, stdout, stderr) => {
        if (err) {
          console.error("Model retraining failed:", err, stderr.trim());
          return;
        }

        if (stdout.trim()) console.log(stdout.trim());
        if (stderr.trim()) {
          console.error("Model retraining warning:", stderr.trim());
        }
        console.log("AI model retrained successfully");
      },
    );

    return Response.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error("Failed to save comparison:", err);
    return Response.json(
      { success: false, error: "Could not save comparison to MongoDB" },
      { status: 500 },
    );
  }
}


