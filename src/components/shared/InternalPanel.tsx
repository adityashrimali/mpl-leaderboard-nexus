import { Settings } from "lucide-react";

interface InternalPanelProps {
  title: string;
  children: React.ReactNode;
}

const InternalPanel = ({ title, children }: InternalPanelProps) => {
  return (
    <div className="bg-slate-50 rounded-xl border-l-4 border-rmg-red shadow-sm">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Settings className="w-5 h-5 text-rmg-red mr-2" />
          <h2 className="text-xl font-semibold text-rmg-red">{title}</h2>
          <span className="ml-auto text-xs text-gray-500 font-medium">INTERNAL</span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default InternalPanel;