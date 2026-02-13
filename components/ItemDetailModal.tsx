import React from 'react';
import { WardrobeItem } from '../types';

interface Props {
    item: WardrobeItem;
    userHeight?: string;
    onClose: () => void;
}

const ItemDetailModal: React.FC<Props> = ({ item, userHeight, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:justify-center items-center">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white sm:rounded-2xl overflow-hidden animate-slide-up sm:animate-fade-in shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur w-8 h-8 rounded-full flex items-center justify-center text-xl shadow-sm"
                >
                    ×
                </button>

                <div className="flex flex-col sm:flex-row h-[80vh] sm:h-auto max-h-[90vh]">
                    {/* Image Area */}
                    <div className="w-full sm:w-1/2 aspect-[3/4] sm:aspect-auto">
                        <img
                            src={item.imageUrl}
                            alt={item.category}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info Area */}
                    <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between bg-white overflow-y-auto">
                        <div>
                            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">
                                {item.brand || 'Personal Item'}
                            </span>
                            <h2 className="font-serif text-3xl mb-4">{item.style} {item.category}</h2>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-gray-100 pt-4 mb-8">
                                <div>
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block">Color</span>
                                    <p className="text-sm">{item.color}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block">Material</span>
                                    <p className="text-sm">{item.material}</p>
                                </div>
                                {item.size && (
                                    <div>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block">Size</span>
                                        <p className="text-sm">{item.size}</p>
                                    </div>
                                )}
                                {userHeight && (
                                    <div>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block">Fit For</span>
                                        <p className="text-sm">{userHeight}</p>
                                    </div>
                                )}
                            </div>

                            {item.shopLink && item.shopLink !== '#' && (
                                <div className="mb-8">
                                    <a
                                        href={item.shopLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg group hover:bg-gray-100 transition-colors"
                                    >
                                        <div>
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-1">Official Site</span>
                                            <p className="text-sm font-semibold">Buy similar at {item.brand || 'Retailer'}</p>
                                        </div>
                                        <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <button className="w-full bg-brand-black text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-all rounded-sm">
                                Stylist Advice
                            </button>
                            <button className="w-full border border-gray-200 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gray-50 transition-all rounded-sm">
                                Delete from Wardrobe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailModal;
