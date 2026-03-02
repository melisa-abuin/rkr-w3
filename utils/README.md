# Utils

This folder contains a collection of helper functions used throughout the project.

Below is a list of all available utilities:

### 📊 Calculations

- `calculateBestTimeByDifficulty`
- `calculateCompletedChallenges`
- `calculateSaveDeathRatio`
- `calculateTotals`
- `calculateWinRate`
- `getKibbleRewardMessage`

### 📥 Data Fetching

- `fetchData`
- `getBaseUrlFromHeaders`

### 📥 Data download

- `downloadBlobFile`

### 🏆 Data Analysis

- `findTopPlayersByInsertion`
- `findTopPlayersByFullSort`

### 🧩 Data Formatting

- `formatComparePlayer`
- `formatDateToLocale`
- `formatGameAwards`
- `formatKeyToWord`
- `formatRoundsData`
- `formatSaveDataFile`
- `formatTournamentPlayers`
- `hexToRgba`

### 🔢 Sorting & Filtering

- `getSortConditionByKey`

### 📅 Time Helpers

- `getTimeAgoFromToday`

### 🧠 Type Guards

- `isRoundKey`
- `isTimeKey`

### 🔄 Data Validation

- `playerDataOutdated`
- `removeBlacklistedPlayers`

### ⏱ Time Formatting

- `formatSecondsAsTime`

### 🧼 Key Transforms

- `transformKeysToCamelCase`

### 🌐 URL Helpers

- `getBaseUrlFromHeaders`: Builds the request base URL from server headers, with a stage fallback to `https://rkr-w3.vercel.app`.

### 🏁 Tournament Helpers

- `formatTournamentPlayers`: Normalizes tournament players by mapping game `total_time`, calculating player `totalTime`, formatting battletags, and sorting by fastest total time.

---

> 📌 Detailed descriptions and usage examples coming soon.
