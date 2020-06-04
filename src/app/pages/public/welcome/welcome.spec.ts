import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { welcomePage } from './welcome.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('welcomePage', () => {
  let comp: welcomePage;
  let fixture: ComponentFixture<welcomePage>;
  let de: DebugElement;
  // let el: HTMLElement;
  let service : AuthService ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
      ],
      declarations: [
        welcomePage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(welcomePage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(welcomePage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Welcome'`, () => {
    const fixture = TestBed.createComponent(welcomePage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Welcome');
  });

  it('should check label name to be ENVIA MEJOR', () => {
    let labelName = fixture.debugElement.query(By.css("#welcomeTitle"));
    expect(labelName.nativeElement.textContent.trim()).toBe('ENVIA MEJOR');
  });

  it('should check label name to be Welcome', () => {
    let labelName = fixture.debugElement.query(By.css("#welcome"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Welcome');
  });

  it("should check label name to be Let's get started", () => {
    let labelName = fixture.debugElement.query(By.css("#lestStart"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Let's get started");
  });

  it("should check label name to be Enter your Mobile Number", () => {
    let labelName = fixture.debugElement.query(By.css("#enterPhoneNo"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Enter your Mobile Number");
  });

  it('check phone number pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#welcomePhone'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value).toMatch("[+][0-9]+");
  });

  it('check phone number length', () => {
    const divDescription = fixture.debugElement.query(By.css('#welcomePhone'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value.length).toBeGreaterThan(10);
  });

  it("should check button name to be Continue", () => {
    let labelName = fixture.debugElement.query(By.css("#welcomeSubmitBtn"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Continue");
  });

});
