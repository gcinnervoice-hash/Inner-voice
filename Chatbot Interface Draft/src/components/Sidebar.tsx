import { Settings, PanelLeftClose, PanelLeft } from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  collapsed,
  onToggleCollapse
}: SidebarProps) {

  if (collapsed) {
    return (
      <div className="h-full flex flex-col">
        {/* Collapse Toggle */}
        <div className="p-4">
          <button
            onClick={onToggleCollapse}
            className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 group"
            title="展开侧边栏"
          >
            <PanelLeft className="w-5 h-5 text-white mx-auto group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="bg-white/90 rounded-xl p-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-black text-gray-800">Daisy</h1>
            <button
              onClick={onToggleCollapse}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="收起侧边栏"
            >
              <PanelLeftClose className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <p className="text-sm text-gray-600 font-medium">你的贴心AI伙伴</p>
        </div>
      </div>



      {/* Settings */}
      <div className="p-6">
        <button className="w-full flex items-center justify-center gap-2 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200">
          <Settings className="w-4 h-4 text-white" />
          <span className="text-white font-semibold text-sm">设置</span>
        </button>
      </div>
    </div>
  );
}