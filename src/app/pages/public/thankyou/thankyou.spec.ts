import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { thankyouPage } from './thankyou.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('thankyouPage', () => {
  let comp: thankyouPage;
  let fixture: ComponentFixture<thankyouPage>;
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
        thankyouPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(thankyouPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(thankyouPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Thank You'`, () => {
    const fixture = TestBed.createComponent(thankyouPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Thank You');
  });

  it('should check label name to be ENVIA MEJOR', () => {
    let labelName = fixture.debugElement.query(By.css("#thankyou-title"));
    expect(labelName.nativeElement.textContent.trim()).toBe('ENVIA MEJOR');
  });
  
  it('should check label name to be Thank you for registering', () => {
    let labelName = fixture.debugElement.query(By.css("#thankyou-register"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Thank you for registering');
  });

  it('should check label name to be with Envia Major', () => {
    let labelName = fixture.debugElement.query(By.css("#withEM"));
    expect(labelName.nativeElement.textContent.trim()).toBe('with Envia Major');
  });
  
  it('should check button name to be Continue', () => {
    let labelName = fixture.debugElement.query(By.css("#continue-thankyou"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Continue');
  });
  });