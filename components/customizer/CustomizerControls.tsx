import React, { useState, useRef } from 'react';
import { 
  Type, 
  Image, 
  Palette, 
  RotateCw, 
  Trash2, 
  Upload,
  Move3D,
  Layers
} from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { CustomElement, TextStyle } from '../../types';

interface CustomizerControlsProps {
  selectedElement: CustomElement | null;
  onAddText: (text: string) => void;
  onAddImage: (imageUrl: string) => void;
  onUpdateElement: (elementId: string, updates: Partial<CustomElement>) => void;
  onDeleteElement: (elementId: string) => void;
  onMoveLayer: (elementId: string, direction: 'up' | 'down') => void;
}

const CustomizerControls: React.FC<CustomizerControlsProps> = ({
  selectedElement,
  onAddText,
  onAddImage,
  onUpdateElement,
  onDeleteElement,
  onMoveLayer,
}) => {
  const [newText, setNewText] = useState('Votre texte');
  const [activeTab, setActiveTab] = useState<'add' | 'style' | 'position'>('add');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fontFamilies = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Verdana',
    'Comic Sans MS',
    'Impact',
    'Trebuchet MS',
  ];

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        onAddImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddText = () => {
    if (newText.trim()) {
      onAddText(newText);
      setNewText('Votre texte');
    }
  };

  const updateTextStyle = (updates: Partial<TextStyle>) => {
    if (selectedElement && selectedElement.type === 'text' && selectedElement.style) {
      onUpdateElement(selectedElement.id, {
        style: { ...selectedElement.style, ...updates }
      });
    }
  };

  const updatePosition = (axis: 'x' | 'y', value: number) => {
    if (selectedElement) {
      onUpdateElement(selectedElement.id, {
        position: {
          ...selectedElement.position,
          [axis]: value
        }
      });
    }
  };

  const updateSize = (dimension: 'width' | 'height', value: number) => {
    if (selectedElement) {
      onUpdateElement(selectedElement.id, {
        size: {
          ...selectedElement.size,
          [dimension]: value
        }
      });
    }
  };

  const updateRotation = (rotation: number) => {
    if (selectedElement) {
      onUpdateElement(selectedElement.id, { rotation });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'add'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Ajouter
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'style'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          disabled={!selectedElement}
        >
          Style
        </button>
        <button
          onClick={() => setActiveTab('position')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'position'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          disabled={!selectedElement}
        >
          Position
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'add' && (
        <div className="space-y-6">
          {/* Add Text */}
          <div className="space-y-3">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
              <Type className="h-5 w-5 mr-2 text-blue-600" />
              Ajouter du texte
            </h3>
            <Input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Entrez votre texte"
            />
            <Button onClick={handleAddText} className="w-full">
              Ajouter le texte
            </Button>
          </div>

          {/* Add Image */}
          <div className="space-y-3">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
              <Image className="h-5 w-5 mr-2 text-purple-600" />
              Ajouter une image
            </h3>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choisir une image
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'style' && selectedElement && (
        <div className="space-y-6">
          {selectedElement.type === 'text' && selectedElement.style && (
            <>
              {/* Font Family */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Police
                </label>
                <select
                  value={selectedElement.style.fontFamily}
                  onChange={(e) => updateTextStyle({ fontFamily: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {fontFamilies.map(font => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Taille: {selectedElement.style.fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={selectedElement.style.fontSize}
                  onChange={(e) => updateTextStyle({ fontSize: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Font Weight & Style */}
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedElement.style.fontWeight === 'bold'}
                    onChange={(e) => updateTextStyle({ 
                      fontWeight: e.target.checked ? 'bold' : 'normal' 
                    })}
                    className="mr-2"
                  />
                  Gras
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedElement.style.fontStyle === 'italic'}
                    onChange={(e) => updateTextStyle({ 
                      fontStyle: e.target.checked ? 'italic' : 'normal' 
                    })}
                    className="mr-2"
                  />
                  Italique
                </label>
              </div>

              {/* Colors */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Couleur du texte
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => updateTextStyle({ color })}
                      className={`w-8 h-8 rounded border-2 ${
                        selectedElement.style.color === color
                          ? 'border-blue-600 scale-110'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Element Actions */}
          <div className="pt-4 border-t space-y-3">
            <div className="flex space-x-2">
              <Button
                onClick={() => onMoveLayer(selectedElement.id, 'up')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Layers className="h-4 w-4 mr-2" />
                Avant
              </Button>
              <Button
                onClick={() => onMoveLayer(selectedElement.id, 'down')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Layers className="h-4 w-4 mr-2" />
                Arrière
              </Button>
            </div>
            <Button
              onClick={() => onDeleteElement(selectedElement.id)}
              variant="danger"
              size="sm"
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'position' && selectedElement && (
        <div className="space-y-6">
          {/* Position */}
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
              <Move3D className="h-5 w-5 mr-2 text-green-600" />
              Position
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="X"
                type="number"
                value={selectedElement.position.x}
                onChange={(e) => updatePosition('x', parseInt(e.target.value) || 0)}
              />
              <Input
                label="Y"
                type="number"
                value={selectedElement.position.y}
                onChange={(e) => updatePosition('y', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Size */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Taille</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Largeur"
                type="number"
                value={selectedElement.size.width}
                onChange={(e) => updateSize('width', parseInt(e.target.value) || 50)}
              />
              <Input
                label="Hauteur"
                type="number"
                value={selectedElement.size.height}
                onChange={(e) => updateSize('height', parseInt(e.target.value) || 50)}
              />
            </div>
          </div>

          {/* Rotation */}
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-medium text-gray-900">
              <RotateCw className="h-5 w-5 mr-2 text-orange-600" />
              Rotation: {selectedElement.rotation || 0}°
            </h3>
            <input
              type="range"
              min="0"
              max="360"
              value={selectedElement.rotation || 0}
              onChange={(e) => updateRotation(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      {!selectedElement && (activeTab === 'style' || activeTab === 'position') && (
        <div className="text-center py-8 text-gray-500">
          <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Sélectionnez un élément sur le canvas pour le modifier</p>
        </div>
      )}
    </div>
  );
};

export default CustomizerControls;