# FashionMatch AI: Architecture Assessment (React Web → React Native)

## Current State Analysis
- **Framework**: React (Web) with TypeScript.
- **State Management**: Local `useState` and `useMemo` in `App.tsx`.
- **Styling**: Tailwind CSS classes.
- **Data Model**: Centralized in `types.ts` (User, WardrobeItem, etc.).
- **Features**:
  - Digital Closet with categorization.
  - AI Stylist Chat (Gemini-ready).
  - Premium "Gold" features (Daily Picks).
  - Wardrobe Uploader (currently handling mock/local logic).

## Migration strategy to React Native
- **Styling**: Replace Tailwind CSS with `StyleSheet` or a mobile-first library like `Tailwind-on-RN` or `Styled Components`.
- **Navigation**: Switch from state-based tab switching (`activeTab`) to `React Navigation` (Bottom Tabs).
- **Storage**: Migrate mock local state to **Supabase** (PostgreSQL + Realtime).
- **Media**: Replace standard `<img />` and `<input type="file" />` with `react-native-image-picker` and `Image` components.
- **Components Mapping**:
  - `WardrobeItemCard` → Mobile Card with `Pressable`.
  - `StylistChat` → `FlatList` for messages + `KeyboardAvoidingView`.
  - `ItemDetailModal` → `Modal` component or `React Navigation` Screen.

## Reusable Logic
- `types.ts`: Can be shared 1:1 between web and mobile.
- Filtering logic: The `useMemo` filtering in `App.tsx` can be extracted into a hook.
- Mock Data: Useful for initial mobile UI prototyping.

## Risks & Dependencies
- **Supabase Integration**: Need to set up RLS (Row Level Security) and Auth.
- **Google Gemini API**: Ensure Edge Functions (Supabase) handle the logic to keep secrets off-device.
- **Retailer APIs**: Need a centralized backend service to fetch Zara/H&M catalogs.
