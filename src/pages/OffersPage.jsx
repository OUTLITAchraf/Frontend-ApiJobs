import { useState } from "react";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Building2, 
  Clock, 
  Bookmark,
  Eye,
  User,
  Bell,
  Settings,
  LogOut,
  ChevronDown
} from "lucide-react";

const OffersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const offers = [
    {
      id: 1,
      title: "Senior Software Engineer",
      description: "We are looking for an experienced software engineer to join our dynamic team. You will be responsible for developing high-quality applications and working with cutting-edge technologies.",
      company_name: "TechCorp Solutions",
      location: "Casablanca, Morocco",
      salary: "15,000 - 20,000 MAD",
      type: "Full-time",
      employer_id: 1,
      posted: "2 days ago",
      applicants: 24
    },
    {
      id: 2,
      title: "UI/UX Designer",
      description: "Join our creative team as a UI/UX Designer. You'll work on exciting projects, creating beautiful and intuitive user interfaces for web and mobile applications.",
      company_name: "Creative Digital Agency",
      location: "Rabat, Morocco",
      salary: "10,000 - 15,000 MAD",
      type: "Full-time",
      employer_id: 2,
      posted: "1 week ago",
      applicants: 18
    },
    {
      id: 3,
      title: "Marketing Specialist",
      description: "We're seeking a talented marketing specialist to develop and implement marketing strategies. Experience with digital marketing and social media is essential.",
      company_name: "Growth Marketing Inc",
      location: "Marrakech, Morocco",
      salary: "8,000 - 12,000 MAD",
      type: "Part-time",
      employer_id: 3,
      posted: "3 days ago",
      applicants: 32
    },
    {
      id: 4,
      title: "Data Analyst",
      description: "Looking for a data analyst to help us make data-driven decisions. You'll work with large datasets and create insightful reports and visualizations.",
      company_name: "DataViz Pro",
      location: "Casablanca, Morocco",
      salary: "12,000 - 18,000 MAD",
      type: "Full-time",
      employer_id: 4,
      posted: "5 days ago",
      applicants: 15
    },
    {
      id: 5,
      title: "Customer Support Agent",
      description: "Join our customer support team and help our clients succeed. Excellent communication skills and problem-solving abilities required.",
      company_name: "Support Solutions",
      location: "Tangier, Morocco",
      salary: "6,000 - 8,000 MAD",
      type: "Contract",
      employer_id: 5,
      posted: "1 day ago",
      applicants: 45
    },
    {
      id: 6,
      title: "Frontend Developer",
      description: "We need a skilled frontend developer with expertise in React and modern web technologies. You'll build responsive and performant user interfaces.",
      company_name: "WebTech Studios",
      location: "Casablanca, Morocco",
      salary: "13,000 - 17,000 MAD",
      type: "Full-time",
      employer_id: 6,
      posted: "4 days ago",
      applicants: 28
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case "Full-time":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "Part-time":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Contract":
        return "bg-pink-100 text-pink-700 border-pink-200";
      case "Freelance":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {filteredOffers.length} Job{filteredOffers.length !== 1 ? 's' : ''} Available
            </h2>
            <p className="text-gray-600 mt-1">Find the perfect match for your skills</p>
          </div>
        </div>

        {/* Job Offers Grid */}
        <div className="grid gap-6">
          {filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-indigo-600 group"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Left Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Building2 className="w-8 h-8 text-indigo-600" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            {offer.title}
                          </h3>
                          <p className="text-lg text-gray-600 font-semibold flex items-center gap-2">
                            <Building2 className="w-5 h-5" />
                            {offer.company_name}
                          </p>
                        </div>

                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Bookmark className="w-6 h-6 text-gray-400 hover:text-indigo-600" />
                        </button>
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {offer.description}
                      </p>

                      {/* Job Details */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-900">
                          <MapPin className="w-5 h-5 text-indigo-600" />
                          <span className="font-medium">{offer.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-900">
                          <DollarSign className="w-5 h-5 text-indigo-600" />
                          <span className="font-medium">{offer.salary}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-900">
                          <Clock className="w-5 h-5 text-indigo-600" />
                          <span className="font-medium">{offer.posted}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-900">
                          <Eye className="w-5 h-5 text-indigo-600" />
                          <span className="font-medium">{offer.applicants} applicants</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 ${getTypeColor(offer.type)}`}>
                          <Briefcase className="w-4 h-4 inline mr-1" />
                          {offer.type}
                        </span>
                      </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex flex-col gap-3 lg:w-48">
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        Apply Now
                      </button>
                      <button className="w-full border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Jobs Found</h3>
              <p className="text-gray-600">Try adjusting your search or filters to find more opportunities</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOffers.length > 0 && (
          <div className="mt-12 flex justify-center gap-2">
            <button className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-indigo-600 hover:text-indigo-600 font-semibold transition-all">
              Previous
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow-md">1</button>
            <button className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-indigo-600 hover:text-indigo-600 font-semibold transition-all">
              2
            </button>
            <button className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-indigo-600 hover:text-indigo-600 font-semibold transition-all">
              3
            </button>
            <button className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-indigo-600 hover:text-indigo-600 font-semibold transition-all">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;