import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, FileText } from "lucide-react";
import { useState, useMemo } from "react";
import data from "@/data/companies.json"; // your JSON

const QuarterData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]); // start empty
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Convert JSON into array
  const companies = useMemo(() => {
    return Object.keys(data).map((symbol) => ({
      symbol,
      quarters: data[symbol],
    }));
  }, []);

  // Search filter
  const filteredCompanies = useMemo(() => {
    if (!searchTerm) return [];
    return companies.filter((company) =>
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, companies]);

  // Companies displayed in tabs
  const displayCompanies = useMemo(() => {
    return companies.filter((c) => selectedCompanies.includes(c.symbol));
  }, [selectedCompanies, companies]);

  const handleCompanySelect = (company: any) => {
    if (!selectedCompanies.includes(company.symbol)) {
      setSelectedCompanies((prev) => [...prev, company.symbol]);
    }
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const removeCompany = (symbol: string) => {
    setSelectedCompanies((prev) => prev.filter((s) => s !== symbol));
  };

  return (
    <div className="space-y-6">
      {/* Header + Search */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dashboard-header">
          Quarterly Earnings Data
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies (e.g., PHOENIXLTD, PGIL)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSuggestions(searchTerm.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-10 w-80"
          />
          {showSuggestions && filteredCompanies.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredCompanies.map((company) => (
                <div
                  key={company.symbol}
                  className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                  onClick={() => handleCompanySelect(company)}
                >
                  <p className="font-medium">{company.symbol}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Only show Tabs when companies are selected */}
      {displayCompanies.length > 0 && (
        <Tabs defaultValue={displayCompanies[0]?.symbol} className="w-full">
          <TabsList
            className={`grid w-full grid-cols-${Math.min(
              displayCompanies.length,
              6
            )}`}
          >
            {displayCompanies.map((company) => (
              <TabsTrigger
                key={company.symbol}
                value={company.symbol}
                className="relative group"
              >
                <span>{company.symbol}</span>
                {displayCompanies.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCompany(company.symbol);
                    }}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Quarter cards */}
          {displayCompanies.map((company) => (
            <TabsContent
              key={company.symbol}
              value={company.symbol}
              className="space-y-4"
            >
              {Object.entries(company.quarters).map(([quarter, resources]) => (
                <Card
                  key={quarter}
                  className="bg-dashboard-card border-border hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle>
                      {company.symbol} • {quarter}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {(resources as any[]).map((res, i) => (
                      <Button
                        key={i}
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                      >
                        <a
                          href={res.file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="w-3 h-3 mr-1" /> {res.name}
                        </a>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default QuarterData;
