import { execFile } from "child_process";
import path from "path";

export async function POST(request) {
  try {
    const body = await request.json();

    return new Promise((resolve) => {
      const scriptPath = path.join(process.cwd(), "predict.py");

      execFile(
        "python",
        [scriptPath, body.distance, body.city, body.time],
        (error, stdout) => {
          if (error) {
            resolve(Response.json({ error: "AI failed" }, { status: 500 }));
            return;
          }

          const parsed = Number.parseFloat(stdout.trim());
          if (Number.isNaN(parsed)) {
            resolve(Response.json({ error: "Invalid AI output" }, { status: 500 }));
            return;
          }

          resolve(Response.json({ prediction: parsed }));
        },
      );
    });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
