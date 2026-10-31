# Git Commit Message Standaarden (Nederlands)

Bij het aanmaken of voorstellen van git commits geldt als **harde regel** dat de voertaal van alle commit messages **ALTIJD het Nederlands** is.

### 1. Formaat
```text
<type>(<scope>): <omschrijving van de wijziging in gebiedende wijs in het Nederlands>

[Optionele body bij grotere of context-intensieve wijzigingen]
- Waarom: <concrete aanleiding, bug of doel>
- Wat: <specifieke functies, interfaces, componenten of bestanden die zijn gewijzigd>
- Impact: <technische of visuele consequentie, bijv. type-safety, preview binding, rendering>
```

### 2. Voertaal & Stijl
- **Taal**: Uitsluitend **Nederlands** voor zowel de onderwerpregel als de body. (Geen Engels).
- **Gebiedende wijs**: Gebruik werkwoorden in de stam/gebiedende wijs (bijv. "voeg toe", "repareer", "harmoniseer", "splits af", niet "toegevoegd" of "toegevoegde").
- **Kleine letters**: De omschrijving na de dubbelepunt begint met een kleine letter (tenzij het een eigennaam betreft).

### 3. Commit Types & Nederlandse Voorbeelden
- `feat`: Een nieuwe feature, route of functionaliteit
  - *Voorbeeld:* `feat(analytics): voeg headlessui cookie consent toast en consent mode v2 toe`
- `fix`: Een bugfix of correctie van een runtime/styling fout
  - *Voorbeeld:* `fix(timeline): centreer bolletjes exact op de verticale rasterlijn`
- `style`: Visuele styling, CSS-tweaks of formattering zonder logische impact
  - *Voorbeeld:* `style(ui): harmoniseer brand en secondary knopvarianten`
- `refactor`: Herstructurering van code zonder nieuwe features of bugfixes
  - *Voorbeeld:* `refactor(ui): splits toast component af naar centrale ui bibliotheek`
- `chore`: Tooling, dependencies, configuratie of onderhoud
  - *Voorbeeld:* `chore(deps): update headlessui package naar actuele versie`
- `docs`: Documentatie, agent-regels of richtlijnen
  - *Voorbeeld:* `docs(agents): leg nederlandse commit-standaard vast in regels`
- `test`: Toevoegen of aanpassen van tests

### 4. Structuur bij Grote Wijzigingen (Body)
Bij wijzigingen over meerdere bestanden is een beknopte body in het Nederlands verplicht met:
- `- Waarom:`
- `- Wat:`
- `- Impact:`
