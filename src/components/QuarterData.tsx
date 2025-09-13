import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Play, FileText, Calendar, TrendingUp, TrendingDown, Search, Plus } from "lucide-react";
import { useState, useMemo } from "react";
import companiesData from "@/data/companies.json";
import resourcesData from "@/data/drive_links.json"; // 👈 new import

const QuarterData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(["TCS", "INFY", "RIL"]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter companies based on search term
  const filteredCompanies = useMemo(() => {
    if (!searchTerm) return [];
    return companiesData.companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Get companies to display in tabs
  const displayCompanies = useMemo(() => {
    return companiesData.companies.filter(company =>
      selectedCompanies.includes(company.symbol)
    );
  }, [selectedCompanies]);

  const handleCompanySelect = (company: any) => {
    if (!selectedCompanies.includes(company.symbol)) {
      setSelectedCompanies(prev => [...prev, company.symbol]);
    }
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const removeCompany = (symbol: string) => {
    setSelectedCompanies(prev => prev.filter(s => s !== symbol));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dashboard-header">Quarterly Earnings Data</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies (e.g., TCS, HDFC Bank)"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-10 w-80"
              />
            </div>
            
            {showSuggestions && filteredCompanies.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                    onClick={() => handleCompanySelect(company)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-sm text-muted-foreground">{company.symbol} • {company.sector}</p>
                      </div>
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Badge variant="outline" className="border-info text-info">
            <Calendar className="w-3 h-3 mr-1" />
            Q3 FY24 Season
          </Badge>
        </div>
      </div>

      <Tabs defaultValue={displayCompanies[0]?.symbol} className="w-full">
        <TabsList className={`grid w-full grid-cols-${Math.min(displayCompanies.length, 6)}`}>
          {displayCompanies.map((company) => (
            <TabsTrigger key={company.id} value={company.symbol} className="relative group">
              <span>{company.symbol}</span>
              {displayCompanies.length > 1 && (
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

        {displayCompanies.map((company) => (
          <TabsContent key={company.id} value={company.symbol} className="space-y-4">
            {company.quarters.map((quarter, qIndex) => {
              const resources =
                resourcesData[company.symbol]?.[quarter.quarter] || [];

              return (
                <Card key={qIndex} className="bg-dashboard-card border-border hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <CardTitle className="text-lg">{company.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {company.symbol} • {quarter.quarter} • {company.sector}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={quarter.status === "completed" ? "default" : "secondary"}
                        className={quarter.status === "completed" ? "bg-success text-success-foreground" : ""}
                      >
                        {quarter.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold">{quarter.revenue}</p>
                          <div className={`flex items-center text-xs ${
                            quarter.growth.startsWith('+') ? 'text-financial-positive' : 'text-financial-negative'
                          }`}>
                            {quarter.growth.startsWith('+') ? 
                              <TrendingUp className="w-3 h-3 mr-1" /> : 
                              <TrendingDown className="w-3 h-3 mr-1" />
                            }
                            {quarter.growth}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Net Profit</p>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold">{quarter.profit}</p>
                          <div className={`flex items-center text-xs ${
                            quarter.profitGrowth.startsWith('+') ? 'text-financial-positive' : 'text-financial-negative'
                          }`}>
                            {quarter.profitGrowth.startsWith('+') ? 
                              <TrendingUp className="w-3 h-3 mr-1" /> : 
                              <TrendingDown className="w-3 h-3 mr-1" />
                            }
                            {quarter.profitGrowth}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Call Date</p>
                        <p className="font-semibold">{quarter.callDate}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Resources</p>
                        <div className="flex flex-wrap gap-2">
                          {resources.length > 0 ? (
                            resources.map((res, index) => (
                              <a
                                key={index}
                                href={res.file}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-2 text-xs"
                                >
                                  {res.name.toLowerCase().includes("call") ? (
                                    <>
                                      <Play className="w-3 h-3 mr-1" />
                                      {res.name}
                                    </>
                                  ) : (
                                    <>
                                      <FileText className="w-3 h-3 mr-1" />
                                      {res.name}
                                    </>
                                  )}
                                </Button>
                              </a>
                            ))
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuarterData;
