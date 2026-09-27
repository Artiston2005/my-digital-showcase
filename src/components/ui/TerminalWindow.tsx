import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';

interface TerminalWindowProps {
  commands: string[];
}

const TerminalWindow = ({ commands }: TerminalWindowProps) => {
  const [copied, setCopied] = useState(false);
  const [activeCommand, setActiveCommand] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentCommandIndex = 0;
    let currentCharIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeChar = () => {
      if (currentCommandIndex >= commands.length) return;
      
      const currentFullCommand = commands[currentCommandIndex];

      if (currentCharIndex < currentFullCommand.length) {
        setDisplayedText(currentFullCommand.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        timeoutId = setTimeout(typeChar, 50 + Math.random() * 50); // random typing speed
      } else {
        // Finished typing one command, wait a bit, then move to next
        timeoutId = setTimeout(() => {
          currentCommandIndex++;
          currentCharIndex = 0;
          if (currentCommandIndex < commands.length) {
            setActiveCommand(currentCommandIndex);
            setDisplayedText("");
            typeChar();
          } else {
            // Loop back to start after delay
            setTimeout(() => {
              currentCommandIndex = 0;
              setActiveCommand(0);
              setDisplayedText("");
              typeChar();
            }, 3000);
          }
        }, 1500);
      }
    };

    timeoutId = setTimeout(typeChar, 500);

    return () => clearTimeout(timeoutId);
  }, [commands]);

  const handleCopy = () => {
    navigator.clipboard.writeText(commands.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden border border-border bg-background/80 backdrop-blur-md shadow-2xl w-full max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2 ml-4 text-xs text-muted-foreground font-mono">
            <Terminal size={14} />
            <span>ashwin@dev-machine: ~</span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </div>
      
      {/* Body */}
      <div className="p-4 md:p-6 font-mono text-sm md:text-base text-foreground/90 overflow-x-auto">
        <div className="flex flex-col gap-2">
          {commands.map((cmd, index) => (
            <div key={index} className={index > activeCommand ? "hidden" : "block"}>
              <div className="flex gap-2 text-primary">
                <span className="text-green-500 font-bold">➜</span>
                <span className="text-blue-400 font-bold">~</span>
                <span className={index === activeCommand ? "text-foreground" : "text-muted-foreground"}>
                  {index === activeCommand ? displayedText : cmd}
                  {index === activeCommand && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
                    />
                  )}
                </span>
              </div>
              {index < activeCommand && (
                <div className="pl-4 text-muted-foreground mt-1 mb-3">
                  {cmd.includes("build") ? "[Success] Build completed in 2.4s" : 
                   cmd.includes("deploy") ? "🚀 Deployed to production" : 
                   cmd.includes("test") ? "✓ All tests passed (142/142)" :
                   "Executed successfully."}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalWindow;
