import React from 'react'
import { Link } from 'react-router-dom'


function LandingPage() {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col font-sans"> {/* Blue background, full screen */}
      {/* Navigation Bar */}
      

      {/* Hero Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 text-center"> {/* Increased padding for larger screens */}
        <div className="max-w-4xl mx-auto"> {/* Center the content */}
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            Streamline Your Projects with TaskTeams
          </h2>
          <p className="text-lg md:text-xl text-blue-600 mb-8">
            Effortlessly manage your projects, tasks, and teams in one central platform.  TaskTeams empowers you to collaborate effectively and achieve your goals.
          </p>
          <div className="flex justify-center"> {/* Center the button */}
            <Link to="/signup" className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-700">
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section (Optional - Add more as needed) */}
        <section className="py-12 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-md bg-blue-50">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Project Management</h3>
              <p className="text-blue-600">Create, organize, and track your projects with ease.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-blue-50">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Task Collaboration</h3>
              <p className="text-blue-600">Collaborate with your team on tasks and subtasks.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-blue-50">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">CRUD Functionality</h3>
              <p className="text-blue-600">Full Create, Read, Update, and Delete capabilities.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-blue-500 p-4 text-center text-white">
        &copy; {new Date().getFullYear()} TaskTeams. All rights reserved.
      </footer>
    </div>
  )
}


export default LandingPage