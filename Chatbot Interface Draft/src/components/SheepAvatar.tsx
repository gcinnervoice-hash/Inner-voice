interface SheepAvatarProps {
  isThinking?: boolean;
}

export function SheepAvatar({ isThinking = false }: SheepAvatarProps) {
  return (
    <div className={`w-20 h-20 relative ${isThinking ? 'animate-bounce' : ''}`}>
      <svg viewBox="0 0 100 100" className={`w-full h-full ${isThinking ? 'animate-pulse' : ''}`}>
        {/* Sheep body/wool - white fluffy part */}
        <circle cx="50" cy="55" r="35" fill="#f8f8f8" stroke="#333" strokeWidth="2"/>
        
        {/* Additional wool bumps for fluffy effect */}
        <circle cx="30" cy="40" r="12" fill="#f8f8f8" stroke="#333" strokeWidth="2"/>
        <circle cx="70" cy="40" r="12" fill="#f8f8f8" stroke="#333" strokeWidth="2"/>
        <circle cx="35" cy="65" r="10" fill="#f8f8f8" stroke="#333" strokeWidth="2"/>
        <circle cx="65" cy="65" r="10" fill="#f8f8f8" stroke="#333" strokeWidth="2"/>
        <circle cx="50" cy="25" r="15" fill="#f8f8f8" stroke="#333" strokeWidth="2"/>
        
        {/* Face - pink */}
        <ellipse cx="50" cy="50" rx="20" ry="18" fill="#ffb3d1" stroke="#333" strokeWidth="2"/>
        
        {/* Ears - pink inside */}
        <ellipse cx="38" cy="35" rx="6" ry="10" fill="#ffb3d1" stroke="#333" strokeWidth="2" transform="rotate(-20 38 35)"/>
        <ellipse cx="62" cy="35" rx="6" ry="10" fill="#ffb3d1" stroke="#333" strokeWidth="2" transform="rotate(20 62 35)"/>
        
        {/* Eyes - simple black dots, larger when thinking */}
        <circle cx="44" cy="45" r={isThinking ? "3" : "2"} fill="#333"/>
        <circle cx="56" cy="45" r={isThinking ? "3" : "2"} fill="#333"/>
        
        {/* Nose/mouth - simple pink dot and smile */}
        <circle cx="50" cy="52" r="1.5" fill="#ff69b4"/>
        <path d="M 45 57 Q 50 60 55 57" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        
        {/* Thinking bubbles when isThinking */}
        {isThinking && (
          <>
            <circle cx="75" cy="25" r="3" fill="#fff" stroke="#333" strokeWidth="1" className="animate-ping" />
            <circle cx="80" cy="15" r="2" fill="#fff" stroke="#333" strokeWidth="1" className="animate-ping" style={{animationDelay: '0.2s'}} />
            <circle cx="85" cy="8" r="1.5" fill="#fff" stroke="#333" strokeWidth="1" className="animate-ping" style={{animationDelay: '0.4s'}} />
          </>
        )}
      </svg>
    </div>
  );
}