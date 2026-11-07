# Git Commit Message Guidelines (Nederlands)

Commit messages moeten te allen tijde haarscherp, specifiek en informatief zijn. Generieke of vage omschrijvingen zijn niet toegestaan.
Als **harde regel** geldt dat de voertaal van alle commit messages (onderwerp en body) **ALTIJD het Nederlands** is.

### 1. Formaat
```text
<type>(<specifieke-scope>): <gebiedende wijs omschrijving van de kernwijziging in het Nederlands>

[Verplichte body bij wijzigingen met meer dan 1 bestand of bij logica-aanpassingen]
- Waarom: <concrete aanleiding, bug of doel>
- Wat: <specifieke functies, interfaces, componenten of bestanden die zijn gewijzigd>
- Impact: <technische of visuele consequentie, bijv. type-safety, Live Preview binding, layout geometrie>
```

### 2. Typen & Specifieke Scopes
- `feat`: Nieuwe functionaliteit of route (bijv. `(portfolio-detail)`, `(cookie-consent)`, `(hero-banner)`)
- `fix`: Bugfix of runtime/styling correctie (bijv. `(timeline-node)`, `(preview-binding)`, `(scrollbar-padding)`)
- `refactor`: Structuur- of architectuurwijziging zonder feature-wijziging (bijv. `(analytics-utils)`, `(ui-primitives)`)
- `style`: Visuele afwerking of CSS conform design system (bijv. `(button-variants)`, `(dark-mode)`)
- `docs`: Documentatie of agent instructies (bijv. `(agents-md)`, `(quality-gate)`)
- `chore`: Tooling, configs, dependencies (bijv. `(next-config)`, `(eslint)`, `(deps)`)

### 3. Strikte Kwaliteitseisen
1. **Geen vage omschrijvingen**: Gebruik nooit generieke termen zoals "update code", "fix bug", "changes", "tweaks" of "refactor components".
2. **Specifieke Scopes**: Gebruik de meest nauwe scope (`(portfolio-detail)` i.p.v. `(app)` of `(components)`).
3. **Benoem het 'Wat' én het 'Waarom'**: Een commit message moet over 6 maanden nog exact duidelijk maken welke ontwerpkeuze is gemaakt.
4. **Voertaal ALTIJD Nederlands**: Zowel de onderwerpregel als de body zijn 100% in het Nederlands geschreven.

### 4. Voorbeelden (Goed vs. Fout)
| Fout (te generiek / Engels) ❌ | Goed (specifiek, contextrijk & Nederlands) ✅ |
| :--- | :--- |
| `feat(detail): add page` | `feat(portfolio-detail): voeg dynamische /portfolio/[slug] pagina met Live Preview toe` |
| `fix(ui): fix button` | `fix(cookie-consent): harmoniseer knoppen via Button UI primitive en verwijder inline overrides` |
| `refactor(components): reorder folders` | `refactor(analytics): centraliseer page_view payload logica in analytics-utils helper` |
| `style(timeline): update position` | `style(timeline): centreer bolletje exact op de rasterlijn via wiskundige -left-[11px] offset` |
| `chore: update dependencies` | `chore(deps): upgrade @headlessui/react naar v2.2.10 en migreer Description alias` |
