# Cryptocurrency Trading Platform


## 📋 Table of Contents

- [Features](#features)
- [Project Architecture](#project-architecture)
- [Data Flow](#data-flow)
- [Key Technical Decisions](#key-technical-decisions)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

## ✨ Features

### Core Requirements
- **Order Book Visualization**: Real-time display of bids and asks for BTC and ETH
- **Asset Selection**: Toggle between Bitcoin and Ethereum
- **Order Entry Form**: Place limit orders with quantity validation
- **Spread Indicator**: Visual display of bid-ask spread

### Bonus Features
- **Market Orders**: Support for market orders in addition to limit orders
- **Trade History**: Display submitted trades with full details
- **Click-to-Fill**: Click any price in the orderbook to pre-fill the order form
- **Auto-Calculation**: Enter any 2 of (quantity, price, notional) and the 3rd is auto-calculated
- **Mobile Responsive**: Slide-in sidebar for order entry on mobile devices

## Project Architecture

### Component Organization Principles

**Separation of Concerns:**
- **UI Components** (`src/ui/`): Reusable primitives with no business logic
- **Feature Components** (`src/components/`): Business-specific components that compose UI components
- **Custom Hooks** (`src/hooks/`): Encapsulate stateful logic and side effects
- **Services** (`src/services/`): Pure API communication functions

**Flat Structure Decision:**
Simpler flat structure in `components/`. This decision was made because:
- Easier to locate components when they're not nested
- Better developer experience with shorter import paths

### Component Hierarchy

```
App.tsx
├── AssetSelector (select BTC/ETH)
├── OrderBook
│   ├── OrderBookRow (x many)
│   └── SpreadIndicator
├── OrderEntry (desktop) / Sidebar (mobile)
│   ├── OrderTypeToggle
│   ├── SideToggle
│   └── Input fields (quantity, price, notional)
└── TradesList (shows submitted trades)
```

## 📊 Data Flow

### Order Book Data Flow

```
Server (Port 3001)
    │
    │ GET /orderbook/:asset
    ▼
api.ts → getOrderbook(asset)
    │
    ▼
useOrderBook Hook → Processes & Polls (5s interval)
    │
    ▼
OrderBook Component → Displays bids, asks, spread
```

### Order Submission Flow

```
OrderEntry Form
    │
    │ onSubmit(orderData)
    ▼
useOrderEntry Hook → Validates & Manages State
    │
    │ POST /trade
    ▼
api.ts → sendTrade(order)
    │
    │ Server Response
    ▼
Server Validates → Returns { id, timestamp, ... }
    │
    ▼
App.tsx → Shows Success Toast & Adds to Trade History
```

### Price Click Interaction

```
User clicks price in OrderBook
    │
    ▼
App.tsx → Sets prefillPrice & prefillSide
    │
    ▼
OrderEntry → Auto-fills form & switches to LIMIT
```

## 🎯 Key Technical Decisions

### 1. Custom Hooks Over Context API
**Decision**: Used custom hooks (`useOrderBook`, `useOrderEntry`, etc.) instead of React Context.

**Rationale**:
- Simpler for this use case - no prop drilling issues
- Better code reuse - hooks can be composed
- Easier to test and reason about
- Context would add unnecessary complexity for component-level state

### 2. Enum Types for Order Side and Type
**Decision**: Used TypeScript enums for `OrderSide` (BUY/SELL) and `OrderType` (LIMIT/MARKET).

**Rationale**:
- Type safety - prevents invalid values
- Better IDE autocomplete
- Self-documenting code
- Easier refactoring

### 3. Flat Component Structure
**Decision**:  Flat `components/` folder.

**Rationale**:
- Project size doesn't warrant 3-tier hierarchy
- Shorter import paths: `../Card` vs `../../molecules/Card`
- Faster to locate components
- UI components separated into `src/ui/` for clear distinction

### 4. Auto-Calculation Hook
**Decision**: Created dedicated `useAutoCalculation` hook for quantity/price/notional logic.

**Rationale**:
- Complex calculation logic (3-way dependencies)
- Reusable across different forms
- Testable in isolation
- Clear separation of concerns

### 5. Independent Scrolling Sections
**Decision**: OrderBook split into 3 sections with independent scrolling (asks, spread, bids).

**Rationale**:
- Professional trading platform UX
- Spread always visible (fixed in middle)
- Better for large datasets
- Matches industry-standard orderbook UI patterns

### 6. Mobile Sidebar Pattern
**Decision**: Used slide-in sidebar for mobile order entry instead of stacking.

**Rationale**:
- Better use of mobile screen space
- Familiar mobile navigation pattern
- Keeps orderbook visible context
- Smooth animations for better UX

### 7. Barrel Exports
**Decision**: Used barrel exports (`index.ts` files) for cleaner imports.

**Rationale**:
- Cleaner imports: `import { Button } from './ui'` vs `'./ui/Button'`
- Easier refactoring - change file location without breaking imports
- Better encapsulation - control what's exported
- Note: Intermediate folder `index.ts` files could be removed for even more simplicity

### 8. Tailwind CSS Over CSS Modules
**Decision**: Used Tailwind CSS for styling instead of CSS Modules or styled-components.

**Rationale**:
- Rapid development - no context switching
- Utility-first approach fits component-based architecture
- Consistent design system via config
- Smaller bundle when properly purged
- Custom dark theme for trading platform aesthetic

## 🛠️ Tech Stack

- **React 18.3** - UI library
- **TypeScript 4.9** - Type safety
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Express.js** - Mock API server
- **Create React App** - Build tooling

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server (UI on :3000, API on :3001)
npm start

# Or run on custom port
PORT=3002 npm run start:ui
```

The application will:
- Start React dev server (default: http://localhost:3000)
- Start Express API server (http://localhost:3001)
- Proxy API calls from React app to backend

### Project Scripts

```bash
npm start              # Run both UI and API concurrently
npm run start:ui      # Run only React app
npm run start:server  # Run only API server
npm run build         # Build for production
```

## 📝 Development Notes

- Click any price in the orderbook to pre-fill the order form
- Market orders don't require a price field
- All orders are validated client-side before submission
- Trade history persists during session (bonus feature)

---

Built with ❤️ for cryptocurrency trading
