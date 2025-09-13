import { Heart, Sparkles, MessageSquare, Settings } from "lucide-react";

export function Sidebar() {
  const conversations = [
    { id: 1, title: "Daily Check-in", time: "2小时前", emoji: "🌸" },
    { id: 2, title: "心情分享", time: "昨天", emoji: "💭" },
    { id: 3, title: "睡眠质量", time: "3天前", emoji: "🌙" },
  ];

  const quickActions = [
    { icon: Heart, label: "情绪追踪", color: "text-pink-500" },
    { icon: Sparkles, label: "今日灵感", color: "text-purple-500" },
    { icon: MessageSquare, label: "深度对话", color: "text-blue-500" },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="bg-white/90 rounded-xl p-4 shadow-sm backdrop-blur-sm">
          <h1 className="text-2xl font-black text-gray-800 mb-1">Daisy</h1>
          <p className="text-sm text-gray-600 font-medium">你的贴心AI伙伴</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h3 className="text-sm font-bold text-white/80 mb-3 uppercase tracking-wide">快速功能</h3>
        <div className="space-y-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="w-full flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 group"
            >
              <action.icon className={`w-4 h-4 ${action.color} group-hover:scale-110 transition-transform`} />
              <span className="text-white font-semibold text-sm">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Conversations */}
      <div className="px-6 flex-1">
        <h3 className="text-sm font-bold text-white/80 mb-3 uppercase tracking-wide">最近对话</h3>
        <div className="space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="p-3 bg-white/15 backdrop-blur-sm rounded-lg hover:bg-white/25 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <span className="text-lg group-hover:scale-110 transition-transform">{conv.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{conv.title}</p>
                  <p className="text-white/70 text-xs font-medium">{conv.time}</p>
                </div>
              </div>
            </div>
          ))}
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