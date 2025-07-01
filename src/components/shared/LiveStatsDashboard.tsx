const LiveStatsDashboard = () => {
  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Stats Dashboard</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-rmg-red/10 to-rmg-orange/10 rounded-lg">
          <div className="text-2xl font-bold text-rmg-red">1,247</div>
          <div className="text-sm text-gray-600">Active Players</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-rmg-purple/10 to-rmg-blue/10 rounded-lg">
          <div className="text-2xl font-bold text-rmg-purple">₹89.2K</div>
          <div className="text-sm text-gray-600">Total Pool</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-rmg-green/10 to-rmg-blue/10 rounded-lg">
          <div className="text-2xl font-bold text-rmg-green">342</div>
          <div className="text-sm text-gray-600">Games/Hour</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-rmg-gold/10 to-rmg-orange/10 rounded-lg">
          <div className="text-2xl font-bold text-rmg-gold">94%</div>
          <div className="text-sm text-gray-600">Engagement</div>
        </div>
      </div>
    </div>
  );
};

export default LiveStatsDashboard;