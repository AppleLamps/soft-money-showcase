# BankFlow - Modern Banking PWA Mockup

A visually polished Progressive Web App (PWA) mockup showcasing modern banking features with a clean, professional grayscale design. This is a **UI/UX demonstration only** - all data is mocked and no real banking operations occur.

## 🎯 Project Overview

BankFlow is a consumer banking app mockup designed to demonstrate modern banking interfaces for both mobile and desktop. It features a minimalist grayscale palette, responsive design, and smooth interactions - perfect for showcasing banking UI/UX capabilities or as a starting point for a real banking application.

### Key Features

- **📱 Accounts Dashboard**: View multiple account balances (checking, savings, credit cards) with summary cards
- **💸 Transactions**: Browse, filter, and search transaction history with detailed categorization
- **🔄 Money Transfer**: Mock interface for transferring funds between accounts or to recipients
- **📅 Bills & Payments**: Manage upcoming bills with payment tracking (all simulated)
- **📊 Insights & Analytics**: Visual spending breakdowns by category and monthly trends using charts
- **👤 Profile & Settings**: User profile management with notification preferences and security settings

### Design Philosophy

- **Light-only theme**: Professional grayscale palette (#F7F7F7 backgrounds, black/white text)
- **Mobile-first**: Fully responsive with optimized experiences for mobile, tablet, and desktop
- **Collapsible sidebar**: Icon-only mode on desktop, overlay menu on mobile
- **Smooth interactions**: Subtle animations, hover effects, and transitions
- **shadcn/ui components**: Consistent, accessible UI components throughout

## ⚠️ Important Notes

**This is a mockup only:**
- ❌ No real authentication or user data
- ❌ No real payment processing or API connections
- ❌ No backend database - all data is static/mocked
- ✅ All features work offline with mock data
- ✅ Installable as PWA for native-like experience
- ✅ Perfect for demos, prototypes, and UI testing

## 📦 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Layout.tsx       # Main layout with collapsible sidebar
│   └── AccountCard.tsx  # Reusable account card component
├── pages/
│   ├── Dashboard.tsx    # Home page with account overview
│   ├── Transactions.tsx # Transaction history with filters
│   ├── Transfer.tsx     # Money transfer interface
│   ├── Bills.tsx        # Bill management
│   ├── Insights.tsx     # Spending analytics charts
│   └── Profile.tsx      # User profile and settings
├── data/
│   └── mockData.ts      # All mock data (accounts, transactions, bills)
└── index.css            # Design system with grayscale theme

## Project info

**URL**: https://lovable.dev/projects/838fcc6e-04df-49f4-a3bd-1fdfab496446

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/838fcc6e-04df-49f4-a3bd-1fdfab496446) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🛠️ Technologies Used

This project is built with:

- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **[React 18](https://react.dev/)** - UI library with hooks
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality, accessible React components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Recharts](https://recharts.org/)** - Composable charting library for insights
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

## 🎨 Design System

The app uses a custom grayscale design system defined in `src/index.css`:

```css
/* Light theme only - no dark mode */
--background: 0 0% 97%;        /* #F7F7F7 */
--foreground: 0 0% 10%;        /* Near black */
--card: 0 0% 100%;             /* White */
--primary: 0 0% 20%;           /* Dark gray */
--muted: 0 0% 96%;             /* Light gray */
--border: 0 0% 90%;            /* Soft gray borders */
```

All components use semantic tokens from the design system - no hardcoded colors!

## 📊 Mock Data

All data is stored in `src/data/mockData.ts`:

- **3 bank accounts** (checking, savings, credit card)
- **25+ transactions** with categories, dates, and amounts
- **5 upcoming bills** with various statuses
- **User profile** information

To customize the mock data, edit `mockData.ts` and modify the exported arrays.

## 🚀 Deployment

### Deploy with Lovable (Easiest)

Simply open [Lovable](https://lovable.dev/projects/838fcc6e-04df-49f4-a3bd-1fdfab496446) and click on Share -> Publish.

Your app will be live instantly with HTTPS and PWA capabilities enabled.

### Deploy to Other Platforms

Since this is a standard Vite + React app, you can deploy to:

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag-and-drop the `dist` folder after `npm run build`
- **GitHub Pages**: Use the `gh-pages` branch workflow
- **Any static host**: Upload the contents of `dist/` folder

## 🌐 PWA Features

This app is configured as a Progressive Web App:

- **Installable**: Users can install it to their home screen
- **Offline-capable**: Works without internet (all data is local)
- **Fast loading**: Optimized assets and caching
- **Mobile-optimized**: Responsive design for all screen sizes

### Installing the PWA

On mobile devices:
- **iOS**: Tap Share → Add to Home Screen
- **Android**: Tap menu (⋮) → Install App / Add to Home Screen

## 🔧 Customization Guide

### Changing Colors

Edit `src/index.css` to modify the grayscale theme or add colors:

```css
:root {
  --primary: 220 50% 50%;  /* Add a blue primary color */
  --accent: 280 60% 50%;   /* Add purple accent */
}
```

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add a route in `src/App.tsx`
3. Add navigation link in `src/components/Layout.tsx`

### Modifying Mock Data

Edit `src/data/mockData.ts` to change:
- Account balances and types
- Transaction history
- Bill due dates and amounts
- User profile information

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (bottom navigation, overlay sidebar)
- **Tablet**: 768px - 1024px (collapsible sidebar)
- **Desktop**: > 1024px (expanded sidebar with collapse option)

## 🔐 Custom Domain

You can connect a custom domain to your Lovable project!

Navigate to Project > Settings > Domains and click Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📝 License

This is a demonstration project. Feel free to use it as a starting point for your own applications.

## 🤝 Contributing

Since this is a Lovable project with bidirectional GitHub sync:

1. Make changes in Lovable - they auto-sync to GitHub
2. Or push changes to GitHub - they auto-sync to Lovable
3. Use branches for features (enable in Lovable Account Settings > Labs)

## 📚 Additional Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Guide](https://reactrouter.com/en/main/start/tutorial)

---

**Note**: This is a UI mockup for demonstration purposes only. No real banking operations or data storage occurs.
