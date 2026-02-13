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

      {/* Desktop Header */}
      <header className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-[1920px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="w-1/3">
            <h1
              onClick={() => setActiveTab('wardrobe')}
              className="font-serif text-3xl font-bold tracking-tight cursor-pointer inline-block"
            >
              FASHIONMATCH
            </h1>
          </div>
          <div className="flex items-center gap-8">
            {(['wardrobe', 'popular', 'stylist', 'profile'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] font-bold tracking-widest uppercase transition-colors py-2 ${activeTab === tab ? 'border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
              >
                {tab === 'profile' ? 'Account' : tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <h1 className="font-serif text-2xl font-bold tracking-tight">FASHIONMATCH</h1>
        <div className="flex items-center gap-4">
          {activeTab === 'wardrobe' && (
            <button
              onClick={() => setIsUploadOpen(!isUploadOpen)}
              className="text-xl"
            >
              {isUploadOpen ? '✕' : '+'}
            </button>
          )}
          <img src={CURRENT_USER.avatarUrl} className="w-8 h-8 rounded-full object-cover" alt="Profile" />
        </div>
      </header>

      {/* Main Content */}
      <main className="animate-fade-in relative min-h-screen pb-20 md:pb-0">

        {activeTab === 'wardrobe' && (
          <div className="min-h-screen">

            {/* Sub Navigation for Wardrobe */}
            <div className="flex justify-center gap-8 py-4 border-b border-gray-100 md:py-6">
              <button
                onClick={() => setWardrobeSubTab('collection')}
                className={`text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${wardrobeSubTab === 'collection' ? 'text-black' : 'text-gray-400'}`}
              >
                My Collection
              </button>
              <button
                onClick={() => setWardrobeSubTab('recommendations')}
                className={`flex items-center gap-2 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${wardrobeSubTab === 'recommendations' ? 'text-amber-600' : 'text-gray-400'}`}
              >
                Daily Picks {CURRENT_USER.plan !== 'gold' && <span className="text-[8px]">🔒</span>}
              </button>
            </div>

            {wardrobeSubTab === 'collection' ? (
              <>
                {/* Hero & Upload */}
                <div className="relative h-[30vh] md:h-[50vh] bg-stone-100 flex items-center justify-center overflow-hidden mb-8 md:mb-12">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
                  <div className="text-center z-10 px-4">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 block text-gray-500">Digital Archive</span>
                    <h2 className="font-serif text-4xl md:text-7xl mb-4 md:mb-6 uppercase">My Wardrobe</h2>
                    <button
                      onClick={() => setIsUploadOpen(!isUploadOpen)}
                      className="hidden md:inline-block bg-brand-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-all shadow-lg"
                    >
                      {isUploadOpen ? 'Close Drawer' : 'Digitize New Item'}
                    </button>
                  </div>
                </div>

                {/* Upload Drawer */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isUploadOpen ? 'max-h-[600px] opacity-100 mb-8 md:mb-12' : 'max-h-0 opacity-0'}`}>
                  <div className="max-w-2xl mx-auto px-4 md:px-6">
                    <div className="bg-gray-50 p-6 md:p-8 border border-gray-200 rounded-xl">
                      <WardrobeUploader onAddItem={addWardrobeItem} />
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="sticky top-[61px] md:top-20 z-40 bg-white/95 backdrop-blur py-3 md:py-4 mb-6 md:mb-8 border-b border-gray-100">
                  <div className="max-w-[1920px] mx-auto px-4 md:px-6 overflow-x-auto no-scrollbar">
                    <div className="flex justify-start md:justify-center min-w-max gap-6 md:gap-12">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`text-[9px] md:text-xs font-bold tracking-widest transition-all duration-300 ${activeCategory === cat
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
                <div className="max-w-[1920px] mx-auto px-4 md:px-6 pb-12 md:pb-20">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                    {filteredWardrobe.map(item => (
                      <WardrobeItemCard
                        key={item.id}
                        item={item}
                        onClick={() => setSelectedItem(item)}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* RECOMMENDATIONS TAB */
              <div className="min-h-[60vh] p-4 md:p-12 animate-fade-in max-w-6xl mx-auto">
                {CURRENT_USER.plan === 'gold' ? (
                  <div className="space-y-12">
                    <div className="text-center mb-8">
                      <h3 className="font-serif text-3xl mb-2">Today's Picks</h3>
                      <p className="text-sm text-gray-500">Sunny, 22°C • Personalized for {CURRENT_USER.name.split(' ')[0]}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                      <div className="bg-white p-6 md:p-8 border border-gray-100 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Casual Morning</span>
                          <button className="text-[10px] font-bold underline">Save</button>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          {wardrobe.slice(0, 3).map(item => (
                            <WardrobeItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                          ))}
                        </div>
                        <p className="text-xs text-brand-black/70 italic leading-relaxed bg-stone-50 p-4 rounded-lg">
                          "A minimalist approach for today's weather. The {wardrobe[0]?.color} {wardrobe[0]?.style} provides comfort while looking sharp."
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto text-center bg-stone-50 p-10 md:p-12 border border-stone-200 mt-12 rounded-2xl">
                    <span className="text-3xl mb-4 block">🔒</span>
                    <h3 className="font-serif text-2xl mb-2">Gold Exclusive</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-8">Experience proactive AI styling every morning. Upgraded members get curated looks based on local weather and calendar events.</p>
                    <button onClick={() => setActiveTab('profile')} className="w-full bg-amber-600 text-white py-4 text-[10px] font-bold tracking-widest uppercase rounded-lg shadow-md">Go Gold</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stylist' && (
          <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] p-4 md:p-12">
            <div className="max-w-6xl mx-auto h-full flex flex-col gap-6">
              <div className="hidden md:block">
                <h2 className="font-serif text-4xl mb-2">AI Stylist</h2>
                <p className="text-sm text-gray-500">Get instant advice based on your digital closet.</p>
              </div>
              <div className="flex-1 min-h-0">
                <StylistChat wardrobe={wardrobe} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'popular' && <PopularWardrobes />}
        {activeTab === 'profile' && <UserProfile />}

        {/* Detail Modal */}
        {selectedItem && (
          <ItemDetailModal
            item={selectedItem}
            userHeight={CURRENT_USER.height}
            onClose={() => setSelectedItem(null)}
          />
        )}

      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-100 h-16 px-6 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('wardrobe')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'wardrobe' ? 'text-black' : 'text-gray-400'}`}
        >
          <span className="text-xl">{activeTab === 'wardrobe' ? '■' : '□'}</span>
          <span className="text-[8px] font-bold uppercase tracking-widest">Closet</span>
        </button>
        <button
          onClick={() => setActiveTab('stylist')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'stylist' ? 'text-black' : 'text-gray-400'}`}
        >
          <span className="text-xl">○</span>
          <span className="text-[8px] font-bold uppercase tracking-widest">Stylist</span>
        </button>
        <button
          onClick={() => setActiveTab('popular')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'popular' ? 'text-black' : 'text-gray-400'}`}
        >
          <span className="text-xl">◇</span>
          <span className="text-[8px] font-bold uppercase tracking-widest">Discover</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-black' : 'text-gray-400'}`}
        >
          <span className="text-xl">▽</span>
          <span className="text-[8px] font-bold uppercase tracking-widest">Account</span>
        </button>
      </nav>
    </div>
  );
};

export default App;