import { Info, PlayCircle, Settings, Eye, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const InstructionsPanel = () => {
  return (
    <Card className="mb-6 border-2 border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-blue-800">
          <Info className="h-5 w-5" />
          <span>How to Use RMG Live-Ops Hub</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-sm">1. Configure</span>
            </div>
            <p className="text-xs text-gray-600">
              Adjust settings in the configuration panel. Change prize pools, rewards, and game parameters.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-sm">2. Preview</span>
            </div>
            <p className="text-xs text-gray-600">
              See real-time mobile previews for different persona types (Whale, Grinder, ROI).
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="font-semibold text-sm">3. Analyze</span>
            </div>
            <p className="text-xs text-gray-600">
              Review profit calculations and player insights to optimize your strategy.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <PlayCircle className="h-4 w-4 text-orange-600" />
              <span className="font-semibold text-sm">4. Deploy</span>
            </div>
            <p className="text-xs text-gray-600">
              Click "Deploy" buttons to apply configurations and see updated previews.
            </p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-blue-200">
          <h4 className="font-semibold text-sm text-gray-800 mb-2">Features Available:</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">Leaderboards</Badge>
            <Badge variant="outline" className="text-xs">Time-Limited Events</Badge>
            <Badge variant="outline" className="text-xs">Spins & Slots</Badge>
            <Badge variant="outline" className="text-xs">Battle Pass</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructionsPanel;