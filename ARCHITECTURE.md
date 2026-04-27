# Architecture Documentation

## Overview

This document describes the architecture of the Media Alacarte Angular application, designed to be scalable, maintainable, and follow enterprise-level best practices.

## Architectural Patterns

### 1. **Core/Shared/Feature Pattern**

The application follows the Angular recommended pattern:

```
Core Module: Singleton services
  ↓
Shared Module: Reusable components & utilities  
  ↓
Feature Modules: Feature-specific components & logic
```

### 2. **Service Layer Architecture**

```
Component Layer (UI)
    ↓
Service Layer (Business Logic)
    ↓
Core Services (API, State, Theme)
    ↓
HTTP Layer (Interceptors)
    ↓
External APIs
```

### 3. **Dependency Injection**

All services use Angular's DI system with `providedIn: 'root'` to ensure:
- Singleton pattern
- Tree-shakable code
- No circular dependencies

## Service Design

### ApiService
**Responsibility**: Centralized HTTP communication

```typescript
// All HTTP calls go through this service
constructor(private api: ApiService) {}
getData() => this.api.get('/endpoint')
```

**Features**:
- Centralized base URL management
- Error handling
- Request/Response logging via interceptors
- Type-safe responses with TypeScript generics

### ThemeService
**Responsibility**: Application theme management

```typescript
// Manage light/dark theme
this.theme.toggleTheme();
this.theme.getTheme(); // Returns signal<Theme>
```

**Features**:
- localStorage persistence
- Observable/Signal-based updates
- DOM class management

### AnimationService
**Responsibility**: GSAP animation utilities

```typescript
// Reusable animations
this.animation.fadeIn(element);
this.animation.slideUp(element);
this.animation.staggerIn(elements);
```

**Features**:
- Pre-built animation patterns
- Scroll-triggered animations
- Hover effects
- Stagger animations

## Component Design

### Smart Components (Containers)
- Handle routing and navigation
- Manage state and services
- Pass data to presentational components

Example:
```typescript
@Component({
  selector: 'app-features-page',
  imports: [CommonModule, FeatureCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesComponent {
  features$ = this.apiService.get('/features');
}
```

### Presentational Components
- Receive data via `@Input()`
- Emit events via `@Output()`
- No service dependencies
- Highly reusable

Example:
```typescript
@Component({
  selector: 'app-feature-card',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureCardComponent {
  @Input() feature: Feature;
  @Output() click = new EventEmitter();
}
```

## State Management with Signals

Angular 17+ Signals provide reactive state without RxJS complexity:

```typescript
// Global state with signal
export class StateService {
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();

  setUser(user: User) {
    this._currentUser.set(user);
  }
}
```

## HTTP Interceptors

### Error Interceptor
Catches all HTTP errors and provides consistent error handling:

```
HTTP Request
    ↓
[Error Interceptor] - Catches errors, logs them
    ↓
[Logging Interceptor] - Logs request duration
    ↓
External API
```

### Request Flow
1. Component calls `ApiService`
2. ApiService makes HTTP request
3. Interceptors process request/response
4. Error Interceptor catches errors
5. Logging Interceptor logs timing
6. Response returned to component

## Routing Strategy

### Current Routes (Eager Loading)
```typescript
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'features', component: Features },
  // ...
];
```

### Recommended Future: Lazy Loading
```typescript
export const routes: Routes = [
  { path: '', component: Home },
  { 
    path: 'features', 
    loadComponent: () => import('./feature/features/features')
  },
  // ...
];
```

## Change Detection Strategy

All components should use `OnPush` for better performance:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {}
```

## Data Flow

```
User Interaction (Click, Form Submit)
    ↓
Component emits event
    ↓
Service updates state (signal/observable)
    ↓
Component detects change (OnPush or signal)
    ↓
Template re-renders
```

## Error Handling Strategy

### Global Error Handling
```
HTTP Error
    ↓
ErrorInterceptor catches it
    ↓
Error logged to console
    ↓
Error observable returned
    ↓
Component handles in subscribe
    ↓
ErrorDisplayComponent shown to user
```

### Component-Level Error Handling
```typescript
getData() {
  this.apiService.get('/data').pipe(
    catchError(error => {
      this.error = 'Failed to load data';
      return of([]);
    })
  ).subscribe(data => this.data = data);
}
```

## Performance Optimization

### 1. Change Detection
- Use `OnPush` strategy in all components
- Signals automatically optimize detection

### 2. Lazy Loading
- Implement lazy-loaded feature modules
- Reduce initial bundle size

### 3. Pipe Safety
- Use `trackBy` in ngFor loops
- Create pure pipes for transforms

### 4. Unsubscribe Pattern
```typescript
// Use takeUntilDestroyed()
private destroy = inject(DestroyRef);

observable$.pipe(
  takeUntilDestroyed(this.destroy)
).subscribe();
```

## Testing Strategy

### Unit Tests
- Test services independently
- Mock dependencies
- Test component logic
- Test service methods

### Integration Tests
- Test component + service integration
- Test HTTP calls with mock server
- Test error scenarios

### E2E Tests
- Test user workflows
- Test navigation
- Test forms and interactions

## Deployment Strategy

### Build Optimization
```bash
# Development
ng serve

# Production
ng build --configuration production
--aot                    # Ahead-of-time compilation
--prod                   # Production mode
--optimize               # Bundle optimization
```

### Server-Side Rendering (SSR)
```bash
npm run serve:ssr:media-app
```

### Environment Configuration
```typescript
// environment.ts (development)
export const environment = {
  apiUrl: 'http://localhost:3000',
  production: false
};

// environment.prod.ts (production)
export const environment = {
  apiUrl: 'https://api.media-alacarte.com',
  production: true
};
```

## Security Considerations

1. **HTTP Security**
   - All API calls use HTTPS in production
   - CORS configured correctly
   - Content Security Policy headers

2. **Data Security**
   - Never store sensitive data in localStorage
   - Use httpOnly cookies for auth tokens
   - Sanitize user input

3. **Code Security**
   - Use Angular's built-in sanitization
   - DomSanitizer for dynamic content
   - No innerHTML with user data

## Scalability

### Adding New Features
1. Create feature folder in `src/app/feature/`
2. Create component and service
3. Add route to `app.routes.ts`
4. Export service from core if needed

### Adding New Services
1. Create in `src/app/core/services/`
2. Decorate with `@Injectable({ providedIn: 'root' })`
3. Export from `core/index.ts`
4. Inject in components

### Adding New Shared Components
1. Create in `src/app/shared/components/`
2. Make standalone or exportable
3. Export from `shared/index.ts`
4. Import where needed

## Monitoring & Analytics

Future considerations:
- Google Analytics integration
- Error tracking (Sentry, LogRocket)
- Performance monitoring (Web Vitals)
- User session tracking

---

**Created**: April 27, 2026
**Angular Version**: 21.2.0
**Last Updated**: April 27, 2026
