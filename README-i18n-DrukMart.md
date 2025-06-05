# 🌐 DrukMart: Multilingual Search & Category Filter Setup (EN + Dzongkha 🇧🇹)

This guide explains how to fully support Dzongkha and English language switching in your **DrukMart** storefront using `next-i18next`, search filters, and Directus CMS.

---

## ✅ Features Implemented

- 🌍 Language toggle (🇬🇧 EN / 🇧🇹 DZ)
- 🧠 Auto-translated UI texts via `common.json`
- 🔎 Search box with category dropdown
- 📦 API-based product + category filtering
- 🔗 Directus integration with token-based queries

---

## 📁 File Setup Summary

### 1. i18n Configuration

- `next-i18next.config.js` – defines locales
- `next.config.js` – imports and activates i18n

### 2. Locales Directory

```
public/
└── locales/
    ├── en/
    │   └── common.json
    └── dz/
        └── common.json   ✅ includes Dzongkha category translations
```

### 3. Layout Wrapper

- `app/[locale]/layout.tsx` — enables locale-based rendering

/app/
├── [locale]/          ← locale-dynamic folder (e.g. /en, /dz)
│   ├── layout.tsx     ← wraps all pages with locale
│   ├── page.tsx       ← homepage for the locale
│   └── ...other routes
├── globals.css
├── favicon.ico
└── layout.tsx (optional global)


### 4. Header UI

- `components/Header.tsx` — includes:
  - Navigation links (translated)
  - Language toggle buttons
  - `SearchBox` component

### 5. Search Box

- `components/SearchBox.tsx` — includes:
  - Input field with translated placeholder
  - Dynamic dropdown loaded from `/api/categories`
  - Redirects to `/search?q=milk&category=groceries`

### 6. API Routes

- `pages/api/search.ts` — fetch products by name/category from Directus
- `pages/api/categories.ts` — fetch categories from Directus

### 7. Search Results Page

- `pages/search.tsx` — shows products with link to detail pages

---

## 🧪 Testing

1. Go to the site header → try switching 🇬🇧 ↔ 🇧🇹
2. Type a search query (e.g. milk)
3. Choose a category (e.g. dairy)
4. Submit → check filtered `/search` results

---

## 🔐 Requirements

- `.env.local` with:
```env
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
NEXT_PUBLIC_DIRECTUS_TOKEN=YOUR_STATIC_TOKEN
```

- Directus should have:
  - `products` with `name`, `slug`, `price`, `category`
  - `categories` with `name` field

---

## 📝 Notes

- You can extend `common.json` to include UI phrases, headers, blog terms etc.
- Dzongkha names are handled by `t(category.toLowerCase()) || category`
- You can style `<select>` for mobile UX polish

---

Built for 🇧🇹 DrukMart with full multilingual capabilities.