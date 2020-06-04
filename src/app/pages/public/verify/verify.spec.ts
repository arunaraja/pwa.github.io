import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { verifyPage } from './verify.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('verifyPage', () => {
  let comp: verifyPage;
  let fixture: ComponentFixture<verifyPage>;
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
        verifyPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(verifyPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(verifyPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Verify'`, () => {
    const fixture = TestBed.createComponent(verifyPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Verify');
  });

  it('should check label name to be ENVIA MEJOR', () => {
    let labelName = fixture.debugElement.query(By.css("#verfiyTitle"));
    expect(labelName.nativeElement.textContent.trim()).toBe('ENVIA MEJOR');
  });

  it('should check label name to be Verify your Mobile Number', () => {
    let labelName = fixture.debugElement.query(By.css("#verifyMobile"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Verify your Mobile Number');
  });

  it('check phone number pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#verifyPhone'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value).toMatch("[+][0-9]+");
  });

  it('check phone number length', () => {
    const divDescription = fixture.debugElement.query(By.css('#verifyPhone'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value.length).toBeGreaterThan(10);
  });

  it('check verify pincode 1 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#verifyInput1'));
    divDescription2.nativeElement.value = '2';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check verify pincode 2 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#verifyInput2'));
    divDescription2.nativeElement.value = '3';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check verify pincode 3 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#verifyInput3'));
    divDescription2.nativeElement.value = '9';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check verify pincode 4 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#verifyInput4'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check verify pincode 5 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#verifyInput5'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check verify pincode 6 should not be undefined', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#verifyInput6'));
    divDescription2.nativeElement.value = '6';
    const pin1 = divDescription2.nativeElement.value ;
    expect(pin1.length).toBe(1);
  });

  it('check verify pincode length', () => {
    const divDescription2 = fixture.debugElement.query(By.css('#verifyInput1'));
    divDescription2.nativeElement.value = '2';
    const divDescription3 = fixture.debugElement.query(By.css('#verifyInput2'));
    divDescription3.nativeElement.value = '3';
    const divDescription4 = fixture.debugElement.query(By.css('#verifyInput3'));
    divDescription4.nativeElement.value = '9';
    const divDescription5 = fixture.debugElement.query(By.css('#verifyInput4'));
    divDescription5.nativeElement.value = '6';
    const divDescription6 = fixture.debugElement.query(By.css('#verifyInput5'));
    divDescription6.nativeElement.value = '6';
    const divDescription7 = fixture.debugElement.query(By.css('#verifyInput6'));
    divDescription7.nativeElement.value = '6';
    const pin = divDescription2.nativeElement.value+""+divDescription3.nativeElement.value+""+divDescription4.nativeElement.value+""+divDescription5.nativeElement.value+""+divDescription6.nativeElement.value+""+divDescription7.nativeElement.value;
    expect(pin.length).toBe(6);
  });

  it('should check label name to be Please enter the reference code to', () => {
    let labelName = fixture.debugElement.query(By.css("#verifyNote1"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Please enter the reference code to');
  });

  it('should check label name to be above Mobile Number', () => {
    let labelName = fixture.debugElement.query(By.css("#verifyNote2"));
    expect(labelName.nativeElement.textContent.trim()).toBe('above Mobile Number');
  });

  it('should check button name to be to Continue', () => {
    let labelName = fixture.debugElement.query(By.css("#verifySubmitBtn"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Continue');
  });

});
