import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { settingsPage } from './settings.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('settingsPage', () => {
  let comp: settingsPage;
  let fixture: ComponentFixture<settingsPage>;
  let de: DebugElement;
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
        settingsPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(settingsPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(settingsPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Settings'`, () => {
    const fixture = TestBed.createComponent(settingsPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Settings');
  });

  it('should check label name to be Settings', () => {
    let labelName = fixture.debugElement.query(By.css("#set-title"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Settings');
  });

  it('should check label name to be About Us', () => {
    let labelName = fixture.debugElement.query(By.css("#abt-us"));
    expect(labelName.nativeElement.textContent.trim()).toBe('About Us');
  });

  it('should check label name to be My Profile', () => {
    let labelName = fixture.debugElement.query(By.css("#my-profile"));
    expect(labelName.nativeElement.textContent.trim()).toBe('My Profile');
  });

  it("should check label name to be Receiver's Profile", () => {
    let labelName = fixture.debugElement.query(By.css("#receiver-profile"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Receiver's Profile");
  });

  it("should check label name to be Change Pincode", () => {
    let labelName = fixture.debugElement.query(By.css("#change-pin"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Change Pincode");
  });

  it("should check label name to be Privacy Policy", () => {
    let labelName = fixture.debugElement.query(By.css("#privacy-policy"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Privacy Policy");
  });

  it("should check label name to be Terms & Conditions", () => {
    let labelName = fixture.debugElement.query(By.css("#terms"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Terms & Conditions");
  });

  it("should check label name to be Help & Feedback", () => {
    let labelName = fixture.debugElement.query(By.css("#help"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Help & Feedback");
  });

  it("should check label name to be Version 1.0.0", () => {
    let labelName = fixture.debugElement.query(By.css("#version"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Version 1.0.0");
  });

  });