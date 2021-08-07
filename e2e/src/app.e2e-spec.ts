import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  it('should navigate to dashboard page', () => {
    browser.get('http://localhost:4200');
    expect(browser.getCurrentUrl()).toContain('dashboard');
    const login = element(by.id('login'));
    login.click();
  } );
  it('should navigate to login page', () => {
    expect(browser.getCurrentUrl()).toContain('login');
  });
  it('login successfully', () => {
    const username = element(by.id('un'));
    const password = element(by.id('pw'));
    username.sendKeys('krish@gmail.com');
    password.sendKeys('Krish@123');
    const button = element(by.id('btn'));
    button.click();
      });
  it('logout successfully', () => {
    const button = element(by.id('logout'));
    button.click();
    expect(browser.getCurrentUrl()).toContain('login');
    });
  // it('should navigate to dashboard page', () => {
  //   expect(browser.getCurrentUrl()).toContain('dashborad');
  //   const cat = element(by.id('vw'));
  //   cat.click();
  //   } );
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
