import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { forgotpasswordPage } from './forgotpassword.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('forgotpasswordPage', () => {
  let comp: forgotpasswordPage;
  let fixture: ComponentFixture<forgotpasswordPage>;
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
        forgotpasswordPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(forgotpasswordPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(forgotpasswordPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Forgot Password'`, () => {
    const fixture = TestBed.createComponent(forgotpasswordPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Forgot Password');
  });

  it('should check label name to be ENVIA MEJOR', () => {
    let labelName = fixture.debugElement.query(By.css("#forgot-pass-title"));
    expect(labelName.nativeElement.textContent.trim()).toBe('ENVIA MEJOR');
  });

  it('should check label name to be Forgot Pincode ?', () => {
    let labelName = fixture.debugElement.query(By.css("#forgot-pincode-label"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Forgot Pincode ?');
  });

  it('check phone number pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#forgot-phone'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value).toMatch("[+][0-9]+");
  });

  it('check phone number length', () => {
    const divDescription = fixture.debugElement.query(By.css('#forgot-phone'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value.length).toBeGreaterThan(10);
  });

  it('check forgot pincode 1 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#forgotInput1'));
    divDescription2.nativeElement.value = '2';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check forgot pincode 2 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#forgotInput2'));
    divDescription2.nativeElement.value = '3';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check forgot pincode 3 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#forgotInput3'));
    divDescription2.nativeElement.value = '9';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check forgot pincode 4 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#forgotInput4'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check forgot pincode 5 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#forgotInput5'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check forgot pincode 6 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#forgotInput6'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check pincode length', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#forgotInput1'));
    divDescription2.nativeElement.value = '2';
    const divDescription3 = fixture.debugElement.query(By.css('#forgotInput2'));
    divDescription3.nativeElement.value = '3';
    const divDescription4 = fixture.debugElement.query(By.css('#forgotInput3'));
    divDescription4.nativeElement.value = '9';
    const divDescription5 = fixture.debugElement.query(By.css('#forgotInput4'));
    divDescription5.nativeElement.value = '6';
    const divDescription6 = fixture.debugElement.query(By.css('#forgotInput5'));
    divDescription6.nativeElement.value = '6';
    const divDescription7 = fixture.debugElement.query(By.css('#forgotInput6'));
    divDescription7.nativeElement.value = '6';
    const pin = divDescription2.nativeElement.value+""+divDescription3.nativeElement.value+""+divDescription4.nativeElement.value+""+divDescription5.nativeElement.value+""+divDescription6.nativeElement.value+""+divDescription7.nativeElement.value;
    expect(pin.length).toBe(6);
  });

  it('should check label name to be Enter the Mobile number you used to join', () => {
    const labelName = fixture.debugElement.query(By.css("#note1"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Enter the Mobile number you used to join');
  });

  it('should check label name to be Envia Mejor.You will get a text with a one-time', () => {
    const labelName = fixture.debugElement.query(By.css("#note2"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Envia Mejor.You will get a text with a one-time');
  });

  it('should check label name to be reference code to reset your pincode', () => {
    const labelName = fixture.debugElement.query(By.css("#note3"));
    expect(labelName.nativeElement.textContent.trim()).toBe('reference code to reset your pincode');
  });

  it('should check button name to be Continue', () => {
    const labelName = fixture.debugElement.query(By.css("#continue"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Continue');
  });

});
