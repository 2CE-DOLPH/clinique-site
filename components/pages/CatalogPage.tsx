import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { products } from '../../data/products';
import { Product } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CatalogPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'clothing', name: 'Vêtements' },
    { id: 'shoes', name: 'Chaussures' },
    { id: 'bags', name: 'Sacs' },
    { id: 'accessories', name: 'Accessoires' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.basePrice - b.basePrice;
        case 'price-high':
          return b.basePrice - a.basePrice;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <Card hoverable className="overflow-hidden group">
      <div className="aspect-w-16 aspect-h-12 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">
            {product.basePrice.toFixed(2)}€
          </span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
            )}
          </div>
        </div>
        <Button
          onClick={() => onNavigate('customize', product.id)}
          className="w-full"
        >
          Personnaliser
        </Button>
      </div>
    </Card>
  );

  const ProductListItem: React.FC<{ product: Product }> = ({ product }) => (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-6">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            {product.description}
          </p>
          <div className="flex space-x-1 mb-2">
            {product.colors.slice(0, 6).map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {product.basePrice.toFixed(2)}€
          </div>
          <Button
            onClick={() => onNavigate('customize', product.id)}
            size="sm"
          >
            Personnaliser
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Catalogue Produits
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez notre collection de produits personnalisables
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Nom A-Z</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;