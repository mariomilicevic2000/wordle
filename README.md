# Wordle

Ovo je klon popularne igre New York Timesa, Wordle.

## Pravila igre

Ova igra ima jednostavna pravila:

- Poanta je pogoditi ispravnu riječ, moguće riječi su sve riječi iz engleskog jezika od 5 slova.
- Igrač ima maksimalno 6 šansi da pogodi ispravnu riječ.
- Metode unosa teksta su pomoću fizičke i virtualne tipkovnice.
- Virtualna tipkovnica ima dvostruku ulogu: uz mogućnost unosa, prikazuje i povratne informacije o slovima u upisanoj riječi.
- Nakon što korisnik upiše riječ i pritisne enter, igrica prelazi u novi red i korisniku daje povratnu informaciju.
- Postoje četiri moguća stanja za svako slovo:
  - Kada slovo još nije iskorišteno u pokušaju (bijelo).
  - Kada slovo postoji u riječi i iskorišteno je na točnom mjestu (zeleno).
  - Kada slovo postoji u riječi ali ne na mjestu na kojem je upisano (narančasto/žuto).
  - Kada slovo ne postoji u riječi (sivo/crveno).
- Igra traje dok korisnik ne pogodi riječ, dok ne iskoristi 6 pokušaja ili dok ne odustane.

## Tehnologije

- React + TypeScript
- TailwindCSS
- Vite + SWC za build i razvoj
- React Router za navigaciju
- localStorage za pohranu podataka

## Statistika i analiza

Nakon svake partije korisnik ima izbor ući u modul za analizu koji prikuplja podatke o prethodnoj partiji, ali i prosjecima koji su dostupni iz lokalne memorije. Neke od statistika koje su dostupne korisniku su:

- Ukupan broj partija
- Broj dobijenih/izgubljenih partija
- Stopa pobjede
- Prosječni broj pokušaja za pobjedu
- Prosječno vrijeme za pobjedu

U nastavku, korisnik ima priliku analizirati svoje pokušaje iz prethodne partije na strukturiraniji način:

- Kroz svaki pokušaj, sustav analizira koliko riječi od ukupnog broja svih riječi je korisnik eliminirao.
- U budućnosti biti će implementirana funkcionalnost koja korisniku daje kvantitativni uvid u kvalitetu njegovog trenutnog pokušaja kroz frekvencijsku analizu, broj eliminiranih opcija i analizu entropije.

## Budući planovi

- Refaktorirati kod da bi se postigla bolja brzina izvođenja, smanjiti nepotrebne rendere, bolje strukturirati state.
- Implementirati "guess hotness" ocjenu koja korisniku u analizi daje bolji uvid u kvalitetu svakog pokušaja.
- Naprednija vizualizacija statističkih podataka koristeći Recharts.
- Leaderboard.
- Tamni mod.
- Error management
- Smanjiti broj kandidata za traženu riječ jer u trenutnom datasetu ima jako puno nepoznatih riječi
