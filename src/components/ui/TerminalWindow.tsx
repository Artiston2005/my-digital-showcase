import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, Maximize2 } from 'lucide-react';

interface TerminalWindowProps {
  commands: string[];
}

interface HistoryLine {
  type: 'command' | 'output' | 'system';
  content: string | React.ReactNode;
}

const TerminalWindow = ({ commands }: TerminalWindowProps) => {
  const [copied, setCopied] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [displayedText, setDisplayedText] = useState("");
  const [activeCommandIndex, setActiveCommandIndex] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal ONLY
  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, [history, displayedText, currentInput]);

  // Boot Sequence Logic
  useEffect(() => {
    if (isInteractive) return;

    let currentCharIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeChar = () => {
      if (activeCommandIndex >= commands.length) {
        // Boot complete, switch to interactive
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'system', content: 'Ecosystem initialized. Type "help" to see available commands.' }]);
          setIsInteractive(true);
        }, 1000);
        return;
      }
      
      const currentFullCommand = commands[activeCommandIndex];

      if (currentCharIndex < currentFullCommand.length) {
        setDisplayedText(currentFullCommand.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        timeoutId = setTimeout(typeChar, 30 + Math.random() * 40);
      } else {
        // Wait, then push to history and move to next
        timeoutId = setTimeout(() => {
          setHistory(prev => [
            ...prev,
            { type: 'command', content: currentFullCommand },
            { type: 'output', content: getFakeOutput(currentFullCommand) }
          ]);
          setActiveCommandIndex(prev => prev + 1);
          setDisplayedText("");
          currentCharIndex = 0;
          typeChar();
        }, 600);
      }
    };

    timeoutId = setTimeout(typeChar, 1000);
    return () => clearTimeout(timeoutId);
  }, [activeCommandIndex, commands, isInteractive]);

  const getFakeOutput = (cmd: string) => {
    if (cmd.includes("aura-ai-daemon")) return "[OK] Daemon started on port 8000";
    if (cmd.includes("Initializing")) return "[OK] Graphs compiled.";
    if (cmd.includes("Mounting")) return "[OK] Model 'llama3.1' loaded into VRAM.";
    if (cmd.includes("HeyGIT")) return "[OK] Proxy bound to 127.0.0.1:8080";
    return "[OK] Success";
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory(prev => [...prev, { type: 'command', content: trimmed }]);
      return;
    }

    setHistory(prev => [...prev, { type: 'command', content: trimmed }]);
    
    let output: React.ReactNode = "";
    const lowerCmd = trimmed.toLowerCase();

    switch (lowerCmd) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 text-green-400">
            <span>Available commands:</span>
            <span>  <strong className="text-white">whoami</strong>   - View my identity</span>
            <span>  <strong className="text-white">skills</strong>   - List tech stack</span>
            <span>  <strong className="text-white">projects</strong> - Display key projects</span>
            <span>  <strong className="text-white">sudo</strong>     - Superuser access</span>
            <span>  <strong className="text-white">clear</strong>    - Clear terminal</span>
          </div>
        );
        break;
      case 'whoami':
        output = "Ashwin Yadav. CSE Student & Systems Engineer. Builder of autonomous ecosystems.";
        break;
      case 'skills':
        output = "Kotlin, Python, React, Jetpack Compose, FastAPI, LangGraph, Firebase, ChromaDB.";
        break;
      case 'projects':
        output = "1. AuraAI (Local Agentic AI)\n2. HeyGIT (Cross-platform Network Auth)\n3. RTUKaGyan (AI Learning Studio)";
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'sudo rm -rf /':
      case 'sudo':
        output = <span className="text-red-500">Nice try. This incident will be reported.</span>;
        break;
      default:
        output = <span className="text-red-400">Command not found: {trimmed}. Type 'help' for available commands.</span>;
    }

    setTimeout(() => {
      setHistory(prev => [...prev, { type: 'output', content: output }]);
    }, 200);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isInteractive) return;
    handleCommand(currentInput);
    setCurrentInput('');
  };

  const handleTerminalClick = () => {
    if (isInteractive && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("Ashwin Yadav - Systems Engineer");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleTerminalClick}
      className="rounded-xl overflow-hidden border border-border bg-[#0d0d0f]/90 backdrop-blur-md shadow-[0_0_40px_rgba(0,120,255,0.1)] w-full max-w-2xl mx-auto h-[400px] flex flex-col cursor-text"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-border/50 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 ml-4 text-xs text-muted-foreground font-mono">
            <Terminal size={13} />
            <span>ashwin@dev-machine: ~</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleCopy} className="text-muted-foreground hover:text-white transition-colors">
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
          <button className="text-muted-foreground hover:text-white transition-colors">
            <Maximize2 size={14} />
          </button>
        </div>
      </div>
      
      {/* Body */}
      <div ref={scrollContainerRef} className="p-4 md:p-5 font-mono text-sm md:text-sm text-gray-300 flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-2">
          
          {/* History */}
          {history.map((line, i) => (
            <div key={i}>
              {line.type === 'command' && (
                <div className="flex gap-2 text-primary">
                  <span className="text-green-500 font-bold">➜</span>
                  <span className="text-blue-400 font-bold">~</span>
                  <span className="text-gray-100">{line.content}</span>
                </div>
              )}
              {line.type === 'output' && (
                <div className="pl-4 text-gray-400 mt-1 mb-2 whitespace-pre-wrap">
                  {line.content}
                </div>
              )}
              {line.type === 'system' && (
                <div className="text-cyan-400 italic mb-4 mt-2 border-l-2 border-cyan-500/30 pl-2">
                  {line.content}
                </div>
              )}
            </div>
          ))}

          {/* Current Typing / Input Line */}
          <div className="flex gap-2 text-primary items-center">
            <span className="text-green-500 font-bold">➜</span>
            <span className="text-blue-400 font-bold">~</span>
            
            {!isInteractive ? (
              <span className="text-gray-100">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-4 bg-gray-400 ml-1 align-middle"
                />
              </span>
            ) : (
              <form onSubmit={onSubmit} className="flex-1 flex items-center bg-transparent">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-gray-100 font-mono focus:ring-0 p-0 m-0 caret-white"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalWindow;
