import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { changePasswordPage } from './changepassword.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('changePasswordPage', () => {
  let comp: changePasswordPage;
  let fixture: ComponentFixture<changePasswordPage>;
  let de: DebugElement;
  let el: HTMLElement;
  let service : AuthService ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
      ],
      declarations: [
        changePasswordPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(changePasswordPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(changePasswordPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Change Password'`, () => {
    const fixture = TestBed.createComponent(changePasswordPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Change Password');
  });

  it('should check label name to be Set Up your new pincode', () => {
    let labelName = fixture.debugElement.query(By.css("#setuppin"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Set Up your new pincode');
  });


  it('check change pincode 1 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#changePin1'));
    divDescription2.nativeElement.value = '2';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check change pincode 2 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#changePin2'));
    divDescription2.nativeElement.value = '3';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check change pincode 3 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#changePin3'));
    divDescription2.nativeElement.value = '9';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check change pincode 4 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#changePin4'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check new pincode 1 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#changeConfPin1'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check new pincode 2 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#changeConfPin2'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check new pincode 3 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#changeConfPin3'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check new pincode 4 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#changeConfPin4'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check change pincode length', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#changePin1'));
    divDescription2.nativeElement.value = '2';
    const divDescription3 = fixture.debugElement.query(By.css('#changePin2'));
    divDescription3.nativeElement.value = '3';
    const divDescription4 = fixture.debugElement.query(By.css('#changePin3'));
    divDescription4.nativeElement.value = '9';
    const divDescription5 = fixture.debugElement.query(By.css('#changePin4'));
    divDescription5.nativeElement.value = '6';
    const pin = divDescription2.nativeElement.value+""+divDescription3.nativeElement.value+""+divDescription4.nativeElement.value+""+divDescription5.nativeElement.value;
    expect(pin.length).toBe(4);
  });

  it('check confirm new pincode length', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#changeConfPin1'));
    divDescription2.nativeElement.value = '2';
    const divDescription3 = fixture.debugElement.query(By.css('#changeConfPin2'));
    divDescription3.nativeElement.value = '3';
    const divDescription4 = fixture.debugElement.query(By.css('#changeConfPin3'));
    divDescription4.nativeElement.value = '9';
    const divDescription5 = fixture.debugElement.query(By.css('#changeConfPin4'));
    divDescription5.nativeElement.value = '6';
    const pin = divDescription2.nativeElement.value+""+divDescription3.nativeElement.value+""+divDescription4.nativeElement.value+""+divDescription5.nativeElement.value;
    expect(pin.length).toBe(4);
  });

  it('should check label name to be Confirm pincode', () => {
    const labelName = fixture.debugElement.query(By.css("#conf-pin"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Confirm pincode');
  });

  it('should check button name to be Submit', () => {
    const labelName = fixture.debugElement.query(By.css("#change-submit"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Submit');
  });

});
