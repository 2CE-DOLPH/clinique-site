import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au catalogue
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
          </div>

          <Card className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-6">
              Découvrez nos produits et commencez à personnaliser !
            </p>
            <Button onClick={() => onNavigate('catalog')}>
              Voir le catalogue
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au catalogue
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-center gap-6">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.product.category}
                    </p>
                    {item.customization && (
                      <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                        Personnalisé
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="w-8 h-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Récapitulatif
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{getTotalPrice().toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{getTotalPrice().toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mb-4">
                Procéder au paiement
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate('catalog')}
              >
                Continuer mes achats
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};