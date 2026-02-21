import { useGravity } from "@/context/GravityContext";
import { Button } from "@/components/ui/button";
import { Rocket, ShieldOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GravityToggle = () => {
    const { isGravityActive, toggleGravity } = useGravity();

    return (
        <div className="fixed bottom-6 right-20 z-50">
            <AnimatePresence mode="wait">
                <motion.div
                    key={isGravityActive ? "active" : "inactive"}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Button
                        variant={isGravityActive ? "destructive" : "default"}
                        size="icon"
                        className={`rounded-full h-12 w-12 shadow-lg ${isGravityActive
                                ? "bg-red-500 hover:bg-red-600 ring-4 ring-red-500/30"
                                : "bg-primary hover:bg-primary/90"
                            }`}
                        onClick={toggleGravity}
                        title={isGravityActive ? "Disable Zero Gravity" : "Enable Zero Gravity"}
                    >
                        {isGravityActive ? (
                            <ShieldOff className="h-6 w-6 text-white" />
                        ) : (
                            <Rocket className="h-6 w-6 text-primary-foreground" />
                        )}
                    </Button>
                </motion.div>
            </AnimatePresence>

            {/* Tooltip hint on hover could go here, relying on title for now */}
        </div>
    );
};

export default GravityToggle;
