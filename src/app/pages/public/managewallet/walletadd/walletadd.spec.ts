import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { walletaddPage } from './walletadd.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('walletaddPage', () => {
  let comp: walletaddPage;
  let fixture: ComponentFixture<walletaddPage>;
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
        walletaddPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(walletaddPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(walletaddPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Change Password'`, () => {
    const fixture = TestBed.createComponent(walletaddPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Add Wallet');
  });

  it('should check label name to be Wallet', () => {
    let labelName = fixture.debugElement.query(By.css("#add-wallet"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Wallet');
  });

  it('should check label name to be Please fill in the required details', () => {
    let labelName = fixture.debugElement.query(By.css("#pleaseFill"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Please fill in the required details');
  });

  it('should check label name to be Name on Card', () => {
    let labelName = fixture.debugElement.query(By.css("#nameOnCard"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Name on Card');
  });

  it('check name on card pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#cardName'));
    divDescription.nativeElement.value = 'Logeshwari Murugan';
    expect(divDescription.nativeElement.value).toMatch("[A-Za-z ]+");
  });

  it('check name on card length', () => {
    const divDescription = fixture.debugElement.query(By.css('#cardName'));
    divDescription.nativeElement.value = 'Logeshwari Murugan';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(50);
  });

  it('should check label name to be Credit/Debit Card Number', () => {
    let labelName = fixture.debugElement.query(By.css("#ccdcLbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Credit/Debit Card Number');
  });
  
  it('check credit/debit card number pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#ccdc'));
    divDescription.nativeElement.value = '7845789563217845';
    expect(divDescription.nativeElement.value).toMatch("[0-9]{16}");
  });

  it('check credit/debit card number length', () => {
    const divDescription = fixture.debugElement.query(By.css('#ccdc'));
    divDescription.nativeElement.value = '7845789563217845';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(16);
  });

  it('should check label name to be Expiry Date', () => {
    let labelName = fixture.debugElement.query(By.css("#expiryDateLbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Expiry Date');
  });

  it('should check label name to be CVV', () => {
    let labelName = fixture.debugElement.query(By.css("#cvvLbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('CVV');
  });

  it('check expiry date length', () => {
    const divDescription = fixture.debugElement.query(By.css('#expiry'));
    divDescription.nativeElement.value = '07/2025';
    expect(divDescription.nativeElement.value.length).toBe(7);
  });

  it('check cvv length', () => {
    const divDescription = fixture.debugElement.query(By.css('#cvv'));
    divDescription.nativeElement.value = '852';
    expect(divDescription.nativeElement.value.length).toBe(3);
  });

  it('check cvv pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#cvv'));
    divDescription.nativeElement.value = '852';
    expect(divDescription.nativeElement.value).toMatch("[0-9]{3}");
  });

  it('should check label name to be Save', () => {
    let labelName = fixture.debugElement.query(By.css("#saveBtnWallet"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Save');
  });

});
