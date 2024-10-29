import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

// URL dan data uji
const LOGIN_PAGE_URL = 'file:///C:/Users/HP/Downloads/PRAK_PPMPL-ppmpl_prak4/PRAK_PPMPL-ppmpl_prak4/test/login.html';
const VALID_USERNAME = 'testuser';
const VALID_PASSWORD = 'password123';
const INVALID_USERNAME = 'wrongUser';
const INVALID_PASSWORD = 'wrongPassword';

describe('UI Testing using Selenium', function () {
    this.timeout(30000); // Atur waktu timeout menjadi 30 detik untuk seluruh pengujian

    let driver;

    // Inisialisasi driver sebelum semua tes berjalan
    before(async function () {
        this.timeout(60000); // Meningkatkan timeout jika diperlukan
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('file:///C:/Users/HP/Downloads/PRAK_PPMPL-ppmpl_prak4/PRAK_PPMPL-ppmpl_prak4/test/login.html'); // Ganti dengan URL aplikasi Anda
    });

    // Tutup driver setelah semua tes selesai
    after(async function () {
        await driver.quit();
    });

    // Tes untuk memuat halaman login
    it('should load the login page', async function () {
        await driver.get(LOGIN_PAGE_URL);
        await driver.wait(until.titleIs('Login Page'), 15000);

        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    // Tes untuk mengisi username dan password
    it('should input username and password', async function () {
        const usernameField = await driver.wait(until.elementLocated(By.id('username')), 15000);
        const passwordField = await driver.wait(until.elementLocated(By.id('password')), 15000);

        await usernameField.sendKeys(VALID_USERNAME);
        await passwordField.sendKeys(VALID_PASSWORD);

        const usernameValue = await usernameField.getAttribute('value');
        const passwordValue = await passwordField.getAttribute('value');
        expect(usernameValue).to.equal(VALID_USERNAME);
        expect(passwordValue).to.equal(VALID_PASSWORD);
    });

    // Tes untuk mengklik tombol login
    it('should click the login button', async function () {
        const loginButton = await driver.wait(until.elementLocated(By.id('loginButton')), 15000);
        await loginButton.click();
    });

    // Tes untuk memverifikasi pesan error ketika login gagal
    it('should display an error message for invalid login', async function () {
        const usernameField = await driver.findElement(By.id('username'));
        const passwordField = await driver.findElement(By.id('password'));
        await usernameField.clear();
        await passwordField.clear();

        // Input data yang tidak valid
        await usernameField.sendKeys(INVALID_USERNAME);
        await passwordField.sendKeys(INVALID_PASSWORD);

        const loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();

        // Verifikasi tampilan pesan error
        const errorMessage = await driver.wait(until.elementLocated(By.id('errorMessage')), 15000);
        const isErrorDisplayed = await errorMessage.isDisplayed();
        expect(isErrorDisplayed).to.be.true;
    });

    // Tes untuk memasukkan data menggunakan CSS Selector dan XPath
    it('should input data using CSS Selector and XPath', async function () {
        const usernameField = await driver.findElement(By.css('#username'));
        await usernameField.clear();
        await usernameField.sendKeys(VALID_USERNAME);

        const passwordField = await driver.findElement(By.xpath('//*[@id="password"]'));
        await passwordField.clear();
        await passwordField.sendKeys(VALID_PASSWORD);
    });

    // Tes untuk memverifikasi visibilitas tombol login
    it('should verify the visibility of the login button', async function () {
        const loginButton = await driver.findElement(By.id('loginButton'));
        const isDisplayed = await loginButton.isDisplayed();
        expect(isDisplayed).to.be.true;
    });
});
