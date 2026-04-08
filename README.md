<!-- FRENCH VERSION -->

# 🃏 Éditeur de Carte de Visite — Aperçu Interactif

Un éditeur de carte de visite léger et interactif, développé en HTML/CSS/JavaScript pur.  
Personnalisez chaque élément, prévisualisez les modifications en temps réel et imprimez directement depuis le navigateur.

> 💻 **Conçu pour une utilisation desktop.** L'interface de l'éditeur est optimisée pour les grands écrans.

---

## 🚀 Démarrage rapide

Ouvrez simplement `index.html` dans un navigateur moderne.  
**Aucune installation. Aucun serveur. Aucun framework.**

---

## 📁 Structure du projet

```
├── index.html          ← Fichier principal : mise en page de la carte + panneau éditeur
├── css/
│   ├── main.css        ← Imports CSS centralisés
│   ├── base.css        ← Reset, typographie, boutons globaux
│   ├── layout.css      ← Disposition générale (panneau gauche / aperçu droit)
│   ├── panel.css       ← Styles du panneau éditeur
│   ├── card.css        ← Styles des cartes (recto & verso)
│   └── print.css       ← Règles @media print
└── js/
    ├── main.js         ← Point d'entrée, chargement des modules, écoute des inputs
    ├── render.js       ← Fonction de mise à jour visuelle (couleurs, dégradés, textes, QR)
    ├── history.js      ← Pile undo/redo + persistance localStorage
    ├── drag.js         ← Drag & drop des éléments de la carte
    └── media.js        ← Gestion de l'upload et du redimensionnement des logos
```

---

## ✏️ Fonctionnalités

### Édition de contenu

- Tous les champs texte sont modifiables : nom de l'entreprise, nom complet, intitulé de poste, coordonnées, accroche, tags
- **Prévisualisation en temps réel** — la carte se met à jour instantanément à chaque frappe

### Gestion des images

- Upload d'un **petit logo** (face recto, sidebar gauche)
- Upload d'un **grand logo** (face verso, centré)
- Redimensionnement des logos via un slider
- **Drag & drop** des éléments pour les repositionner librement sur la carte

### Couleurs & dégradés

- **Sélecteur de couleur individuel** pour chaque élément
- **Double sélecteur** (couleur 1 + couleur 2) pour activer un dégradé
- Bouton ⇌ pour basculer le mode dégradé ON/OFF
- Applicable sur : textes, fonds, bordures, icônes, tags, séparateurs

### QR Code

- Champ URL modifiable → **QR Code généré automatiquement** sur la face recto
- Propulsé par [qrcodejs](https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js) via CDN

### Historique

- ↩ **Annuler** — revenir à l'état précédent
- ↪ **Rétablir** — avancer dans l'historique
- 🗑 **Reset** — effacer les données sauvegardées et recharger les valeurs par défaut

### Persistance

- Sauvegarde automatique dans le **localStorage** (debounce à 600ms)
- L'état est automatiquement restauré à la prochaine ouverture

### Export & Impression

- Impression via le navigateur (`window.print()`)
- Mise en page print optimisée : page A4, recto + verso côte à côte, panneau éditeur masqué

---

## 🎨 Palette de couleurs par défaut

| Rôle            | Couleur   |
| --------------- | --------- |
| Accent rose     | `#c97b6b` |
| Accent vert     | `#7bb88e` |
| Accent bleu     | `#89bdd3` |
| Fond recto      | `#141414` |
| Fond verso      | `#0e0e0e` |
| Texte principal | `#e8e8e8` |
| Icônes          | `#89bdd3` |
| Tags verso      | `#7bb88e` |

### Dégradé signature

```
#c97b6b → #7bb88e → #89bdd3
```

Utilisé sur les séparateurs, bordures, mises en valeur textuelles et éléments tags.

---

## 📐 Format de la carte

| Propriété            | Valeur            |
| -------------------- | ----------------- |
| Dimensions physiques | 85 × 55 mm        |
| Orientation          | Paysage           |
| Équivalent écran     | ≈ 321 × 208 px    |
| Faces                | 2 (Recto + Verso) |

---

## 🔄 Fonctionnement

```
L'utilisateur modifie un champ
          ↓
Événement "input" capté (main.js)
          ↓
update() appelé (render.js)
          ↓
Aperçu de la carte mis à jour en temps réel
          ↓
save() appelé après 600ms (debounce)
          ↓
État stocké dans localStorage + pile d'historique
```

---

## 🛠️ Stack technique

| Critère           | Choix                                 |
| ----------------- | ------------------------------------- |
| Langages          | HTML5 / CSS3 / JavaScript vanilla     |
| Librairie externe | qrcodejs (CDN)                        |
| Framework         | Aucun                                 |
| Serveur           | Aucun — ouvrir index.html directement |

---

## ⚙️ Principes de conception

| Principe          | Application                                 |
| ----------------- | ------------------------------------------- |
| Simplicité        | Vanilla JS uniquement, modules minimalistes |
| Zéro installation | Un seul index.html suffit à lancer l'outil  |
| Offline-ready     | Seule dépendance externe : qrcodejs CDN     |
| Extensible        | Architecture modulaire JS/CSS               |
| UX fluide         | Debounce, localStorage, undo/redo           |

---

## 📄 Licence

