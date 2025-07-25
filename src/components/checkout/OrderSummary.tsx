import React from 'react';
import { GloveOrder } from '../../types/order';

interface OrderSummaryProps {
  order: GloveOrder;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  return (
    <div className="bg-neutral-800 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>
      
      {/* Base Configuration */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Base Configuration</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Size</span>
            <span>{order.gloveConfiguration.size}</span>
          </div>
          <div className="flex justify-between">
            <span>Material</span>
            <span>{order.gloveConfiguration.material.name}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Colors</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(order.gloveConfiguration)
            .filter(([key]) => key.endsWith('Color'))
            .map(([key, color]: [string, any]) => (
              <div key={key} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full border border-neutral-600"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Custom Text */}
      {order.gloveConfiguration.textElements.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Custom Text</h3>
          <div className="space-y-2">
            {order.gloveConfiguration.textElements.map((element, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <span>{element.zone}</span>
                  <span>"{element.text}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Images */}
      {order.gloveConfiguration.imageElements.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Custom Images</h3>
          <div className="space-y-2">
            {order.gloveConfiguration.imageElements.map((element, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <span>{element.zone}</span>
                  <span className="text-neutral-400 truncate max-w-[200px]">
                    {new URL(element.url).pathname.split('/').pop()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Breakdown */}
      <div className="border-t border-neutral-700 pt-4 mt-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Base Price</span>
            <span>${order.pricing.basePrice.toFixed(2)}</span>
          </div>
          {order.pricing.colorUpcharges > 0 && (
            <div className="flex justify-between">
              <span>Color Upgrades</span>
              <span>${order.pricing.colorUpcharges.toFixed(2)}</span>
            </div>
          )}
          {order.pricing.materialUpcharge > 0 && (
            <div className="flex justify-between">
              <span>Material Upgrade</span>
              <span>${order.pricing.materialUpcharge.toFixed(2)}</span>
            </div>
          )}
          {order.pricing.customizationCharges > 0 && (
            <div className="flex justify-between">
              <span>Customization</span>
              <span>${order.pricing.customizationCharges.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${order.pricing.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${order.pricing.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-neutral-700">
            <span>Total</span>
            <span>${order.pricing.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="mt-6 p-4 bg-neutral-900 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Order Status</h3>
          <span className="text-sm px-2 py-1 bg-gold/20 text-gold rounded-full">
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span> 
        </div>
        <div className="space-y-2">
          {order.statusHistory.map((status, index) => (
            <div key={index} className="text-sm text-neutral-400">
              <div className="flex justify-between">
                <span>{status.status}</span>
                <span>{new Date(status.timestamp).toLocaleDateString()}</span>
              </div>
              {status.note && (
                <p className="text-xs mt-1">{status.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;