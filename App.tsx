import React, { useState, useMemo } from 'react';
import WardrobeItemCard from './components/WardrobeItemCard';
import StylistChat from './components/StylistChat';
import WardrobeUploader from './components/WardrobeUploader';
import PopularWardrobes from './components/PopularWardrobes';
import UserProfile from './components/UserProfile';
import ItemDetailModal from './components/ItemDetailModal';
import { WardrobeItem } from './types';
import { CURRENT_USER } from './constants';

// Updated Initial Wardrobe with High Quality Unsplash Images & Details
const INITIAL_WARDROBE: WardrobeItem[] = [
  {
    id: '1',
    userId: 'user-1',
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=600',
    category: 'Bottoms',
    color: 'Beige',
    style: 'Chino',
    material: 'Cotton',
    createdAt: Date.now(),
    brand: 'Dockers',
    size: '32',
    sku: 'DK-2023-BG',
    shopLink: 'https://dockers.com'
  },
  {
    id: '2',
    userId: 'user-1',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
    category: 'Tops',
    color: 'White',
    style: 'Basic',
    material: 'Cotton',
    createdAt: Date.now(),
    brand: 'Uniqlo',
    size: 'L',
    sku: 'UQ-TEE-001',
    shopLink: 'https://uniqlo.com'
  },
  {
    id: '3',
    userId: 'user-1',
    imageUrl: 'https://images.unsplash.com/photo-1551028919-ac66c5f8b9b9?auto=format&fit=crop&q=80&w=600',
    category: 'Outerwear',
    color: 'Black',
    style: 'Leather Jacket',
    material: 'Leather',
    createdAt: Date.now(),
    brand: 'AllSaints',
    size: 'M',
    sku: 'AS-LTHr-99',
    shopLink: 'https://allsaints.com'
  },
  {
    id: '4',
    userId: 'user-1',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600',
    category: 'Shoes',
    color: 'Blue',
    style: 'Heels',
    material: 'Suede',
    createdAt: Date.now(),
    brand: 'Zara',
    size: '39',
    sku: 'ZA-SH-22',
    shopLink: 'https://zara.com'
  },
  {
    id: '5',
    userId: 'user-1',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    category: 'Tops',
    color: 'Blue',
    style: 'Shirt',
    material: 'Cotton',
    createdAt: Date.now(),
    brand: 'Ralph Lauren',
    size: 'M',
    sku: 'RL-OX-88',
    shopLink: 'https://ralphlauren.com'
  }
];

const CATEGORIES = ['VIEW ALL', 'TOPS', 'BOTTOMS', 'OUTERWEAR', 'SHOES', 'ACCESSORIES'];

