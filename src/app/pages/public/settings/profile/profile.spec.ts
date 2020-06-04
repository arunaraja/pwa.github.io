import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { profilePage } from './profile.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('profilePage', () => {
  let comp: profilePage;
  let fixture: ComponentFixture<profilePage>;
  // let de: DebugElement;
  // let el: HTMLElement;
  let service : AuthService ;
//   comp.openNavBar = true ;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
      ],
      declarations: [
        profilePage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(profilePage);
      comp = fixture.componentInstance;
      // de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(profilePage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Profile'`, () => {
    const fixture = TestBed.createComponent(profilePage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Profile');
  });

  it('should check label name to be Profile', () => {
    let labelName = fixture.debugElement.query(By.css("#title-profile"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Profile');
  });

  it('should check label name to be Edit', () => {
    let labelName = fixture.debugElement.query(By.css("#edit-profile"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Edit');
  });

  });