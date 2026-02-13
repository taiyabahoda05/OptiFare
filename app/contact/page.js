import React from 'react'

const page = () => {
  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center px-6 py-16"
        style={{
          backgroundImage: 'url("/contact.png")',
        }}
      >
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact OptiFare
            </h1>
            <p className="text-gray-700 leading-relaxed">
              Have questions, feedback, or suggestions? We would love to hear from you. Reach us directly through the
              channels below and we will get back to you quickly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white/70 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Email
              </h2>
              <p className="text-gray-700 mb-4">
                Best for detailed requests and support tickets.
              </p>
              <a
                href="mailto:support@optifare.com"
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-800 transition-colors"
              >
                support@optifare.com
              </a>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white/70 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Phone
              </h2>
              <p className="text-gray-700 mb-4">
                Fast answers during business hours.
              </p>
              <a
                href="tel:+14045550198"
                className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-white font-medium hover:bg-gray-800 transition-colors"
              >
                +1 (404) 555-0198
              </a>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white/70 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Social
              </h2>
              <p className="text-gray-700 mb-4">
                Follow updates, releases, and product news.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com"
                  className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="rounded-lg border justify-center border-gray-200 bg-white/70 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Hours
              </h2>
              <p className="text-gray-700">
                Monday-Friday: 9:00 AM-6:00 PM
              </p>
              <p className="text-gray-700">
                Saturday: 10:00 AM-2:00 PM 
              </p>
              <p className="text-gray-700">
                Sunday: Closed
              </p>
            </div>
          </div>

          <div className="border-t mt-10 pt-6 text-sm text-center text-gray-600">
            For support-related queries, please allow up to 24 hours for a response.
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
