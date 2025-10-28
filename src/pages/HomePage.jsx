import { useNavigate } from "react-router-dom";
import { Briefcase, Zap, User, Plus } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-6 text-center">
      {/* Logo and Main Heading */}
      <header className="mb-10">
        {/* Icon changed to Briefcase to fit the job platform theme */}
        <Briefcase
          className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-pulse transition duration-1000 transform hover:scale-110"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Your Next <span className="text-indigo-600">Career Step</span> Starts
          Here
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose your path: Connect with top companies or find the perfect
          talent for your team.
        </p>
      </header>

      {/* Access Buttons for Segmented Registration */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg">
        {/* Job Seeker Button */}
        <button
          onClick={handleRegister}
          className="flex-1 flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-indigo-600 rounded-xl shadow-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[1]"
        >
          <User className="w-15 h-15 mr-3" />
          I'm looking for a job
        </button>

        {/* Employer Button */}
        <button
          onClick={handleRegister}
          className="
                        flex-1 flex items-center justify-center 
                        px-8 py-4 text-lg font-bold 
                        text-indigo-600 bg-white 
                        border-2 border-indigo-600
                        rounded-xl shadow-xl 
                        hover:bg-indigo-50 
                        focus:ring-4 focus:ring-indigo-300 
                        transition duration-300 ease-in-out
                        transform hover:scale-[1.02] active:scale-[1]
                    "
        >
          <Plus className="w-15 h-15 mr-3" />
          I'm posting an offer
        </button>
      </div>

      {/* Footer / Secondary Link */}
      <footer className="mt-12">
        <p className="text-sm text-gray-500">
          Already have an account?
          <a
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:text-indigo-700 font-semibold ml-1 cursor-pointer transition"
          >
            Sign In here.
          </a>
        </p>
      </footer>

      <style>{`
        /* Defines the animation for the slow 'bounce' effect */
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        body,
        html {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
