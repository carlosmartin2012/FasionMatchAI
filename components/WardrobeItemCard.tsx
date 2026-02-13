import React from 'react';
import { WardrobeItem } from '../types';

interface Props {
    item: WardrobeItem;
    onClick: () => void;
}

const WardrobeItemCard: React.FC<Props> = ({ item, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer flex flex-col gap-2"
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
                <img
                    src={item.imageUrl}
                    alt={item.category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                    {item.brand || 'Unbranded'}
                </span>
                <h3 className="text-xs font-medium text-brand-black truncate">
                    {item.style} {item.category}
                </h3>
                <span className="text-[10px] text-gray-500 mt-0.5">
                    {item.color} • {item.material}
                </span>
            </div>
        </div>
    );
};

export default WardrobeItemCard;