const App: React.FC = () => {
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>(INITIAL_WARDROBE);
  const [activeTab, setActiveTab] = useState<'wardrobe' | 'popular' | 'stylist' | 'profile'>('wardrobe');
  const [wardrobeSubTab, setWardrobeSubTab] = useState<'collection' | 'recommendations'>('collection');
  const [activeCategory, setActiveCategory] = useState('VIEW ALL');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  
  // Modal State
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);

  const addWardrobeItem = (item: WardrobeItem) => {
    setWardrobe(prev => [item, ...prev]);
    setIsUploadOpen(false);
  };

  const filteredWardrobe = useMemo(() => {
    if (activeCategory === 'VIEW ALL') return wardrobe;
    return wardrobe.filter(item => {
      const cat = item.category.toUpperCase();
      if (activeCategory === 'BOTTOMS' && (cat.includes('PANT') || cat.includes('SKIRT') || cat.includes('JEAN') || cat.includes('TROUSER'))) return true;
      if (activeCategory === 'TOPS' && (cat.includes('TOP') || cat.includes('SHIRT') || cat.includes('BLOUSE'))) return true;
      return cat.includes(activeCategory.slice(0, -1));
    });
  }, [wardrobe, activeCategory]);

  return (
    <div className="min-h-screen bg-white text-brand-black font-sans selection:bg-brand-black selection:text-white">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-[1920px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="w-1/3 flex items-center">
            <button className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-widest hover:text-gray-600 transition-colors uppercase">
              <span className="text-lg">≡</span> Menu
            </button>
          </div>
          <div className="w-1/3 flex justify-center">
            <h1 
              onClick={() => setActiveTab('wardrobe')}
              className="font-serif text-3xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            >
              FASHIONMATCH
            </h1>
          </div>
          <div className="w-1/3 flex justify-end items-center gap-6">
            {(['wardrobe', 'popular', 'stylist', 'profile'] as const).map(tab => (
               <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-semibold tracking-widest uppercase transition-colors ${activeTab === tab ? 'border-b border-black pb-1' : 'text-gray-500 hover:text-black'}`}
              >
                {tab === 'profile' ? CURRENT_USER.name.split(' ')[0] : tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="animate-fade-in relative">
        
        {activeTab === 'wardrobe' && (
          <div className="min-h-screen">
             
             {/* Sub Navigation for Wardrobe */}
             <div className="flex justify-center gap-8 py-6 border-b border-gray-100">
                <button 
                  onClick={() => setWardrobeSubTab('collection')}
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${wardrobeSubTab === 'collection' ? 'text-black' : 'text-gray-400'}`}
                >
                  My Collection
                </button>
                <button 
                  onClick={() => setWardrobeSubTab('recommendations')}
                  className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${wardrobeSubTab === 'recommendations' ? 'text-amber-600' : 'text-gray-400'}`}
                >
                  Daily Picks {CURRENT_USER.plan !== 'gold' && <span className="text-gray-300">🔒</span>}
                </button>
             </div>

             {wardrobeSubTab === 'collection' ? (
               <>
                {/* Hero & Upload */}
                <div className="relative h-[40vh] md:h-[50vh] bg-stone-100 flex items-center justify-center overflow-hidden mb-12">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
                    <div className="text-center z-10 px-4">
                      <span className="text-xs font-bold tracking-[0.3em] uppercase mb-4 block text-gray-500">Digital Collection</span>
                      <h2 className="font-serif text-5xl md:text-7xl mb-6">MY WARDROBE</h2>
                      <button 
                        onClick={() => setIsUploadOpen(!isUploadOpen)}
                        className="bg-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-all"
                      >
                        {isUploadOpen ? 'Close Upload' : 'Digitize New Item'}
                      </button>
                    </div>
                </div>

                {/* Upload Drawer */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isUploadOpen ? 'max-h-[500px] opacity-100 mb-12' : 'max-h-0 opacity-0'}`}>
                    <div className="max-w-2xl mx-auto px-6">
                      <div className="bg-gray-50 p-8 border border-gray-200">
                        <WardrobeUploader onAddItem={addWardrobeItem} />
                      </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="sticky top-20 z-40 bg-white/95 backdrop-blur py-4 mb-8 border-b border-gray-100">
                    <div className="max-w-[1920px] mx-auto px-6 overflow-x-auto no-scrollbar">
                      <div className="flex justify-center min-w-max gap-8 md:gap-12">
                        {CATEGORIES.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-[10px] md:text-xs font-bold tracking-widest transition-all duration-300 ${
                              activeCategory === cat 
                                ? 'text-black scale-105' 
                                : 'text-gray-400 hover:text-black'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="max-w-[1920px] mx-auto px-6 pb-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-12">
                      {filteredWardrobe.map(item => (
                            <WardrobeItemCard 
                                key={item.id} 
                                item={item} 
                                onClick={() => setSelectedItem(item)} // Open Modal
                            />
                        ))}
                    </div>
                </div>
               </>
             ) : (
               /* RECOMMENDATIONS TAB (GOLD EXCLUSIVE) */
               <div className="min-h-[60vh] flex justify-center p-6 animate-fade-in">
                  {CURRENT_USER.plan === 'gold' ? (
                     <div className="w-full max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                           <h3 className="font-serif text-3xl mb-4">Today's Picks</h3>
                           <p className="text-gray-500">Your AI stylist has prepared these looks based on today's weather (Sunny, 22°C).</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                           {/* Look 1 */}
                           <div className="bg-gray-50 p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                              <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
                                 <div>
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-1">09:00 AM</span>
                                    <h4 className="font-serif text-2xl">Morning Meeting</h4>
                                 </div>
                                 <button className="text-xs font-bold underline decoration-1 underline-offset-4">Save Look</button>
                              </div>
                              <div className="grid grid-cols-3 gap-4 mb-6">
                                 {/* Using existing wardrobe items safely */}
                                 {wardrobe.length > 0 && <WardrobeItemCard item={wardrobe[1]} onClick={() => setSelectedItem(wardrobe[1])} />}
                                 {wardrobe.length > 0 && <WardrobeItemCard item={wardrobe[0]} onClick={() => setSelectedItem(wardrobe[0])} />}
                                 {wardrobe.length > 3 && <WardrobeItemCard item={wardrobe[3]} onClick={() => setSelectedItem(wardrobe[3])} />}
                              </div>
                              <div className="bg-white p-4 border border-gray-100">
                                <p className="text-sm text-gray-600 italic leading-relaxed">
                                  "Pair the <span className="font-semibold">White Basic Tee</span> with the <span className="font-semibold">Beige Chinos</span> for a clean base. Add the <span className="font-semibold">Blue Heels</span> for a sharp, confident lift suitable for the office."
                                </p>
                              </div>
                           </div>

                           {/* Look 2 */}
                           <div className="bg-gray-50 p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                              <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
                                 <div>
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-1">07:00 PM</span>
                                    <h4 className="font-serif text-2xl">Dinner Date</h4>
                                 </div>
                                 <button className="text-xs font-bold underline decoration-1 underline-offset-4">Save Look</button>
                              </div>
                              <div className="grid grid-cols-3 gap-4 mb-6">
                                 {wardrobe.length > 4 && <WardrobeItemCard item={wardrobe[4]} onClick={() => setSelectedItem(wardrobe[4])} />}
                                 {wardrobe.length > 2 && <WardrobeItemCard item={wardrobe[2]} onClick={() => setSelectedItem(wardrobe[2])} />}
                                 {wardrobe.length > 0 && <WardrobeItemCard item={wardrobe[0]} onClick={() => setSelectedItem(wardrobe[0])} />}
                              </div>
                              <div className="bg-white p-4 border border-gray-100">
                                <p className="text-sm text-gray-600 italic leading-relaxed">
                                  "Switch to the <span className="font-semibold">Blue Shirt</span> for a pop of color. Layer the <span className="font-semibold">Leather Jacket</span> over it for a cool, evening vibe that works perfectly with the Chinos."
                                </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="max-w-md text-center bg-gray-50 p-12 border border-gray-200 h-fit">
                        <div className="text-4xl mb-6">🔒</div>
                        <h3 className="font-serif text-2xl mb-4 text-brand-black">Gold Member Exclusive</h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-8">
                          Get daily proactive outfit recommendations based on the weather, your calendar, and your style.
                        </p>
                        <button 
                          onClick={() => setActiveTab('profile')}
                          className="w-full bg-amber-600 text-white py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-700 transition-colors"
                        >
                          Unlock Gold
                        </button>
                     </div>
                  )}
               </div>
             )}
          </div>
        )}

        {activeTab === 'popular' && (
          <PopularWardrobes />
        )}

        {activeTab === 'stylist' && (
          <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-4 md:p-8">
            <div className="w-full max-w-6xl h-full flex flex-col md:flex-row gap-8">
               <div className="w-full md:w-1/3">
                  <h2 className="font-serif text-4xl mb-4">Personal<br/>Stylist</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    Chat with your AI assistant to generate looks based on your digital wardrobe and current trends.
                  </p>
               </div>
               <div className="w-full md:w-2/3 h-full">
                 <StylistChat wardrobe={wardrobe} />
               </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <UserProfile />
        )}
        
        {/* Detail Modal */}
        {selectedItem && (
          <ItemDetailModal 
            item={selectedItem} 
            userHeight={CURRENT_USER.height} // In a real app this would come from the item's owner
            onClose={() => setSelectedItem(null)} 
          />
        )}

      </main>
    </div>
  );
};

export default App;