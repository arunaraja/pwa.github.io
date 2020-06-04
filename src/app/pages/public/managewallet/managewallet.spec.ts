import { TestBed, async ,ComponentFixture, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { managewalletPage } from './managewallet.page';
import { DebugElement } from '@angular/core';
import {  By } from '@angular/platform-browser';
import {AuthService} from './../../../services/api/api.service'
import {ShowerrormessageComponent} from './../../../services/component/show-error';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('managewalletPage', () => {
  let comp: managewalletPage;
  let fixture: ComponentFixture<managewalletPage>;
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
        managewalletPage,
        ShowerrormessageComponent
      ],
      providers: [
        HttpClient,
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(managewalletPage);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      // el = de.nativeElement;
      service = TestBed.get(AuthService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(managewalletPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Change Password'`, () => {
    const fixture = TestBed.createComponent(managewalletPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Manage Wallet');
  });

  it('should check button name to be Wallet', () => {
    let labelName = fixture.debugElement.query(By.css("#walletBtn"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Wallet');
  });

  it('should check button name to be Add Account', () => {
    let labelName = fixture.debugElement.query(By.css("#addAccount"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Add Account');
  });

  it('should check label name to be Bank Accounts', () => {
    let labelName = fixture.debugElement.query(By.css("#bankAccount"));
    expect(labelName.nativeElement.textContent.trim()).toBe('Bank Accounts');
  });

});
