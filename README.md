# Noxur – Shopify-tema

Mörkt lyxtema för klockbutik. Online Store 2.0, alla sektioner redigerbara i temaredigeraren.

## Innehåll
- **Startsida:** hero med klocka (lutar efter musen, scrollrörelse, bokstäver som vecklas ut), löpband, utvald kollektion med filter per produkttyp, Veckans ur (roterar vid scroll), Om oss, nyhetsbrev.
- **Sidor:** produkt (galleri, varianter, lägg i korg utan sidladdning, Klarna-text via `payment_terms`), kollektion (sortering, sidnumrering), korg, sök, sidor, 404, alla kollektioner, lösenordssida ("öppnar snart") och presentkort.

## Koppla till GitHub och Shopify
1. Skapa ett tomt repo på GitHub, t.ex. `noxur-theme`.
2. Packa upp zippen, och kör sedan i mappen:
   ```
   git init
   git add .
   git commit -m "Noxur tema v1"
   git branch -M main
   git remote add origin git@github.com:DITT-KONTO/noxur-theme.git
   git push -u origin main
   ```
3. I Shopify: **Onlinebutik → Teman → Lägg till tema → Anslut från GitHub** → välj repo och gren `main`.
4. Publicera temat. Från och med nu uppdateras butiken när du pushar, och ändringar i temaredigeraren committas tillbaka till repot.

Alternativ utan GitHub: **Lägg till tema → Ladda upp zip-fil**.

## Ställ in efter uppladdning
1. **Navigering:** skapa menyerna `main-menu` (Kollektion, Veckans ur, Om oss) och `footer` (Frakt, Returer, Kontakt, Villkor).
2. **Produkter:** sätt **Produkttyp** på varje klocka (Kronograf, Automatisk, Klassisk …). Filtren på startsidan byggs av den.
3. **Taggen `nyhet`** på en produkt ger etiketten "Nyhet" på kortet.
4. **Startsidan i temaredigeraren:**
   - Hero: ladda upp en klockbild som PNG med genomskinlig bakgrund. Välj textstil.
   - Utvald kollektion: välj kollektion.
   - Veckans ur: välj produkt.
5. **Temainställningar → Färger** för bakgrund, text och accent.

## Checklista innan du börjar sälja
- [ ] Domän kopplad (noxur.se) under Inställningar → Domäner
- [ ] Betalningar: Shopify Payments, Klarna och Swish aktiverade
- [ ] Moms: Sverige 25 %, priser inkl. moms
- [ ] Frakt: zoner och priser, ev. gräns för fri frakt
- [ ] Juridiska sidor (Inställningar → Policyer): köpvillkor, integritetspolicy, returpolicy med 14 dagars ångerrätt, fraktpolicy. Företagsuppgifter (namn, org.nr, adress, e-post) ska synas.
- [ ] Cookie-banner (Shopifys egen kundsekretess-banner räcker)
- [ ] Leverantörsappen installerad och ordrar skickas automatiskt
- [ ] Kontrollera leverantörens returvillkor mot din 14-dagars ångerrätt
- [ ] Gör en testorder hela vägen till leverans
- [ ] Ta bort lösenordsskyddet när allt är klart

## Bra att veta
- Scrollanimationerna fungerar i Chrome, Edge och Safari 26+. I äldre webbläsare visas allt men utan just scrollrörelsen.
- Alla rörelser stängs av för besökare som valt "minska rörelse" i sitt system.
- Standardbilden `assets/hero-watch.png` är en exempelbild. Byt den via temaredigeraren.
