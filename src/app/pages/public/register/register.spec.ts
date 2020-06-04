import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { registerPage } from './register.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('registerPage', () => {
  let comp: registerPage;
  let fixture: ComponentFixture<registerPage>;
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
        registerPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(registerPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(registerPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Register'`, () => {
    const fixture = TestBed.createComponent(registerPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Register');
  });

  it('should check label name to be ENVIA MEJOR', () => {
    let labelName = fixture.debugElement.query(By.css("#registerTitle"));
    expect(labelName.nativeElement.textContent.trim()).toBe('ENVIA MEJOR');
  });
  
  it('should check label name to be Set Up your Account', () => {
    let labelName = fixture.debugElement.query(By.css("#setUpAccount"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Set Up your Account');
  });

  it('check register phone number pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#registerPhone'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value).toMatch("[+][0-9]+");
  });

  it('check register phone number length', () => {
    const divDescription = fixture.debugElement.query(By.css('#registerPhone'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value.length).toBeGreaterThan(10);
  });

  it('check register pincode 1 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#registerInput1'));
    divDescription2.nativeElement.value = '2';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check register pincode 2 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#registerInput2'));
    divDescription2.nativeElement.value = '3';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check register pincode 3 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#registerInput3'));
    divDescription2.nativeElement.value = '9';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check register pincode 4 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#registerInput4'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check register pincode length', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#registerInput1'));
    divDescription2.nativeElement.value = '2';
    const divDescription3 = fixture.debugElement.query(By.css('#registerInput2'));
    divDescription3.nativeElement.value = '3';
    const divDescription4 = fixture.debugElement.query(By.css('#registerInput3'));
    divDescription4.nativeElement.value = '9';
    const divDescription5 = fixture.debugElement.query(By.css('#registerInput4'));
    divDescription5.nativeElement.value = '6';
    const pin = divDescription2.nativeElement.value+""+divDescription3.nativeElement.value+""+divDescription4.nativeElement.value+""+divDescription5.nativeElement.value;
    expect(pin.length).toBe(4);
  });

  // it('should check label name to be Invalid new pincode !', () => {
  //   let labelName = fixture.debugElement.query(By.css("#registerInvalidOtp"));
  //   expect(labelName.nativeElement.textContent.trim()).toBe('Invalid new pincode !');
  // });

  it('should check label name to be Enter new pincode', () => {
    let labelName = fixture.debugElement.query(By.css("#registerNewPin"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Enter new pincode');
  });

  it('check register confirm pincode 1 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#registerInputConf1'));
    divDescription2.nativeElement.value = '2';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check register confirm pincode 2 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#registerInputConf2'));
    divDescription2.nativeElement.value = '3';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check register confirm pincode 3 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#registerInputConf3'));
    divDescription2.nativeElement.value = '9';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check register confirm pincode 4 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#registerInputConf4'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check register confirm pincode length', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#registerInputConf1'));
    divDescription2.nativeElement.value = '2';
    const divDescription3 = fixture.debugElement.query(By.css('#registerInputConf2'));
    divDescription3.nativeElement.value = '3';
    const divDescription4 = fixture.debugElement.query(By.css('#registerInputConf3'));
    divDescription4.nativeElement.value = '9';
    const divDescription5 = fixture.debugElement.query(By.css('#registerInputConf4'));
    divDescription5.nativeElement.value = '6';
    const pin = divDescription2.nativeElement.value+""+divDescription3.nativeElement.value+""+divDescription4.nativeElement.value+""+divDescription5.nativeElement.value;
    expect(pin.length).toBe(4);
  });

  // it('should check label name to be Invalid confirm pincode !', () => {
  //   let labelName = fixture.debugElement.query(By.css(".registerInvalidOtpConf1"));
  //   expect(labelName.nativeElement.textContent.trim()).toBe('Invalid confirm pincode !');
  // });

  // it('should check label name to be Confirm pincode', () => {
  //   let labelName = fixture.debugElement.query(By.css("#registerConfPin"));
  //   expect(labelName.nativeElement.textContent.trim()).toBe('Confirm pincode');
  // });

  // it('should check label name to be Pincode Mismatch', () => {
  //   let labelName = fixture.debugElement.query(By.css("#registerInvalidOtpConf2"));
  //   expect(labelName.nativeElement.textContent.trim()).toBe('Pincode Mismatch !');
  // });

  // it('should check label name to be Already Registered. Proceed with login !', () => {
  //   let labelName = fixture.debugElement.query(By.css("#registerInvalidOtpConf3"));
  //   expect(labelName.nativeElement.textContent.trim()).toBe('Already Registered. Proceed with login !');
  // });

  it('should check button name to be Submit', () => {
    let labelName = fixture.debugElement.query(By.css("#registerSubmitBtn"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Submit');
  });

});
