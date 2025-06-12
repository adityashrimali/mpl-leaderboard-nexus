
import { Trophy, Settings } from "lucide-react";

const MPLHeader = () => {
  return (
    <div className="gradient-mpl-primary text-white p-6 rounded-xl mb-8 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">MPL Leaderboard</h1>
            <p className="text-white/90 text-lg">Config & Live Preview Dashboard</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
          <Settings className="h-5 w-5" />
          <span className="font-medium">Live Operations</span>
        </div>
      </div>
    </div>
  );
};

export default MPLHeader;
