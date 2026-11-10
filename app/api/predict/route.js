import { execFile } from "child_process";
import path from "path";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request" }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !Number.isFinite(body.distance) ||
    typeof body.city !== "string" ||
    typeof body.time !== "string"
  ) {
    return Response.json({ error: "Invalid prediction request" }, { status: 400 });
  }

  const configuredPython = process.env.PYTHON_EXECUTABLE;
  const executable =
    configuredPython || (process.platform === "win32" ? "py" : "python3");
  const pythonArgs =
    process.platform === "win32" && !configuredPython ? ["-3"] : [];
  const scriptPath = path.join(process.cwd(), "predict.py");

  try {
    const { stdout } = await new Promise((resolve, reject) => {
      execFile(
        executable,
        [
          ...pythonArgs,
          scriptPath,
          String(body.distance),
          body.city,
          body.time,
        ],
        { cwd: process.cwd() },
        (error, stdout, stderr) => {
          if (error) {
            reject(new Error(`${error.message}\n${stderr.trim()}`));
            return;
          }

          resolve({ stdout });
        },
      );
    });

    const prediction = Number.parseFloat(stdout.trim());
    if (!Number.isFinite(prediction)) {
      console.error("Prediction script returned invalid output:", stdout);
      return Response.json({ error: "Invalid AI output" }, { status: 500 });
    }

    return Response.json({ prediction });
  } catch (error) {
    console.error("Prediction subprocess failed:", error);
    return Response.json({ error: "AI prediction failed" }, { status: 500 });
  }
}
