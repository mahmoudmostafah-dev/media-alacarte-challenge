# Code Quality & Standards Guide

## 🎯 Code Quality Objectives

- **Readability**: Code should be self-documenting
- **Maintainability**: Easy to understand and modify
- **Testability**: Easy to unit test and mock
- **Performance**: Optimized rendering and bundle size
- **Security**: No vulnerabilities or injection risks
- **Consistency**: Uniform code style across project

## 📝 TypeScript Standards

### Type Safety
Always use explicit types:

```typescript
// ❌ Bad - implicit any
function getData(id) {
  return fetch(`/api/data/${id}`);
}

// ✅ Good - explicit types
function getData(id: number): Promise<DataResponse> {
  return fetch(`/api/data/${id}`).then(res => res.json());
}
```

### Interface vs Type
- Use `interface` for object shapes
- Use `type` for unions and primitives

```typescript
// ✅ Good
interface User {
  id: number;
  name: string;
  email: string;
}

type Status = 'active' | 'inactive' | 'pending';
```

### Strict Null Checks
Handle null/undefined explicitly:

```typescript
// ❌ Bad
function getName(user) {
  return user.name;  // Can throw if user is null
}

// ✅ Good
function getName(user: User | null): string {
  return user?.name ?? 'Unknown';
}
```

## 🏗️ Component Structure

### Component Template
```typescript
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <!-- Template content -->
    </div>
  `,
  styleUrl: './my-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush  // Always use OnPush
})
export class MyComponent implements OnInit {
  // Properties
  @Input() data: any;
  @Output() action = new EventEmitter();
  
  constructor(private service: MyService) {}
  
  ngOnInit() {
    // Initialization
  }
}
```

### Lifecycle Hooks Order
```typescript
ngOnInit()        // Initialize component
ngAfterViewInit() // After view init
ngOnDestroy()     // Cleanup
```

## 📦 Service Standards

### Service Template
```typescript
/**
 * MyService - Handles my business logic
 * @example
 * constructor(private my: MyService) {}
 */
@Injectable({ providedIn: 'root' })
export class MyService {
  private readonly http = inject(HttpClient);
  
  // Observable/Signal for reactive data
  private readonly data$ = new BehaviorSubject<Data[]>([]);
  readonly data = this.data$.asObservable();
  
  // Methods
  getData(): Observable<Data[]> {
    return this.http.get<Data[]>('/api/data').pipe(
      tap(data => this.data$.next(data)),
      catchError(error => {
        console.error('Failed to get data', error);
        return of([]);
      })
    );
  }
}
```

### RxJS Best Practices
```typescript
// ❌ Bad - Memory leaks from unsubscribed observables
ngOnInit() {
  this.service.data$.subscribe(data => {
    this.data = data;
  });
}

// ✅ Good - Use takeUntilDestroyed to auto-unsubscribe
private destroy = inject(DestroyRef);

ngOnInit() {
  this.service.data$
    .pipe(takeUntilDestroyed(this.destroy))
    .subscribe(data => {
      this.data = data;
    });
}
```

## 🎨 Template Standards

### Text Interpolation
```html
<!-- ❌ Bad - Direct property access -->
<div>{{ user }}</div>

<!-- ✅ Good - Specific property -->
<div>{{ user.name }}</div>

<!-- ✅ Good - Safe navigation -->
<div>{{ user?.name }}</div>
```

### Directives
```html
<!-- ✅ Good - *ngIf for conditional rendering -->
<div *ngIf="isLoaded">Content</div>

<!-- ✅ Good - *ngFor with trackBy -->
<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>

<!-- ✅ Good - [ngClass] for dynamic classes -->
<div [ngClass]="{ 'active': isActive, 'disabled': isDisabled }">
  Content
</div>
```

### Event Binding
```html
<!-- ✅ Good - Clear event names -->
<button (click)="onSave()">Save</button>
<form (ngSubmit)="onSubmit($event)">
  <input (change)="onNameChange($event)">
