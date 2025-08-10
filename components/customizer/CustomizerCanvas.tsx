import React, { useRef, useEffect, useState } from 'react';
import { CustomElement, CustomizableArea } from '../../types';

interface CustomizerCanvasProps {
  elements: CustomElement[];
  selectedArea: CustomizableArea;
  productImage: string;
  selectedColor?: string;
  onElementSelect: (elementId: string) => void;
  onElementUpdate: (elementId: string, updates: Partial<CustomElement>) => void;
}

const CustomizerCanvas: React.FC<CustomizerCanvasProps> = ({
  elements,
  selectedArea,
  productImage,
  selectedColor,
  onElementSelect,
  onElementUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw product base with selected color overlay if needed
    const productImg = new Image();
    productImg.crossOrigin = 'anonymous';
    productImg.onload = () => {
      ctx.drawImage(productImg, 0, 0, canvas.width, canvas.height);

      // Apply color overlay if selected
      if (selectedColor && selectedColor !== '#ffffff') {
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = selectedColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
      }

      // Draw customizable area outline
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(
        selectedArea.position.x,
        selectedArea.position.y,
        selectedArea.size.width,
        selectedArea.size.height
      );
      ctx.setLineDash([]);

      // Draw custom elements
      sortedElements.forEach(element => {
        drawElement(ctx, element);
      });

      // Draw selection outline for selected element
      if (selectedElementId) {
        const selectedElement = elements.find(el => el.id === selectedElementId);
        if (selectedElement) {
          drawSelectionOutline(ctx, selectedElement);
        }
      }
    };
    productImg.src = productImage;
  }, [elements, selectedArea, productImage, selectedColor, selectedElementId]);

  const drawElement = (ctx: CanvasRenderingContext2D, element: CustomElement) => {
    ctx.save();
    
    // Apply transformations
    const centerX = element.position.x + element.size.width / 2;
    const centerY = element.position.y + element.size.height / 2;
    
    ctx.translate(centerX, centerY);
    if (element.rotation) {
      ctx.rotate((element.rotation * Math.PI) / 180);
    }
    ctx.translate(-centerX, -centerY);

    if (element.type === 'text' && element.style) {
      // Draw text
      ctx.font = `${element.style.fontWeight} ${element.style.fontSize}px ${element.style.fontFamily}`;
      ctx.fillStyle = element.style.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.fillText(
        element.content,
        element.position.x + element.size.width / 2,
        element.position.y + element.size.height / 2
      );
    } else if (element.type === 'image') {
      // Draw image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(
          img,
          element.position.x,
          element.position.y,
          element.size.width,
          element.size.height
        );
      };
      img.src = element.content;
    }

    ctx.restore();
  };

  const drawSelectionOutline = (ctx: CanvasRenderingContext2D, element: CustomElement) => {
    ctx.strokeStyle = '#F97316';
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(
      element.position.x - 5,
      element.position.y - 5,
      element.size.width + 10,
      element.size.height + 10
    );
    ctx.setLineDash([]);

    // Draw resize handles
    const handles = [
      { x: element.position.x - 5, y: element.position.y - 5 },
      { x: element.position.x + element.size.width + 5, y: element.position.y - 5 },
      { x: element.position.x - 5, y: element.position.y + element.size.height + 5 },
      { x: element.position.x + element.size.width + 5, y: element.position.y + element.size.height + 5 },
    ];

    handles.forEach(handle => {
      ctx.fillStyle = '#F97316';
      ctx.fillRect(handle.x - 3, handle.y - 3, 6, 6);
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked element (reverse order to check top elements first)
    const clickedElement = [...sortedElements].reverse().find(element => {
      return x >= element.position.x &&
             x <= element.position.x + element.size.width &&
             y >= element.position.y &&
             y <= element.position.y + element.size.height;
    });

    if (clickedElement) {
      setSelectedElementId(clickedElement.id);
      onElementSelect(clickedElement.id);
      setIsDragging(true);
      setDragOffset({
        x: x - clickedElement.position.x,
        y: y - clickedElement.position.y,
      });
    } else {
      setSelectedElementId(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedElementId) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newX = x - dragOffset.x;
    const newY = y - dragOffset.y;

    // Constrain to customizable area
    const constrainedX = Math.max(
      selectedArea.position.x,
      Math.min(newX, selectedArea.position.x + selectedArea.size.width - 50)
    );
    const constrainedY = Math.max(
      selectedArea.position.y,
      Math.min(newY, selectedArea.position.y + selectedArea.size.height - 50)
    );

    onElementUpdate(selectedElementId, {
      position: { x: constrainedX, y: constrainedY }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={400}
        height={500}
        className="w-full h-auto cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-gray-700">
        Zone: {selectedArea.name}
      </div>
    </div>
  );
};

export default CustomizerCanvas;