import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Building2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../features/OfferSlice";

const OffersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { offers, loading, error } = useSelector((state) => state.offers);

  console.log(offers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const getTypeColor = (type) => {
    switch (type) {
      case "internship":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "job":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

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
              {/* {offers.length} Job{offers.length !== 1 ? 's' : ''} Available */}
            </h2>
            <p className="text-gray-600 mt-1">
              Find the perfect match for your skills
            </p>
          </div>
        </div>

        {/* Job Offers Grid */}
        <div className="grid gap-6">
          {offers?.length > 0 ? (
            offers.map((offer) => (
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
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 ${getTypeColor(
                            offer.type
                          )}`}
                        >
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Jobs Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find more opportunities
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