</form>
```

## 🧪 Testing Standards

### Unit Test Template
```typescript
describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent],
      providers: [
        {
          provide: MyService,
          useValue: { getData: jasmine.createSpy() }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    myService = TestBed.inject(MyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    fixture.detectChanges();
    expect(myService.getData).toHaveBeenCalled();
  });
});
```

### Service Test Template
```typescript
describe('MyService', () => {
  let service: MyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch data', () => {
    const mockData = [{ id: 1, name: 'Test' }];
    
    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
```

## 📋 Naming Conventions

### Files
```
my-component.component.ts          ✅
my-component.service.ts            ✅
my-component.pipe.ts               ✅
my-component.directive.ts          ✅
my-component.spec.ts               ✅
my-component.html                  ✅
my-component.css                   ✅
```

### Classes
```typescript
export class MyComponentComponent { }  ✅
export class MyService { }              ✅
export class MyPipe { }                 ✅
```

### Variables & Functions
```typescript
// ✅ Good - Clear, descriptive names
const userData = fetchUser(userId);
function calculateTotalPrice(items: Item[]): number { }

// ❌ Bad - Single letter or unclear names
const d = fetchUser(id);
function calc(i) { }
```

### Observable Properties
```typescript
// ✅ Good - Add $ suffix for observables
data$: Observable<Data[]>;
user$: Observable<User>;

// ❌ Bad - No distinction
data: Observable<Data[]>;
user: Observable<User>;
```

## 🔒 Security Best Practices

### Input Validation
```typescript
// ✅ Good - Validate all inputs
function getUserById(id: string): User | null {
  if (!id || id.trim() === '') return null;
  const numId = parseInt(id, 10);
  if (isNaN(numId)) return null;
  return this.users.find(u => u.id === numId);
}
```

### DOM Sanitization
```typescript
// ❌ Bad - XSS vulnerability
template: `<div [innerHTML]="userComment"></div>`

// ✅ Good - Sanitized
constructor(private sanitizer: DomSanitizer) {}
safeHtml = this.sanitizer.sanitize(SecurityContext.HTML, userComment);
```

### HTTPS Only
```typescript
// ✅ Good - Always use HTTPS in production
apiUrl = environment.production 
  ? 'https://api.media-alacarte.com'
  : 'http://localhost:3000';
```

## 📚 Documentation Standards

### TSDoc Comments
```typescript
/**
 * Fetches user data from the API
 * 
 * @param userId - The ID of the user to fetch
 * @returns Observable of User data
 * @throws Error if userId is invalid
 * 
 * @example
 * this.userService.getUser(123).subscribe(user => {
 *   console.log(user);
 * });
 */
getUser(userId: number): Observable<User> {
  return this.http.get<User>(`/api/users/${userId}`);
}
```

### Component Comments
```typescript
/**
 * User Profile Component
 * 
 * Displays user profile information with edit capability
 * 
 * @example
 * <app-user-profile [userId]="123"></app-user-profile>
 * 
 * @see UserService for data fetching
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent { }
```

## 🎯 Performance Guidelines

### Change Detection
```typescript
// ✅ Always use OnPush
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent { }
```

### TrackBy Function
```typescript
// ✅ Good - Improves ngFor performance
trackById(index: number, item: Item): number {
  return item.id;
}

// Template
<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>
```

### Lazy Loading Routes
```typescript
// ✅ Good - Lazy load feature modules
const routes: Routes = [
  {
    path: 'features',
    loadComponent: () => import('./features/features.component')
      .then(m => m.FeaturesComponent)
  }
];
```

## 🚫 Code Anti-patterns

### Memory Leaks
```typescript
// ❌ Bad - Unsubscribed observable
ngOnInit() {
  this.service.data$.subscribe(data => this.data = data);
}

// ✅ Good - Using async pipe
template: `<div>{{ service.data$ | async }}</div>`
```

### Global Mutable State
```typescript
// ❌ Bad - Global mutable state
let globalData = [];

// ✅ Good - Service with dependency injection
@Injectable({ providedIn: 'root' })
export class DataService {
  private data$ = new BehaviorSubject([]);
}
```

### Circular Dependencies
```typescript
// ❌ Bad - Circular dependency
ServiceA → ServiceB → ServiceA

// ✅ Good - Use composition or separate concerns
ServiceA → SharedService
ServiceB → SharedService
```

## ✅ Review Checklist

Before committing code:

- [ ] All types are explicit (no `any`)
- [ ] No console.log statements in production code
- [ ] Components use OnPush change detection
- [ ] Observables are properly unsubscribed
- [ ] Error handling is implemented
- [ ] Security best practices followed
- [ ] Code is DRY (Don't Repeat Yourself)
- [ ] Functions have single responsibility
- [ ] Comments explain WHY, not WHAT
- [ ] Tests pass and coverage is >80%
- [ ] No hardcoded values (use constants)
- [ ] Accessibility standards met

## 📖 Additional Resources

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Best Practices](https://rxjs.dev/)
- [Web Accessibility](https://www.w3.org/WAI/)

---

**Last Updated**: April 27, 2026
