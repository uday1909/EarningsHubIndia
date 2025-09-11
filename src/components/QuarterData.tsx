import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Play, FileText, Calendar, TrendingUp, TrendingDown } from "lucide-react";

const sampleCompanies = [
  {
    id: 1,
    name: "Tata Consultancy Services",
    symbol: "TCS",
    quarter: "Q3 FY24",
    revenue: "₹59,162 Cr",
    growth: "+4.1%",
    profit: "₹11,058 Cr",
    profitGrowth: "+7.2%",
    callDate: "Jan 11, 2024",
    status: "completed",
    recordings: [
      { type: "earnings-call", duration: "45 min", url: "#" },
      { type: "presentation", pages: "32 slides", url: "#" }
    ]
  },
  {
    id: 2,
    name: "Infosys Limited",
    symbol: "INFY",
    quarter: "Q3 FY24",
    revenue: "₹37,923 Cr",
    growth: "+1.6%",
    profit: "₹6,586 Cr",
    profitGrowth: "+7.9%",
    callDate: "Jan 11, 2024",
    status: "completed",
    recordings: [
      { type: "earnings-call", duration: "42 min", url: "#" },
      { type: "presentation", pages: "28 slides", url: "#" }
    ]
  },
  {
    id: 3,
    name: "Reliance Industries",
    symbol: "RIL",
    quarter: "Q3 FY24",
    revenue: "₹2,35,122 Cr",
    growth: "+8.8%",
    profit: "₹18,951 Cr",
    profitGrowth: "+12.1%",
    callDate: "Jan 19, 2024",
    status: "upcoming",
    recordings: []
  }
];

const QuarterData = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dashboard-header">Quarterly Earnings Data</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-info text-info">
            <Calendar className="w-3 h-3 mr-1" />
            Q3 FY24 Season
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="TCS" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {sampleCompanies.map((company) => (
            <TabsTrigger key={company.id} value={company.symbol}>
              {company.symbol}
            </TabsTrigger>
          ))}
        </TabsList>

        {sampleCompanies.map((company) => (
          <TabsContent key={company.id} value={company.symbol} className="space-y-4">
            <Card className="bg-dashboard-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{company.symbol} • {company.quarter}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={company.status === "completed" ? "default" : "secondary"}
                    className={company.status === "completed" ? "bg-success text-success-foreground" : ""}
                  >
                    {company.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold">{company.revenue}</p>
                      <div className={`flex items-center text-xs ${
                        company.growth.startsWith('+') ? 'text-financial-positive' : 'text-financial-negative'
                      }`}>
                        {company.growth.startsWith('+') ? 
                          <TrendingUp className="w-3 h-3 mr-1" /> : 
                          <TrendingDown className="w-3 h-3 mr-1" />
                        }
                        {company.growth}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Net Profit</p>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold">{company.profit}</p>
                      <div className={`flex items-center text-xs ${
                        company.profitGrowth.startsWith('+') ? 'text-financial-positive' : 'text-financial-negative'
                      }`}>
                        {company.profitGrowth.startsWith('+') ? 
                          <TrendingUp className="w-3 h-3 mr-1" /> : 
                          <TrendingDown className="w-3 h-3 mr-1" />
                        }
                        {company.profitGrowth}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Call Date</p>
                    <p className="font-semibold">{company.callDate}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Resources</p>
                    <div className="flex flex-wrap gap-2">
                      {company.recordings.map((recording, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 text-xs"
                        >
                          {recording.type === "earnings-call" ? (
                            <>
                              <Play className="w-3 h-3 mr-1" />
                              Call ({recording.duration})
                            </>
                          ) : (
                            <>
                              <FileText className="w-3 h-3 mr-1" />
                              Slides ({recording.pages})
                            </>
                          )}
                        </Button>
                      ))}
                      {company.recordings.length === 0 && (
                        <Badge variant="secondary" className="text-xs">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuarterData;