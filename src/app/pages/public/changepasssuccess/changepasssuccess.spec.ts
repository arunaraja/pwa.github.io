import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { changepasssuccessPage } from './changepasssuccess.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('changepasssuccessPage', () => {
  let comp: changepasssuccessPage;
  let fixture: ComponentFixture<changepasssuccessPage>;
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
        changepasssuccessPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(changepasssuccessPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(changepasssuccessPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Change Password'`, () => {
    const fixture = TestBed.createComponent(changepasssuccessPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Change Password Success');
  });

  it('should check label name to be ENVIA MEJOR', () => {
    let labelName = fixture.debugElement.query(By.css("#changepass-success-title"));
    expect(labelName.nativeElement.textContent.trim()).toBe('ENVIA MEJOR');
  });

  it('should check label name to be Your Pincode has been', () => {
    let labelName = fixture.debugElement.query(By.css("#note4"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Your Pincode has been');
  });

  it('should check label name to be Changed successfully', () => {
    let labelName = fixture.debugElement.query(By.css("#note5"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Changed successfully');
  });

  it('should check button name to be Click here', () => {
    let labelName = fixture.debugElement.query(By.css("#clickhere"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Click here');
  });

  it('should check button name to be to Login', () => {
    let labelName = fixture.debugElement.query(By.css("#toLogin"));
    expect(labelName.nativeElement.textContent.trim()).toBe('to Login');
  });

});
