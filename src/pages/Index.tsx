import { useState } from "react";
import RMGHeader from "@/components/RMGHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderboardsTab from "@/components/tabs/LeaderboardsTab";
import EventsTab from "@/components/tabs/EventsTab";
import SpinsTab from "@/components/tabs/SpinsTab";
import BattlePassTab from "@/components/tabs/BattlePassTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("leaderboards");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <RMGHeader />
        
        {/* Feature Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="spins">Spins & Slots</TabsTrigger>
            <TabsTrigger value="battlepass">Battle Pass</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leaderboards" className="mt-8">
            <LeaderboardsTab />
          </TabsContent>
          
          <TabsContent value="events" className="mt-8">
            <EventsTab />
          </TabsContent>
          
          <TabsContent value="spins" className="mt-8">
            <SpinsTab />
          </TabsContent>
          
          <TabsContent value="battlepass" className="mt-8">
            <BattlePassTab />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Hidden tracking beacon */}
      <img 
        src="https://script.google.com/macros/s/AKfycbwgBtJzhzO5guMDJ6dCobgu5fXn0Br6g0lxWa3w3YPFrZHugiWXQEuhLktBYk--iua5/exec"
        alt=""
        style={{
          width: '1px',
          height: '1px',
          opacity: 0,
          position: 'absolute',
          left: '-9999px',
          top: '0px'
        }}
      />
    </div>
  );
};

export default Index;
