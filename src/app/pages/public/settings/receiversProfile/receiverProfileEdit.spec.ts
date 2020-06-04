import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { receiversprofileeditPage } from './receiversProfileEdit.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('receiversprofileeditPage', () => {
  let comp: receiversprofileeditPage;
  let fixture: ComponentFixture<receiversprofileeditPage>;
  let de: DebugElement;
  let el: HTMLElement;
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
        receiversprofileeditPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(receiversprofileeditPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(receiversprofileeditPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Edit Receiver's Profile'`, () => {
    const fixture = TestBed.createComponent(receiversprofileeditPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("Edit Receiver's Profile");
  });

  it("should check label name to be Edit Receiver's Profile", () => {
    let labelName = fixture.debugElement.query(By.css("#edit-receiver-profile"));
    expect(labelName.nativeElement.textContent.trim()).toBe("Edit Receiver's Profile");
  });

  it('should check label name to be Phone Number', () => {
    let labelName = fixture.debugElement.query(By.css("#phone-number"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Phone Number');
  });

  it('check phone number pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#phone-number-val'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value).toMatch("[+][0-9]+");
  });

  it('check phone number length', () => {
    const divDescription = fixture.debugElement.query(By.css('#phone-number-val'));
    divDescription.nativeElement.value = '+19991114444';
    expect(divDescription.nativeElement.value.length).toBeGreaterThan(10);
  });

  it('should check label name to be First Name', () => {
    let labelName = fixture.debugElement.query(By.css("#first-name"));
    expect(labelName.nativeElement.textContent.trim()).toBe('First Name');
  });

  it('check first name pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#first-name-val'));
    divDescription.nativeElement.value = 'Eric';
    expect(comp.validateName(divDescription.nativeElement.value)).toBe(true);
  });

  it('check first name length', () => {
    const divDescription = fixture.debugElement.query(By.css('#first-name-val'));
    divDescription.nativeElement.value = 'Eric';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(45);
  });

  it('should check label name to be Last Name', () => {
    let labelName = fixture.debugElement.query(By.css("#last-name"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Last Name');
  });

  it('check last name pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#last-name-val'));
    divDescription.nativeElement.value = 'Thomson';
    expect(comp.validateName(divDescription.nativeElement.value)).toBe(true);
  });

  it('check last name length', () => {
    const divDescription = fixture.debugElement.query(By.css('#last-name-val'));
    divDescription.nativeElement.value = 'Thomson';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(45);
  });
  
  it('should check label name to be Middle Name', () => {
    let labelName = fixture.debugElement.query(By.css("#middle-name"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Middle Name');
  });

  it('check middle name pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#middle-name-val'));
    divDescription.nativeElement.value = 'Thomson';
    expect(comp.validateName(divDescription.nativeElement.value)).toBe(true);
  });

  it('check middle name length', () => {
    const divDescription = fixture.debugElement.query(By.css('#middle-name-val'));
    divDescription.nativeElement.value = 'Thomson';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(45);
  });

  it('should check label name to be Email', () => {
    let labelName = fixture.debugElement.query(By.css("#email-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Email');
  });
  
  
  it('check email pattern', () => {
    const divDescription = fixture.debugElement.query(By.css('#email-val'));
    divDescription.nativeElement.value = 'eric.thomson@gmail.com';
    expect(comp.validateEmail(divDescription.nativeElement.value)).toBe(true);
  });

  it('check email length', () => {
    const divDescription = fixture.debugElement.query(By.css('#email-val'));
    divDescription.nativeElement.value = 'eric.thomson@gmail.com';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(65);
  }); 

  it('should check label name to be Address Line 1', () => {
    let labelName = fixture.debugElement.query(By.css("#addline1"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Address Line 1');
  });

  it('check address line 1 length', () => {
    const divDescription = fixture.debugElement.query(By.css('#addres1-val'));
    divDescription.nativeElement.value = 'address line 1';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(45);
  }); 

  it('should check label name to be Address Line 2', () => {
    let labelName = fixture.debugElement.query(By.css("#addline2"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Address Line 2');
  });

  it('check address line 2 length', () => {
    const divDescription = fixture.debugElement.query(By.css('#addres2-val'));
    divDescription.nativeElement.value = 'address line 2';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(45);
  });

  it('should check label name to be Country', () => {
    let labelName = fixture.debugElement.query(By.css("#country-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Country');
  });

  it('check country length', () => {
    const divDescription = fixture.debugElement.query(By.css('#country-val'));
    divDescription.nativeElement.value = 'Mexico';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(45);
  });

  it('should check label name to be State', () => {
    let labelName = fixture.debugElement.query(By.css("#state-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('State');
  });

  it('check state length', () => {
    const divDescription = fixture.debugElement.query(By.css('#state-val'));
    divDescription.nativeElement.value = 'Corona';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(45);
  });

  it('should check label name to be City/Town', () => {
    let labelName = fixture.debugElement.query(By.css("#city-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('City/Town');
  });

  it('check city length', () => {
    const divDescription = fixture.debugElement.query(By.css('#city-val'));
    divDescription.nativeElement.value = 'standalone';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(45);
  });

  it('should check label name to be Zip Code', () => {
    let labelName = fixture.debugElement.query(By.css("#zipcode-lbl"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Zip Code');
  });

  it('check zipcode length', () => {
    const divDescription = fixture.debugElement.query(By.css('#zip-val'));
    divDescription.nativeElement.value = '5892';
    expect(divDescription.nativeElement.value.length).toBeLessThanOrEqual(10);
  });

  it('should check button name to be Update', () => {
    let labelName = fixture.debugElement.query(By.css("#update-receiver-profile"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Update');
  });


  });