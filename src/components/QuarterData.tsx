import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, FileText } from "lucide-react";
import { useState, useMemo } from "react";
import data from "@/data/companies.json"; // your JSON

const QuarterData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Convert JSON into array
  const companies = useMemo(() => {
    return Object.keys(data).map((symbol) => ({
      symbol,
      quarters: data[symbol],
    }));
  }, []);

  // Filter companies
  const filteredCompanies = useMemo(() => {
    if (!searchTerm) return [];
    return companies.filter((company) =>
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, companies]);

  const handleCompanySelect = (company: any) => {
    setSelectedCompany(company);
    setSearchTerm(company.symbol);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-6">
      {/* Header + Search */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-dashboard-header">
          Quarterly Earnings Data
        </h2>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search company (e.g., PHOENIXLTD)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSuggestions(searchTerm.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-10"
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

      {/* Selected company quarters */}
      {selectedCompany && (
        <div>
          <h3 className="text-xl font-semibold mb-4">{selectedCompany.symbol}</h3>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {Object.entries(selectedCompany.quarters).map(([quarter, resources]) => (
              <AccordionItem key={quarter} value={quarter}>
                <AccordionTrigger>{quarter}</AccordionTrigger>
                <AccordionContent>
                  <Card className="bg-dashboard-card border-border">
                    <CardHeader>
                      <CardTitle>{quarter}</CardTitle>
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
                          <a href={res.file} target="_blank" rel="noopener noreferrer">
                            <FileText className="w-3 h-3 mr-1" /> {res.name}
                          </a>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default QuarterData;
