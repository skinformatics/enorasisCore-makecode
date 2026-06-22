# enorasisCore — MakeCode Extension (Φάση 1: BLE μόνο)

Λήψη **ετικετών κλάσης AI** από την πλατφόρμα [enorasisCore](https://enorasiscore.eu) στο BBC **micro:bit v2** — χωρίς copy-paste JavaScript.

**Φάση 2 (αργότερα):** blocks για συγκεκριμένο motor shield — όχι σε αυτή την έκδοση.

---

## Εγκατάσταση στο MakeCode (public — για τάξη)

1. Άνοιξε [makecode.microbit.org](https://makecode.microbit.org/)
2. **New Project**
3. ⚙️ **Extensions** → επικόλλησε URL:

```
https://github.com/skinformatics/enorasisCore-makecode
```

4. Επίλεξε την κάρτα **enorasis-core** / **enorasisCore**
5. Νέα κατηγορία blocks **enorasisCore** αριστερά

**Δεν χρειάζεται** GitHub login — το repo είναι public.

**Πηγή ανάπτυξης (private monorepo):** `cursor_enorasisCore/makecode-extension` — συγχρονίζεται στο public repo.

---

## Εγκατάσταση (private monorepo — μόνο developers)

```
https://github.com/skinformatics/cursor_enorasisCore/makecode-extension
```

Απαιτεί **Sign in to GitHub** στο MakeCode.

**Σημείωση:** Το extension ενεργοποιεί Bluetooth αυτόματα (`bluetooth` dependency). Δεν χρειάζεται ξεχωριστό «Bluetooth services» — αλλά αν το έχεις ήδη, δεν πειράζει.

---

## macOS + Chrome (υποχρεωτικό)

⚙️ **Project Settings** → **No Pairing Required** → **Save** → ξανά **Download** `.hex`

Χωρίς αυτό, το *Connect BBC micro:bit* από enorasisCore δεν συνδέεται σε Mac.

---

## Blocks (Φάση 1)

| Block | Ρόλος |
|-------|--------|
| **start enorasisCore BLE** | `bluetooth.startUartService()` + εικονίδιο □ έτοιμο |
| **on enorasisCore connected** | Σύνδεση από browser → ✓ |
| **on enorasisCore disconnected** | Αποσύνδεση → ✗ |
| **on enorasisCore class received** | Οποιαδήποτε κλάση έφτασε |
| **on enorasisCore class … received** | Συγκεκριμένη κλάση (π.χ. `kokkino`) |
| **last enorasisCore class** | String τελευταίας κλάσης |
| **enorasisCore class is …** | Έλεγχος ονόματος |

---

## Παράδειγμα — Basic tutorial (3 χρώματα)

Αντί για paste JavaScript, blocks:

```
on start
  start enorasisCore BLE

on enorasisCore connected
  (κενό ή δική σου ενέργεια)

on enorasisCore class kokkino received
  pins servo write pin P0 to 0
  basic show icon Heart

on enorasisCore class prasino received
  pins servo write pin P0 to 90
  basic show icon Happy

on enorasisCore class mple received
  pins servo write pin P0 to 180
  basic show icon Butterfly
```

Τα ονόματα κλάσεων πρέπει να **ταιριάζουν ακριβώς** με το Train στο enorasisCore.

---

## Παράδειγμα — forever loop (εναλλακτικό)

```
on start
  start enorasisCore BLE

on enorasisCore class received
  if enorasisCore class is go then
    (ενέργεια)
```

---

## Πρωτόκολλο (μην αλλάξεις)

- Nordic UART service (ίδιο με enorasisCore browser)
- Μήνυμα = **όνομα κλάσης** + **newline** (`\n`)
- Σύνδεση μόνο από **enorasisCore** στο Chrome/Edge (Web Bluetooth)

---

## Δοκιμή checklist

- [ ] Flash hex με extension
- [ ] Train 2–3 κλάσεις στο enorasisCore
- [ ] Connect micro:bit από browser
- [ ] Test → η κλάση ενεργοποιεί το σωστό block
- [ ] macOS: No Pairing Required verified

---

## Αρχεία

| Αρχείο | Περιεχόμενο |
|--------|-------------|
| `pxt.json` | metadata + bluetooth enabled |
| `enorasisCore.ts` | blocks |
| `_locales/` | EL / EN labels |

Μελέτη σχεδιασμού: `docs/MAKECODE-EXTENSION-STUDY.md`

---

## Άδεια

MIT — enorasisCore / skinformatics
