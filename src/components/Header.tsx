import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="bg-dashboard-header text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8" />
            <h1 className="text-2xl font-bold">EarningsHub India</h1>
          </div>
          
          <div className="flex items-center space-x-4 w-full max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search companies (e.g., TCS, Infosys, Reliance)"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;