import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { logoutPage } from './logout.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from '../../../services/api/api.service'
import {ShowerrormessageComponent} from '../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('logoutPage', () => {
  let comp: logoutPage;
  let fixture: ComponentFixture<logoutPage>;
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
        logoutPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(logoutPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(logoutPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Change Password'`, () => {
    const fixture = TestBed.createComponent(logoutPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Logout');
  });

  it('should check label name to be ENVIA MEJOR', () => {
    let labelName = fixture.debugElement.query(By.css("#logout-title"));
    expect(labelName.nativeElement.textContent.trim()).toBe('ENVIA MEJOR');
  });

  it('should check label name to be You have been successfully', () => {
    let labelName = fixture.debugElement.query(By.css("#logout-success"));
    expect(labelName.nativeElement.textContent.trim()).toBe('You have been successfully');
  });

  it('should check label name to be logged out', () => {
    let labelName = fixture.debugElement.query(By.css("#loggedOut"));
    expect(labelName.nativeElement.textContent.trim()).toBe('logged out');
  });

  it('should check label name to be Want to log back in ?', () => {
    let labelName = fixture.debugElement.query(By.css("#logout-want-to-logout"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Want to log back in ?');
  });

  // it('should check label name to be Click here', () => {
  //   let labelName = fixture.debugElement.query(By.css("#logout-clickhere"));
  //   expect(labelName.nativeElement.textContent.trim()).toBe('Click here');
  // });

});
