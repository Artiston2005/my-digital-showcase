import { Moon, Sun, Flame, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./ThemeProvider";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case "diwali": return <Flame className="h-5 w-5 text-orange-500 transition-all" />;
      case "christmas": return <Snowflake className="h-5 w-5 text-red-500 transition-all" />;
      case "holi": return <Sun className="h-5 w-5 text-pink-500 transition-all" />;
      default: return <Moon className="h-5 w-5 transition-all" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-all duration-300">
          {getIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-background/95 backdrop-blur-xl border-border animate-in fade-in zoom-in-95 duration-200">
        <DropdownMenuItem onClick={() => setTheme("default")} className="cursor-pointer gap-2 focus:bg-primary/10 focus:text-primary">
          <Moon className="h-4 w-4" /> Default
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("diwali")} className="cursor-pointer gap-2 focus:bg-orange-500/10 focus:text-orange-500">
          <Flame className="h-4 w-4 text-orange-500" /> Diwali
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("christmas")} className="cursor-pointer gap-2 focus:bg-red-500/10 focus:text-red-500">
          <Snowflake className="h-4 w-4 text-red-500" /> Christmas
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("holi")} className="cursor-pointer gap-2 focus:bg-pink-500/10 focus:text-pink-500">
          <Sun className="h-4 w-4 text-pink-500" /> Holi
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;