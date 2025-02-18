
import { ZoomIn, ZoomOut, RotateCcw, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AvatarDisplayProps {
  timeOffset: number;
  selectedBodyPart: string | null;
  onBodyPartSelect: (part: string | null) => void;
}

export const AvatarDisplay = ({ 
  timeOffset, 
  selectedBodyPart,
  onBodyPartSelect 
}: AvatarDisplayProps) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  const handleRotate = (direction: 'left' | 'right') => {
    setRotation(prev => direction === 'left' ? prev - 90 : prev + 90);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => direction === 'in' ? Math.min(prev + 0.2, 2) : Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="relative">
      <div className="aspect-square bg-white rounded-lg border border-[#D3E4FD] overflow-hidden">
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{ 
            transform: `rotate(${rotation}deg) scale(${zoom})`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="relative w-[80%] h-[80%]">
            {/* Placeholder avatar - replace with actual avatar system */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-full h-full text-slate-400"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            
            {/* Interactive body part regions */}
            <div 
              className={`absolute top-[20%] left-[40%] w-[20%] h-[10%] cursor-pointer 
                ${selectedBodyPart === 'head' ? 'bg-blue-200/50' : 'hover:bg-blue-100/30'}`}
              onClick={() => onBodyPartSelect(selectedBodyPart === 'head' ? null : 'head')}
            />
            <div 
              className={`absolute top-[30%] left-[35%] w-[30%] h-[20%] cursor-pointer
                ${selectedBodyPart === 'torso' ? 'bg-blue-200/50' : 'hover:bg-blue-100/30'}`}
              onClick={() => onBodyPartSelect(selectedBodyPart === 'torso' ? null : 'torso')}
            />
            <div 
              className={`absolute top-[50%] left-[35%] w-[30%] h-[30%] cursor-pointer
                ${selectedBodyPart === 'legs' ? 'bg-blue-200/50' : 'hover:bg-blue-100/30'}`}
              onClick={() => onBodyPartSelect(selectedBodyPart === 'legs' ? null : 'legs')}
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleRotate('left')}
          className="bg-white"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleRotate('right')}
          className="bg-white"
        >
          <RotateCw className="w-4 h-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleZoom('out')}
          className="bg-white"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleZoom('in')}
          className="bg-white"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
