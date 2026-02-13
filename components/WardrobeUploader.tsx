import React, { useState } from 'react';
import { WardrobeItem } from '../types';

interface Props {
    onAddItem: (item: WardrobeItem) => void;
}

const WardrobeUploader: React.FC<Props> = ({ onAddItem }) => {
    const [isUploading, setIsUploading] = useState(false);

    const simulateUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            const newItem: WardrobeItem = {
                id: Date.now().toString(),
                userId: 'user-1',
                imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
                category: 'Tops',
                color: 'Beige',
                style: 'Modern',
                material: 'Linen',
                createdAt: Date.now(),
                brand: 'New Brand',
                size: 'M',
                sku: 'NEW-001',
                shopLink: '#'
            };
            onAddItem(newItem);
            setIsUploading(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📸</span>
            </div>
            <h3 className="text-lg font-serif mb-2">Digitize your clothing</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
                Upload a clear photo of your item. Our AI will automatically categorize and tag it for you.
            </p>
            <button
                onClick={simulateUpload}
                disabled={isUploading}
                className={`bg-brand-black text-white px-8 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isUploading ? 'Analyzing...' : 'Upload from Library'}
            </button>
            <button className="mt-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-black">
                Open Camera
            </button>
        </div>
    );
};

export default WardrobeUploader;
