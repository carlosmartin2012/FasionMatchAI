import React from 'react';
import { MOCK_INFLUENCERS } from '../constants';
import WardrobeItemCard from './WardrobeItemCard';

const PopularWardrobes: React.FC = () => {
    return (
        <div className="pb-24">
            <div className="bg-stone-100 py-16 mb-12">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block text-gray-500">Community</span>
                    <h2 className="font-serif text-4xl mb-4">Style Inspirations</h2>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Discover digitized wardrobes from influencers and community members.
                    </p>
                </div>
            </div>

            <div className="max-w-[1920px] mx-auto px-6 space-y-20">
                {MOCK_INFLUENCERS.map(influencer => (
                    <div key={influencer.id} className="space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={influencer.imageUrl}
                                    alt={influencer.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-serif text-xl">{influencer.name}</h3>
                                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{influencer.handle}</p>
                                </div>
                            </div>
                            <button className="text-[10px] font-bold tracking-widest uppercase underline decoration-1 underline-offset-4">
                                View Full Closet
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {influencer.wardrobe.slice(0, 4).map(item => (
                                <WardrobeItemCard
                                    key={item.id}
                                    item={item}
                                    onClick={() => { }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularWardrobes;
