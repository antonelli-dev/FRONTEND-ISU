import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: '', redirectTo: '/list', pathMatch: 'full' },
        { path: 'list', component: class DummyListComponent {} },
        { path: 'create', component: class DummyCreateComponent {} },
        { path: 'edit/:id', component: class DummyEditComponent {} },
        { path: 'detail/:id', component: class DummyDetailComponent {} },
      ])],
      declarations: [AppComponent],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    TestBed.createComponent(AppComponent).ngZone?.run(() => {
      router.initialNavigation();
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to "/list" by default', async () => {
    TestBed.createComponent(AppComponent).ngZone?.run(() => {
      router.navigate(['']);
    });
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(location.path()).toBe('/list');
  });

  it('should navigate to "/create"', async () => {
    TestBed.createComponent(AppComponent).ngZone?.run(() => {
      router.navigate(['/create']);
    });
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(location.path()).toBe('/create');
  });

  it('should navigate to "/edit/:id"', async () => {
    TestBed.createComponent(AppComponent).ngZone?.run(() => {
      router.navigate(['/edit/1']);
    });
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(location.path()).toBe('/edit/1');
  });

  it('should navigate to "/detail/:id"', async () => {
    TestBed.createComponent(AppComponent).ngZone?.run(() => {
      router.navigate(['/detail/1']);
    });
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(location.path()).toBe('/detail/1');
  });
});