Ce projet est libre d'utilisation, à titre personnel comme professionnel.  
Adaptez-le librement à votre propre identité visuelle et vos coordonnées.

---

## 👩‍💻 Auteure

Développé par **CND · Web Is Yours** © 2026

| Canal        | Lien                                                           |
| ------------ | -------------------------------------------------------------- |
| ✉ Email      | [cndweb37@gmail.com](mailto:cndweb37@gmail.com)                |
| 🌐 Portfolio | [portfolio-cnd.netlify.app](https://portfolio-cnd.netlify.app) |
| 🐙 GitHub    | [github.com/Poca23](https://github.com/Poca23)                 |

---

---

<!-- ENGLISH VERSION -->

# 🃏 Business Card Editor — Interactive Preview Tool

A lightweight, interactive business card editor built with pure HTML/CSS/JavaScript.  
Customize every element, preview changes in real time, and print your card directly from the browser.

> 💻 **Designed for desktop use.** The editor interface is optimized for large screens.

---

## 🚀 Getting Started

Simply open `index.html` in any modern browser.  
**No installation. No server. No framework.**

---

## 📁 Project Structure

```
├── index.html          ← Main file: card layout + editor panel
├── css/
│   ├── main.css        ← Central CSS imports
│   ├── base.css        ← Reset, typography, global buttons
│   ├── layout.css      ← General layout (left panel / right preview)
│   ├── panel.css       ← Editor panel styles
│   ├── card.css        ← Card styles (front & back)
│   └── print.css       ← Print media rules
└── js/
    ├── main.js         ← Entry point, module loader, input listeners
    ├── render.js       ← Visual update function (colors, gradients, text, QR)
    ├── history.js      ← Undo/redo stack + localStorage persistence
    ├── drag.js         ← Drag & drop for card elements
    └── media.js        ← Logo upload and resize handling
```

---

## ✏️ Features

### Content Editing

- All text fields are editable: company name, full name, job title, contact details, tagline, tags
- **Live preview** — the card updates instantly as you type

### Image Management

- Upload a **small logo** (front face, left sidebar)
- Upload a **large logo** (back face, centered)
- Resize logos via a slider
- **Drag & drop** card elements to reposition them freely

### Colors & Gradients

- Individual **color picker** for each element
- **Dual color picker** (color 1 + color 2) to enable gradients
- Toggle ⇌ button to switch gradient mode ON/OFF
- Applies to: text, backgrounds, borders, icons, tags, separators

### QR Code

- Editable URL field → **auto-generated QR Code** on the front face
- Powered by [qrcodejs](https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js) via CDN

### History

- ↩ **Undo** — go back to the previous state
- ↪ **Redo** — move forward in history
- 🗑 **Reset** — clear saved data and reload defaults

### Persistence

- Auto-save to **localStorage** (debounced at 600ms)
- State is automatically restored on next open

### Export & Print

- Print via browser (`window.print()`)
- Optimized print layout: A4 page, front + back side by side, editor panel hidden

---

## 🎨 Default Color Palette

| Role             | Color     |
| ---------------- | --------- |
| Rose accent      | `#c97b6b` |
| Green accent     | `#7bb88e` |
| Blue accent      | `#89bdd3` |
| Front background | `#141414` |
| Back background  | `#0e0e0e` |
| Main text        | `#e8e8e8` |
| Icons            | `#89bdd3` |
| Back tags        | `#7bb88e` |

### Signature Gradient

```
#c97b6b → #7bb88e → #89bdd3
```

Used on separators, borders, text highlights and tag elements.

---

## 📐 Card Format

| Property          | Value            |
| ----------------- | ---------------- |
| Physical size     | 85 × 55 mm       |
| Orientation       | Landscape        |
| Screen equivalent | ≈ 321 × 208 px   |
| Faces             | 2 (Front + Back) |

---

## 🔄 How It Works

```
User edits a field
      ↓
"input" event captured (main.js)
      ↓
update() called (render.js)
      ↓
Card preview updated in real time
      ↓
save() called after 600ms debounce
      ↓
State stored in localStorage + history stack
```

---

## 🛠️ Tech Stack

| Criteria         | Choice                          |
| ---------------- | ------------------------------- |
| Languages        | HTML5 / CSS3 / Vanilla JS       |
| External library | qrcodejs (CDN)                  |
| Framework        | None                            |
| Server           | None — open index.html directly |

---

## ⚙️ Design Principles

| Principle      | Implementation                           |
| -------------- | ---------------------------------------- |
| Keep it simple | Vanilla JS only, minimal modules         |
| Zero install   | A single index.html is enough to run     |
| Offline-ready  | Only external dependency is qrcodejs CDN |
| Extensible     | Modular JS/CSS architecture              |
| Smooth UX      | Debounce, localStorage, undo/redo        |

---

## 📄 License

This project is free to use for personal and professional purposes.  
Feel free to adapt it to your own branding and contact details.

---

## 👩‍💻 Author

Developed by **CND · Web Is Yours** © 2026

| Channel      | Link                                                           |
| ------------ | -------------------------------------------------------------- |
| ✉ Email      | [cndweb37@gmail.com](mailto:cndweb37@gmail.com)                |
| 🌐 Portfolio | [portfolio-cnd.netlify.app](https://portfolio-cnd.netlify.app) |
| 🐙 GitHub    | [github.com/Poca23](https://github.com/Poca23)                 |
