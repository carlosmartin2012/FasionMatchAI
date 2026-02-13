import React from 'react';
import { CURRENT_USER } from '../constants';

const UserProfile: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto px-6 py-12 pb-32">
            <div className="flex flex-col items-center mb-12">
                <div className="relative mb-6">
                    <img
                        src={CURRENT_USER.avatarUrl}
                        alt={CURRENT_USER.name}
                        className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="absolute bottom-0 right-0 bg-brand-black text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-xs">Edit</span>
                    </div>
                </div>
                <h2 className="font-serif text-3xl mb-1">{CURRENT_USER.name}</h2>
                <p className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">{CURRENT_USER.nickname}</p>
            </div>

            <div className="space-y-4">
                <div className="bg-gray-50 p-6 flex items-center justify-between rounded-lg">
                    <div>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-1">Current Plan</span>
                        <p className="text-sm font-bold uppercase tracking-widest">{CURRENT_USER.plan}</p>
                    </div>
                    <button className="text-[10px] font-bold tracking-widest uppercase underline decoration-1 underline-offset-4 text-brand-black">
                        Manage Subscription
                    </button>
                </div>

                <div className="border-t border-gray-100 pt-8 mt-8">
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-6 px-2">Settings</h3>
                    <div className="space-y-1">
                        {['Privacy Settings', 'Style Profile', 'Connected Brands', 'Notification Preferences', 'Help & Support'].map(item => (
                            <button key={item} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left text-sm">
                                <span>{item}</span>
                                <span className="text-gray-300">›</span>
                            </button>
                        ))}
                        <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-left text-sm text-red-500 mt-4">
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
