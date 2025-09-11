import Header from "@/components/Header";
import QuarterData from "@/components/QuarterData";
import CompanyComparison from "@/components/CompanyComparison";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        <QuarterData />
        
        <Separator className="my-8" />
        
        <CompanyComparison />
      </main>
    </div>
  );
};

export default Index;