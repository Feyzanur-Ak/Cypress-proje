describe('Login Form Test', () => {
  beforeEach(() => {
    // Test başlatıldığında login sayfasına git
    cy.visit('http://localhost:5173/');  // Ana sayfaya git
  });

  it('should submit the form successfully when all fields are valid', () => {
    // Email alanını doldur
    cy.get('input[name="email"]').type('user@example.com');

    // Password alanını doldur
    cy.get('input[name="password"]').type('Password123!');

    // Terms checkbox'ını işaretle
    cy.get('input[name="terms"]').check();

    // Kaydet butonunun aktif olduğunu kontrol et
    cy.get('button').should('not.be.disabled');

    // Kaydet butonuna tıkla
    cy.get('button').click();

    // Başarıyla giriş yapıldığına dair mesajı kontrol et
    cy.url().should('include', '/success');  // Başarı sayfasına yönlendirilip yönlendirilmediğini kontrol et
    cy.contains('Başarıyla giriş yaptınız!'); // Başarı mesajının görünüp görünmediğini kontrol et
  });

  it('should show an error if email or password is incorrect', () => {
    // Geçersiz bir email ve şifre gir
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('WrongPassword123!');

    // Terms checkbox'ını işaretle
    cy.get('input[name="terms"]').check();

    // Kaydet butonunun aktif olduğunu kontrol et
    cy.get('button').should('not.be.disabled');

    // Kaydet butonuna tıkla
    cy.get('button').click();

    // Hata sayfasına yönlendirilip yönlendirilmediğini kontrol et
    cy.url().should('include', '/error');  // Hata sayfasına yönlendirilip yönlendirilmediğini kontrol et
    cy.contains('Boyle bir kullanıcı yok!'); // Hata mesajı kontrolü
  });

  it('should disable the submit button if email or password is invalid', () => {
    // Geçersiz bir email gir (örn. bozuk format)
    cy.get('input[name="email"]').type('invalidemail.com');
    
    // Kaydet butonunun devre dışı olduğunu kontrol et
    cy.get('button').should('be.disabled');
    
    // Geçerli bir email gir
    cy.get('input[name="email"]').clear().type('user@example.com');
    
    // Geçersiz bir şifre gir
    cy.get('input[name="password"]').type('123');
    
    // Kaydet butonunun devre dışı olduğunu kontrol et
    cy.get('button').should('be.disabled');

    // Geçerli bir şifre gir
    cy.get('input[name="password"]').clear().type('Password123!');

    // Kaydet butonunun aktif olduğunu kontrol et
    cy.get('button').should('not.be.disabled');
  });

  it('should show error if terms checkbox is not checked', () => {
    // Geçerli bir email ve şifre gir
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('Password123!');

    // Terms checkbox'ını işaretlemeden Kaydet butonuna tıkla
    cy.get('button').should('be.disabled');  // Butonun devre dışı olduğunu kontrol et

    // Terms checkbox'ını işaretle
    cy.get('input[name="terms"]').check();

    // Kaydet butonunun aktif olduğunu kontrol et
    cy.get('button').should('not.be.disabled');
  });

  it('should show error if email and confirm email do not match', () => {
    // Email ve confirm email alanlarını doldur
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="confirmEmail"]').type('other@example.com');

    // Kaydet butonunun devre dışı olduğunu kontrol et
    cy.get('button').should('be.disabled');

    // Hata mesajının göründüğünü kontrol et
    cy.contains('Email ve Confirm Email alanları eşleşmiyor.');  // Email eşleşmediğinde hata mesajı
  });
});
