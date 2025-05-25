# Operationssal Personalschema Webbapplikation

En webbaserad applikation för att planera och visualisera dagliga personalscheman för operationssalar. Byggd med Vite, React, TypeScript och Tailwind CSS. Allt gränssnitt på svenska.

---

## Funktioner & Användarflöde

### 1. Excel-importsystem
- Importera personaldata från Excel-filer (.xlsx)
- Tolka kolumner: Personal namn, Arbetstid, Kommentarer (administrativa uppgifter, möten, etc.)
- Omvandla importerad data till dragbara personalkort

### 2. Egna personalkort
- Manuell kortskapande: Lägg till tillfällig personal, studenter eller annan personal
- Fält: Namn, arbetstid, rolltyp (Temp/Vikarie, Student, Fast anställd)
- Snabbmallar: Fördefinierade mallar för vanliga vikariat
- Spara egna kort lokalt för återanvändning

### 3. Admin-gränssnitt (Planeringsvy)
- Sidopanel: Visar importerad + egen personal som dragbara kort
  - Namn, arbetstid, roll, kommentarer
  - Filter: Alla, Fast anställda, Vikarier, Studenter
- Huvudområde: Visar 3-5 operationssalar beroende på veckodag
  - Tisdag/Torsdag: 3 rum (OR 1-3)
  - Måndag/Onsdag/Fredag: 4-5 rum (OR 1-4/5)
- Drag & Drop: Dra personal från sidopanel till sal
- Salshantering: Redigera salnamn, rensa tilldelningar

### 4. Dashboard/Tavla
- Läs-vy: "Dagens Schema - [Datum]"
- Tydlig svensk text för väggmonterad skärm
- Visar varje "Operationssal X" med "Tilldelad Personal"
- Flikar för hela veckan: Personal kan se planeringen för valfri dag
- Automatisk uppdatering

### 5. Inställningar
- Salskonfiguration: Ställ in antal/namn på salar per veckodag

---

## Tekniska krav
- **Vite + React + TypeScript**
- **@dnd-kit/core** (drag & drop)
- **xlsx** (SheetJS för Excel-import)
- **react-router-dom** (routing)
- **Tailwind CSS** (styling)
- **localStorage** för all datalagring

---

## Datamodeller (TypeScript)

```ts
// Personal
{
  id: string,
  namn: string,
  arbetstid: string, // "07:00 - 15:00"
  roll: 'fast' | 'vikarie' | 'student' | 'annan',
  kommentarer: string,
  tilldeladSal: string | null,
  isCustom: boolean // true för manuellt skapade kort
}

// Operationssal
{
  id: string,
  namn: string, // "Sal 1", "Sal 2"
  tilldeladPersonal: Personal[]
}
```

---

## Projektstruktur

```
/src
  /components
    /Admin
      - StaffSidebar.tsx
      - RoomBoard.tsx
      - StaffCard.tsx
      - RoomCard.tsx
      - ExcelImport.tsx
      - CustomStaffModal.tsx
      - Filters.tsx
    /Dashboard
      - SchemaDisplay.tsx
    /Settings
      - RoomConfig.tsx
    /Common
      - Header.tsx
      - Button.tsx
      - Modal.tsx
  /hooks
    - useLocalStorage.ts
    - useStaff.ts
    - useRooms.ts
  /utils
    - excelParser.ts
    - dataExport.ts
    - dataImport.ts
  /types
    - index.ts
  /i18n
    - sv.ts
  /weekdays
    - Måndag.tsx
    - Tisdag.tsx
    - Onsdag.tsx
    - Torsdag.tsx
    - Fredag.tsx
    - Lördag.tsx
    - Söndag.tsx
  - App.tsx
  - main.tsx
  - index.css
/routes
  - Admin.tsx
  - Dashboard.tsx
  - Settings.tsx
```

---

## Svenska UI-element
- Knappar: "Importera Excel", "Skapa Personalvikarie", "Rensa Schema"
- Etiketter: "Arbetstid", "Kommentarer", "Tilldelningar"
- Filter: "Visa alla", "Fast anställda", "Vikarier", "Studenter"
- Salshuvuden: "Operationssal 1", "Operationssal 2"
- Statusmeddelanden: "Schema sparat", "Excel importerad"

---

## Lokala/offline-funktioner
- **localStorage**: Allt sparas lokalt
- **Offline-first**: Ingen nätverksuppkoppling krävs efter första laddning
- **Export/Import**: Säkerhetskopiera/återställ via JSON
- **Sessionsbevarande**: Behåller tillstånd vid omstart av webbläsare

---

## Dashboard-flikar för hela veckan
- Dashboarden ("Tavla") har flikar för varje veckodag (Måndag-Söndag)
- Personal kan enkelt växla och se planeringen för valfri dag
