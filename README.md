OptiFare is a web application that helps users find the most economical cab option by comparing fares between multiple ride providers.
The system calculates real road distance, estimates ride prices, stores trip data, and uses Machine Learning to predict future fares.

## Python prediction setup

The prediction API requires Python and the packages listed in `requirements.txt`.
On Windows, install them with `py -3 -m pip install -r requirements.txt`; on
macOS or Linux, use `python3 -m pip install -r requirements.txt`.

The API uses the Python launcher on Windows and `python3` on macOS/Linux. To use
a specific interpreter, set `PYTHON_EXECUTABLE` to its executable path before
starting the Next.js server.
