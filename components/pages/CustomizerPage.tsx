import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Save, RotateCcw, Eye } from 'lucide-react';
import { products } from '../../data/products';
import { Product, CustomElement, Customization, CartItem } from '../../types';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';
import CustomizerCanvas from '../customizer/CustomizerCanvas';
import CustomizerControls from '../customizer/CustomizerControls';

interface CustomizerPageProps {
  productId: string;
  onNavigate: (page: string) => void;
}

const CustomizerPage: React.FC<CustomizerPageProps> = ({ productId, onNavigate }) => {
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedAreaIndex, setSelectedAreaIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [elements, setElements] = useState<CustomElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]?.value || '');
    }
  }, [productId]);

  const selectedElement = elements.find(el => el.id === selectedElementId) || null;
  const currentArea = product?.customizableAreas[selectedAreaIndex];

  const generateElementId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const addText = (text: string) => {
    if (!currentArea) return;

    const newElement: CustomElement = {
      id: generateElementId(),
      type: 'text',
      content: text,
      position: {
        x: currentArea.position.x + 50,
        y: currentArea.position.y + 50,
      },
      size: { width: 150, height: 40 },
      rotation: 0,
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        color: '#000000',
        fontWeight: 'normal',
        fontStyle: 'normal',
      },
      zIndex: elements.length,
    };

    setElements(prev => [...prev, newElement]);
    setSelectedElementId(newElement.id);
  };

  const addImage = (imageUrl: string) => {
    if (!currentArea) return;

    const newElement: CustomElement = {
      id: generateElementId(),
      type: 'image',
      content: imageUrl,
      position: {
        x: currentArea.position.x + 30,
        y: currentArea.position.y + 30,
      },
      size: { width: 100, height: 100 },
      rotation: 0,
      zIndex: elements.length,
    };

    setElements(prev => [...prev, newElement]);
    setSelectedElementId(newElement.id);
  };

  const updateElement = (elementId: string, updates: Partial<CustomElement>) => {
    setElements(prev =>
      prev.map(el =>
        el.id === elementId ? { ...el, ...updates } : el
      )
    );
  };

  const deleteElement = (elementId: string) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
    if (selectedElementId === elementId) {
      setSelectedElementId(null);
    }
  };

  const moveLayer = (elementId: string, direction: 'up' | 'down') => {
    setElements(prev => {
      const elementIndex = prev.findIndex(el => el.id === elementId);
      if (elementIndex === -1) return prev;

      const newElements = [...prev];
      if (direction === 'up') {
        newElements.forEach(el => {
          if (el.zIndex > prev[elementIndex].zIndex) {
            el.zIndex -= 1;
          }
        });
        newElements[elementIndex].zIndex = prev.length - 1;
      } else {
        newElements.forEach(el => {
          if (el.zIndex < prev[elementIndex].zIndex) {
            el.zIndex += 1;
          }
        });
        newElements[elementIndex].zIndex = 0;
      }

      return newElements;
    });
  };

  const resetCustomization = () => {
    setElements([]);
    setSelectedElementId(null);
  };

  const addToCart = () => {
    if (!product) return;

    const customization: Customization = {
      id: Date.now().toString(),
      elements,
      selectedColor,
    };

    const cartItem: CartItem = {
      id: Date.now().toString(),
      product,
      customizations: customization,
      selectedColor,
      quantity: 1,
      totalPrice: product.basePrice + (elements.length * 2), // +2€ par élément
    };

    addItem(cartItem);
    onNavigate('cart');
  };

  if (!product || !currentArea) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Produit introuvable
          </h2>
          <Button onClick={() => onNavigate('catalog')}>
            Retour au catalogue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate('catalog')}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Personnalisation: {product.name}
              </h1>
              <p className="text-gray-600">
                Prix de base: {product.basePrice.toFixed(2)}€
                {elements.length > 0 && (
                  <span className="ml-2">
                    + Personnalisation: {(elements.length * 2).toFixed(2)}€
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="h-5 w-5 mr-2" />
              {isPreviewMode ? 'Édition' : 'Aperçu'}
            </Button>
            <Button variant="outline" onClick={resetCustomization}>
              <RotateCcw className="h-5 w-5 mr-2" />
              Réinitialiser
            </Button>
            <Button onClick={addToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Ajouter au panier
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Color Selection */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Couleur du produit
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-blue-600 scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Area Selection */}
            {product.customizableAreas.length > 1 && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Zone à personnaliser
                </h3>
                <div className="flex space-x-2">
                  {product.customizableAreas.map((area, index) => (
                    <Button
                      key={area.id}
                      variant={selectedAreaIndex === index ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedAreaIndex(index)}
                    >
                      {area.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Canvas */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <CustomizerCanvas
                elements={elements}
                selectedArea={currentArea}
                productImage={product.images[0]}
                selectedColor={selectedColor}
                onElementSelect={setSelectedElementId}
                onElementUpdate={updateElement}
              />
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {!isPreviewMode && (
              <CustomizerControls
                selectedElement={selectedElement}
                onAddText={addText}
                onAddImage={addImage}
                onUpdateElement={updateElement}
                onDeleteElement={deleteElement}
                onMoveLayer={moveLayer}
              />
            )}

            {/* Price Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Récapitulatif
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{product.name}</span>
                  <span>{product.basePrice.toFixed(2)}€</span>
                </div>
                {elements.length > 0 && (
                  <div className="flex justify-between">
                    <span>Personnalisation ({elements.length} élément{elements.length !== 1 ? 's' : ''})</span>
                    <span>+{(elements.length * 2).toFixed(2)}€</span>
                  </div>
                )}
                <div className="border-t pt-2 font-medium flex justify-between">
                  <span>Total</span>
                  <span>{(product.basePrice + elements.length * 2).toFixed(2)}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizerPage;