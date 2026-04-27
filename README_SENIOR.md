# Media Alacarte - Angular Frontend

A modern, high-performance Angular application showcasing Media Alacarte platform. Built with Angular 21, Tailwind CSS, GSAP animations, and follows industry-standard practices for enterprise-level applications.

## 🎯 Features

- ✨ **Modern Angular 21** - Latest Angular features including signals and standalone components
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 🚀 **Performance Optimized** - Lazy loading, OnPush change detection, SSR ready
- ✅ **Type-Safe** - Strict TypeScript with full type checking
- 🎬 **GSAP Animations** - Smooth, performant animations and transitions
- 🏗️ **Scalable Architecture** - Core, Shared, and Feature-based folder structure
- 🛡️ **Error Handling** - Global error interceptors and user-friendly error messages
- 📱 **Responsive Design** - Mobile-first responsive layouts
- 🧪 **Testable Code** - Ready for unit and E2E testing
- 📚 **Well Documented** - TypeScript comments and architecture documentation

## 📋 Project Structure

```
src/
├── app/
│   ├── core/                      # Core singleton services & interceptors
│   │   ├── services/              # API, Theme, Animation services
│   │   ├── interceptors/          # HTTP error & logging interceptors
│   │   └── index.ts               # Public API
│   │
│   ├── shared/                    # Shared components, pipes, directives
│   │   ├── components/            # Reusable components (Button, Spinner, Error)
│   │   ├── pipes/
│   │   ├── directives/
│   │   └── index.ts
│   │
│   ├── feature/                   # Feature modules (lazy-loaded)
│   │   ├── about-us/
│   │   ├── benefits/
│   │   ├── contact-us/
│   │   ├── features/
│   │   └── request-demo/
│   │
│   ├── layout/                    # Layout components (Navbar, Footer)
│   │   ├── navbar/
│   │   └── footer/
│   │
│   ├── home/                      # Home page
│   │
│   ├── app.ts                     # Root component
│   ├── app.routes.ts              # Route definitions
│   └── app.config.ts              # App configuration
│
├── styles/                        # Global styles
├── environments/                  # Environment configs
└── main.ts                        # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **npm**: 9+
- **Angular CLI**: 21+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd media-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:4200`

### Build & Deployment

**Development Build:**
```bash
npm run build
```

**Production Build (Optimized):**
```bash
ng build --configuration production
```

**Server-Side Rendering:**
```bash
npm run serve:ssr:media-app
```

## 🏛️ Architecture Overview

### Core Module
Provides singleton services for the entire application:

- **ApiService**: Centralized HTTP requests with error handling
- **ThemeService**: Theme management (light/dark mode) with localStorage persistence
- **AnimationService**: GSAP animation utilities for consistent animations

### Shared Module
Reusable components and utilities:

- **LoadingSpinner**: Loading state component
- **ErrorDisplay**: Error message component with retry functionality
- **Button**: Reusable button component with variants

### Feature Modules
Encapsulated feature pages with their own logic:

- Home
- Features
- Benefits
- Request Demo
- Contact Us
- About Us

### Layout
Global layout components:

- **Navbar**: Navigation with route links
- **Footer**: Application footer

## 🔧 Key Technologies

| Technology | Purpose | Version |
|---|---|---|
| Angular | Framework | 21.2.0 |
| TypeScript | Language | 5.9.2 |
| Tailwind CSS | Styling | 4.1.12 |
| GSAP | Animations | Latest |
| RxJS | Reactive | 7.8.0 |
| Angular SSR | Server-side rendering | 21.2.8 |

## 📡 API Integration

All API calls go through the `ApiService` in the core module:

```typescript
import { ApiService } from '@app/core';

@Injectable()
export class MyService {
  constructor(private api: ApiService) {}

  getData() {
    return this.api.get('/endpoint');
  }
}
```

## 🎬 Animations

Using GSAP animations through the `AnimationService`:

```typescript
import { AnimationService } from '@app/core';

export class MyComponent {
  constructor(private animation: AnimationService) {}

  ngAfterViewInit() {
    this.animation.fadeIn('.my-element');
  }
}
```

## 🧪 Testing

### Run Unit Tests
```bash
npm test
```

### Test Coverage
```bash
ng test --code-coverage
```

Components are structured to be easily testable with dependency injection and standalone components.

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Screen reader friendly

## 📊 Performance

- **Lazy loading** for feature routes
- **OnPush change detection** in components
- **Tree-shakable** standalone components
- **SSR ready** for faster initial load
- **Code splitting** for optimized bundles
- **Image optimization** with lazy loading

## 🔐 Security

- HTTP interceptors for error handling
- Type-safe API calls
- CSP-ready configuration
- Secure localStorage usage
- Input validation ready (add validators as needed)

## 📝 Code Quality Standards

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint configuration ready
- **Formatting**: Prettier configuration included
- **Comments**: TSDoc-style documentation
- **Naming**: Clear, descriptive names following Angular guidelines

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [GSAP Documentation](https://gsap.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📧 Support

For questions or issues, please contact the development team.

## 📄 License

© 2026 Media Alacarte. All rights reserved.

---

**Last Updated**: April 27, 2026
**Angular Version**: 21.2.0
**Node Version**: 18+ LTS
