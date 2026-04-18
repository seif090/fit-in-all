# FitLife - Fitness & Health Platform Specification

## 1. Project Overview

- **Project Name**: FitLife
- **Type**: Angular 16+ Web Application (SPA)
- **Core Functionality**: A fitness and health marketplace platform connecting users with gyms, coaches, doctors, and health products
- **Target Users**: Fitness enthusiasts, health-conscious individuals, people seeking professional fitness/medical guidance

## 2. Technical Stack

- **Framework**: Angular 16+
- **Language**: TypeScript
- **State Management**: Services with RxJS (no NgRx)
- **Styling**: Tailwind CSS
- **Routing**: Angular Router with lazy loading
- **API**: REST API (/api/*) via environment.ts
- **Architecture**: Feature-based with standalone components

## 3. Folder Structure

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   ├── interceptors/
│   │   └── guards/
│   ├── shared/
│   │   ├── components/
│   │   ├── pipes/
│   │   └── directives/
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── marketplace/
│   │   ├── booking/
│   │   ├── chat/
│   │   ├── profile/
│   │   └── admin/
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── styles.css
```

## 4. UI/UX Specification

### 4.1 Design System

#### Color Palette
- **Primary**: `#10B981` (Emerald Green - health/fitness)
- **Primary Dark**: `#059669`
- **Primary Light**: `#34D399`
- **Secondary**: `#F59E0B` (Amber - energy/motivation)
- **Accent**: `#3B82F6` (Blue - trust/professional)
- **Background**: `#F9FAFB` (Light gray)
- **Surface**: `#FFFFFF`
- **Text Primary**: `#111827`
- **Text Secondary**: `#6B7280`
- **Border**: `#E5E7EB`
- **Error**: `#EF4444`
- **Success**: `#10B981`

#### Typography
- **Font Family**: 'Inter' (Arabic: 'Cairo')
- **Headings**:
  - H1: 2.5rem (40px), font-weight: 700
  - H2: 2rem (32px), font-weight: 600
  - H3: 1.5rem (24px), font-weight: 600
  - H4: 1.25rem (20px), font-weight: 500
- **Body**: 1rem (16px), font-weight: 400
- **Small**: 0.875rem (14px), font-weight: 400

#### Spacing System
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

#### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 4.2 RTL Support
- Full Arabic language support
- Direction: rtl
- Use `dir="rtl"` attribute

### 4.3 Components

#### Navigation
- **Desktop**: Top navbar with logo, nav links, user menu
- **Mobile**: Bottom navigation bar with 5 icons (Home, Marketplace, Booking, Chat, Profile)
- **Mobile Hamburger**: Left side menu for additional options

#### Cards
- Border radius: 12px
- Shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Hover: Scale 1.02, shadow increase
- Padding: 16px

#### Buttons
- Primary: Green background, white text
- Secondary: White background, green border
- Border radius: 8px
- Padding: 12px 24px
- Hover: Darken 10%

#### Forms
- Input border: 1px solid #E5E7EB
- Focus: Green border, ring
- Border radius: 8px
- Padding: 12px

### 4.4 Pages

#### Landing Page (Marketplace)
1. **Hero Section**
   - Background: Gradient from primary to primary-dark
   - Title: "Discover Your Perfect Fitness Journey"
   - Search bar with placeholder "Search gyms, coaches, products..."
   - Quick filter tabs: Gyms | Doctors | Products

2. **Featured Gyms Section**
   - Section title: "Featured Gyms"
   - 4-column grid (2 on tablet, 1 on mobile)
   - Card: Image (200px height), name, rating (stars), price/month

3. **Coaches & Doctors Section**
   - Section title: "Top Coaches & Specialists"
   - Horizontal scroll on mobile
   - Card: Avatar, name, specialty, "Book Now" button

4. **Products Section**
   - Section title: "Featured Products"
   - 4-column grid
   - Card: Image, name, price, "Add to Cart" button

5. **Categories Section**
   - Section title: "Browse Categories"
   - 4 cards: Gyms, Coaching, Supplements, Medical
   - Icon + title + item count

6. **CTA Section**
   - Title: "Ready to Transform Your Life?"
   - "Get Started" button

#### Dashboard Page
- Welcome message with user name
- Stats cards: Weight, Calories, Goal Progress (circular progress)
- Quick actions: Start Workout, Book Session, Order Supplement
- AI Recommendations section with cards
- Recent Activity list

#### Marketplace Page
- Page title: "Browse Marketplace"
- Filter sidebar: Category, Price Range, Rating
- Tabs: All | Gyms | Coaches | Doctors | Products
- Grid layout: 3 columns (2 tablet, 1 mobile)
- Items show image, name, category, rating, price

#### Gym Details Page
- Image gallery (main image + thumbnails)
- Gym name, rating, location
- Description text
- Price per month
- Features list (equipment, classes, etc.)
- "Subscribe" button (fixed on mobile bottom)
- Reviews section

#### Product Details Page
- Product image
- Name, price, description
- Specifications table
- "Add to Cart" button
- Related products

#### Booking Page
- Calendar view (month)
- Available time slots list
- Selected service details
- Confirm booking button

#### AI Chat Page
- Chat header with "AI Fitness Assistant"
- Messages area (scrollable)
- User messages: right-aligned, green background
- AI messages: left-aligned, white background
- Input field + Send button (fixed bottom)

#### Profile Page
- User avatar, name, email
- Edit profile button
- Subscription status card
- Active subscriptions list
- Order history link
- Settings link

#### Admin Dashboard
- Stats cards: Total Users, Active Subscriptions, Revenue, Bookings
- Charts section placeholder
- Recent Users table
- Recent Orders table
- Quick actions

## 5. Functionality Specification

### 5.1 Core Features
- User authentication (login/register)
- Marketplace browsing with filters
- Gym/Coach/Doctor profiles
- Product catalog
- Booking system
- AI chat interface
- User profile management
- Admin dashboard

### 5.2 Data Handling
- HTTP services for API calls
- RxJS for reactive data
- Local storage for auth token
- Environment-based API URLs

### 5.3 Routing
- Lazy loading for all feature modules
- Route guards for protected routes
- Default route: / (landing page)
- Auth routes: /auth/login, /auth/register

## 6. Acceptance Criteria

### Visual Checkpoints
- [ ] Landing page displays marketplace with all sections
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] RTL support functions correctly for Arabic
- [ ] Bottom navigation appears on mobile
- [ ] All cards display with proper styling

### Functional Checkpoints
- [ ] Routing works for all pages
- [ ] Lazy loading implemented
- [ ] API service structure in place
- [ ] Tailwind CSS configured
- [ ] Components are standalone

### Performance
- [ ] Clean, minimal code
- [ ] No over-engineering
- [ ] Focus on usability