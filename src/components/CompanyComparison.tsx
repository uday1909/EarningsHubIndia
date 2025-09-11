import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, BarChart3, TrendingUp } from "lucide-react";

const companies = [
  { symbol: "TCS", name: "Tata Consultancy Services" },
  { symbol: "INFY", name: "Infosys Limited" },
  { symbol: "RIL", name: "Reliance Industries" },
  { symbol: "HDFCBANK", name: "HDFC Bank" },
  { symbol: "ITC", name: "ITC Limited" }
];

const sampleData = {
  TCS: {
    revenue: { q3: 59162, q2: 58229, q1: 57851, growth: 4.1 },
    profit: { q3: 11058, q2: 10815, q1: 10342, growth: 7.2 },
    margin: { q3: 18.7, q2: 18.6, q1: 17.9, growth: 0.1 },
    employees: { q3: 614795, q2: 613974, q1: 608985, growth: 0.1 }
  },
  INFY: {
    revenue: { q3: 37923, q2: 37441, q1: 36893, growth: 1.6 },
    profit: { q3: 6586, q2: 6128, q1: 5945, growth: 7.9 },
    margin: { q3: 17.4, q2: 16.4, q1: 16.1, growth: 1.0 },
    employees: { q3: 343234, q2: 340063, q1: 335186, growth: 0.9 }
  },
  RIL: {
    revenue: { q3: 235122, q2: 230755, q1: 221582, growth: 8.8 },
    profit: { q3: 18951, q2: 16969, q1: 15621, growth: 12.1 },
    margin: { q3: 8.1, q2: 7.4, q1: 7.0, growth: 0.7 },
    employees: { q3: 0, q2: 0, q1: 0, growth: 0 }
  }
};

const CompanyComparison = () => {
  const [company1, setCompany1] = useState<string>("");
  const [company2, setCompany2] = useState<string>("");

  const data1 = company1 ? sampleData[company1 as keyof typeof sampleData] : null;
  const data2 = company2 ? sampleData[company2 as keyof typeof sampleData] : null;

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K Cr`;
    }
    return `₹${value} Cr`;
  };

  const ComparisonMetric = ({ 
    label, 
    value1, 
    value2, 
    growth1, 
    growth2, 
    isPercentage = false,
    isCurrency = false 
  }: {
    label: string;
    value1: number;
    value2: number;
    growth1: number;
    growth2: number;
    isPercentage?: boolean;
    isCurrency?: boolean;
  }) => (
    <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg bg-dashboard-card">
      <div className="font-medium text-center">{label}</div>
      <div className="text-center space-y-2">
        <div className="font-semibold text-lg">
          {isCurrency ? formatCurrency(value1) : isPercentage ? `${value1}%` : value1.toLocaleString()}
        </div>
        <div className={`flex items-center justify-center text-sm ${
          growth1 >= 0 ? 'text-financial-positive' : 'text-financial-negative'
        }`}>
          {growth1 >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {growth1 >= 0 ? '+' : ''}{growth1}%
        </div>
      </div>
      <div className="text-center space-y-2">
        <div className="font-semibold text-lg">
          {isCurrency ? formatCurrency(value2) : isPercentage ? `${value2}%` : value2.toLocaleString()}
        </div>
        <div className={`flex items-center justify-center text-sm ${
          growth2 >= 0 ? 'text-financial-positive' : 'text-financial-negative'
        }`}>
          {growth2 >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {growth2 >= 0 ? '+' : ''}{growth2}%
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dashboard-header">Company Comparison</h2>
        <Badge variant="outline" className="border-chart-primary text-chart-primary">
          <BarChart3 className="w-3 h-3 mr-1" />
          Q3 FY24 Comparison
        </Badge>
      </div>

      <Card className="bg-dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Select Companies to Compare</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company 1</label>
              <Select value={company1} onValueChange={setCompany1}>
                <SelectTrigger>
                  <SelectValue placeholder="Select first company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem 
                      key={company.symbol} 
                      value={company.symbol}
                      disabled={company.symbol === company2}
                    >
                      {company.name} ({company.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company 2</label>
              <Select value={company2} onValueChange={setCompany2}>
                <SelectTrigger>
                  <SelectValue placeholder="Select second company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem 
                      key={company.symbol} 
                      value={company.symbol}
                      disabled={company.symbol === company1}
                    >
                      {company.name} ({company.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {data1 && data2 && (
        <Card className="bg-dashboard-card">
          <CardHeader>
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Metric</div>
              <div className="text-center font-medium">
                {companies.find(c => c.symbol === company1)?.name}
                <div className="text-sm text-muted-foreground font-normal">({company1})</div>
              </div>
              <div className="text-center font-medium">
                {companies.find(c => c.symbol === company2)?.name}
                <div className="text-sm text-muted-foreground font-normal">({company2})</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ComparisonMetric
              label="Revenue (Q3)"
              value1={data1.revenue.q3}
              value2={data2.revenue.q3}
              growth1={data1.revenue.growth}
              growth2={data2.revenue.growth}
              isCurrency={true}
            />
            
            <ComparisonMetric
              label="Net Profit (Q3)"
              value1={data1.profit.q3}
              value2={data2.profit.q3}
              growth1={data1.profit.growth}
              growth2={data2.profit.growth}
              isCurrency={true}
            />
            
            <ComparisonMetric
              label="Profit Margin (Q3)"
              value1={data1.margin.q3}
              value2={data2.margin.q3}
              growth1={data1.margin.growth}
              growth2={data2.margin.growth}
              isPercentage={true}
            />

            {(data1.employees.q3 > 0 && data2.employees.q3 > 0) && (
              <ComparisonMetric
                label="Employee Count"
                value1={data1.employees.q3}
                value2={data2.employees.q3}
                growth1={data1.employees.growth}
                growth2={data2.employees.growth}
              />
            )}
          </CardContent>
        </Card>
      )}

      {(!company1 || !company2) && (
        <Card className="bg-dashboard-card border-dashed">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">
                Select two companies above to see detailed quarterly comparison
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyComparison;