# enorasisCore — MakeCode Extension

> **Human vision for the BBC micro:bit v2.**  
> Train Artificial Intelligence in the browser. Your robot sees — and reacts.

[![enorasisCore](https://img.shields.io/badge/platform-enorasisCore.eu-blue)](https://enorasiscore.eu)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.txt)
[![micro:bit v2](https://img.shields.io/badge/micro:bit-v2-00ED00)](https://microbit.org/)
[![Tested](https://img.shields.io/badge/classroom-tested-success)](https://github.com/skinformatics/enorasisCore-makecode)

**Install URL:** `https://github.com/skinformatics/enorasisCore-makecode`

---

## In one sentence

This extension connects a **micro:bit** to **machine learning in the web browser**, so your board can **act on what a camera sees** — colours, shapes, arrows, objects you teach — without running heavy AI on the micro:bit itself.

---

## Why this matters — giving “eyes” to the micro:bit

Until now, a micro:bit could read buttons, tilt, or light — but **not recognise a red cup, a left arrow, or your face**. That kind of understanding is **human-like vision**, and it normally needs a powerful computer.

**enorasisCore** runs **Machine Learning** in Chrome/Edge: students collect photos, **Train** classes, and **Test** live from a phone or laptop camera.

**This extension is the bridge:** when the AI recognises something, it sends a short **class name** (e.g. `left`, `red`, `stop`) over **Bluetooth** to the micro:bit. Your MakeCode blocks turn that label into **movement** — servos, motors, LEDs, sounds.

```
   CAMERA (eyes)          BRAIN (browser ML)         BODY (micro:bit)
 ┌─────────────┐         ┌──────────────────┐       ┌─────────────────┐
 │ Phone / PC  │  ───►   │ enorasisCore     │ BLE   │ Your blocks:    │
 │ sees world  │  Train  │ classifies image │ ───►  │ servo, motor,   │
 └─────────────┘  Test   └──────────────────┘       │ LED, logic…     │
                                                       └─────────────────┘
```

| Without this extension | With enorasisCore + this extension |
|------------------------|-------------------------------------|
| Fixed sensors only | **Vision-guided** projects |
| Copy-paste UART JavaScript | **Blocks** for teachers & students |
| ML disconnected from hardware | **End-to-end STEM story**: data → train → deploy |

The micro:bit still does **not** run the neural network (by design — simple, fast, school-friendly). It receives **decisions** from the AI. That is how real products work too: smart camera in the cloud or on a phone, actuator on a small board.

**Educational value:** learners see that **AI is not magic** — it is trained data, labels, and a clear path from **“what I see”** to **“what my robot does”.**

---

## Με δικά μας λόγια (για εκπαιδευτές)

Το micro:bit είναι φανταστικό για ρομποτική — αλλά **δεν βλέπει**. Δεν ξέρει μόνο του αν μπροστά του είναι κόκκινο αντικείμενο, βέλος αριστερά ή πρόσωπο.

Η **enorasisCore** βάζει την **όραση** στο **browser**: ο μαθητής μαζεύει εικόνες, κάνει **Train**, βλέπει live **Test** από κάμερα κινητού ή laptop.

**Αυτό το extension δίνει ανθρώπινη όραση στο micro:bit** — όχι με βαρύ AI στην πλακέτα, αλλά στέλνοντας **αυτό που «κατάλαβε» η Τεχνητή Νοημοσύνη** (όνομα κλάσης) μέσω **Bluetooth**. Τα blocks MakeCode μετατρέπουν την ετικέτα σε **πράξη**: servo, motor, εικονίδιο, στάση.

Αυτό είναι σπουδαίο για STEM επειδή:

- Δείχνει **ολόκληρη τη ροή ML**: δεδομένα → εκπαίδευση → απόφαση → hardware.
- Δεν χρειάζεται εγκατάσταση ή δύσκολος κώδικας ML — μόνο browser + micro:bit v2.
- Συνδέει **Τεχνητή Νοημοσύνη** με **πραγματικό κόσμο** (ρομπότ, servos, πίστα βελακιών).
- Αντικαθιστά **copy-paste JavaScript** με **blocks** — λιγότερα λάθη στην τάξη.

**Σημαντικό:** τα ονόματα κλάσεων στο Train (π.χ. `left`, `right`, `nothing`) πρέπει να **ταιριάζουν ακριβώς** στα blocks MakeCode.

---

## Install (classroom)

1. Open [makecode.microbit.org](https://makecode.microbit.org/)
2. **New Project** → ⚙️ **Extensions**
3. Paste: `https://github.com/skinformatics/enorasisCore-makecode`
4. Select **enorasis-core** → category **enorasisCore** appears
5. **Download** `.hex` → flash micro:bit (USB)

**macOS + Chrome:** ⚙️ Project Settings → **No Pairing Required** → **Save** → Download again.

**Full workflow:** [enorasiscore.eu](https://enorasiscore.eu) → Train classes → Connect micro:bit → Test → watch blocks run.

---

## Blocks API

| Block | What it does |
|-------|----------------|
| `start enorasisCore BLE` | Starts UART; micro:bit shows □ when ready for AI labels |
| `on enorasisCore connected` | Browser linked (shows ✓) |
| `on enorasisCore disconnected` | Link lost (shows ✗) |
| `on enorasisCore class received` | Any new AI class label |
| `on enorasisCore class … received` | Specific class only (e.g. `left`) |
| `last enorasisCore class` | Last label (string) |
| `enorasisCore class is …` | Compare last label |

### Example — vision → servo (colours)

```blocks
enorasisCore.start()
enorasisCore.onClassReceived("kokkino", function () {
    pins.servoWritePin(AnalogPin.P0, 0)
    basic.showIcon(IconNames.Heart)
})
enorasisCore.onClassReceived("prasino", function () {
    pins.servoWritePin(AnalogPin.P0, 90)
})
enorasisCore.onClassReceived("mple", function () {
    pins.servoWritePin(AnalogPin.P0, 180)
})
```

### Example — arrows (tested in classroom)

```blocks
enorasisCore.start()
enorasisCore.onClassReceived("left", function () {
    pins.servoWritePin(AnalogPin.P0, 0)
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
    `)
})
enorasisCore.onClassReceived("right", function () {
    pins.servoWritePin(AnalogPin.P0, 180)
})
enorasisCore.onClassReceived("nothing", function () {
    pins.servoWritePin(AnalogPin.P0, 90)
})
```

---

## Technical notes

| Topic | Detail |
|-------|--------|
| **Board** | BBC micro:bit **v2** (Web Bluetooth workflow) |
| **Where ML runs** | Browser only ([enorasisCore](https://enorasiscore.eu)) |
| **Protocol** | Nordic UART BLE; message = class name + `\n` |
| **Browser** | Chrome / Edge with Web Bluetooth |
| **Phase 2** | Motor-shield blocks (Keyestudio Robo1) — planned |

Do **not** change the BLE protocol without updating the enorasisCore platform.

---

## Repository files

| File | Purpose |
|------|---------|
| `enorasisCore.ts` | Block definitions |
| `pxt.json` | Package metadata (short description for Extensions card) |
| `icon.png` | 300×200 gallery icon |
| `LICENSE.txt` | MIT |
| `test.ts` | Approval / compile tests |
| `_locales/` | Greek + English block labels |

---

## Links

- **Platform:** [enorasiscore.eu](https://enorasiscore.eu)
- **Staging:** [enorasiscore.etux4u.gr](https://enorasiscore.etux4u.gr)
- **This extension (public):** [github.com/skinformatics/enorasisCore-makecode](https://github.com/skinformatics/enorasisCore-makecode)
- **Platform source (private dev):** [cursor_enorasisCore](https://github.com/skinformatics/cursor_enorasisCore)

MIT © 2026 skinformatics / enorasisCore

---

## Publication guide — 14 steps (official MakeCode gallery)

Follow these **in order** before students can search **“enorasis”** without pasting a URL.  
Based on [MakeCode extension approval](https://makecode.microbit.org/extensions/approval) and [Micro:bit Foundation requirements](https://support.microbit.org/support/solutions/articles/19000054952-makecode-extension-approval).

| Step | What you do | Status |
|------|-------------|--------|
| **1** | **Classroom test** — Train + Connect + Test on real micro:bit v2; document one working project (e.g. `left` / `right` / `nothing`). | ✅ Done |
| **2** | **Public repo** — Code lives at [enorasisCore-makecode](https://github.com/skinformatics/enorasisCore-makecode) (root = extension, not subfolder). | ✅ Done |
| **3** | **MIT license** — `LICENSE.txt` in repo root. | ✅ Done |
| **4** | **Gallery icon** — `icon.png` exactly **300×200 px**, **&lt; 100 KB**. | ✅ Done |
| **5** | **Tests** — `test.ts` covers all blocks; compiles in MakeCode; no simulator errors for BLE-only logic. | ✅ Done |
| **6** | **README** — API table + ` ```blocks ` examples (not screenshots only); link to [enorasiscore.eu](https://enorasiscore.eu). | ✅ This file |
| **7** | **pxt.json** — Every file in `"files"` exists in repo; version semver (`0.1.x`). | ✅ Check on release |
| **8** | **GitHub repo description** — Short text, e.g. *“Human vision for micro:bit — browser ML + BLE class labels (enorasisCore)”*. Set on GitHub → Settings or repo About. | ⏳ You |
| **9** | **GitHub Release** — Create release tag **`v0.1.2`** (or current version) on [Releases](https://github.com/skinformatics/enorasisCore-makecode/releases); attach notes (vision + BLE + v2). | ⏳ You |
| **10** | **English-first** — Blocks and README primarily in English (`_locales/el` optional). Naming follows [MakeCode conventions](https://makecode.com/extensions/naming-conventions). | ✅ Done |
| **11** | **Product context** — In approval form, explain: educational **software + micro:bit v2**, not a physical accessory; aligns with CS/AI in schools. Link Hackster/tutorials if available. | ⏳ You |
| **12** | **micro:bit Slack** (recommended) — Join [micro:bit Slack](https://slack.microbit.org/) → channels `#makecode` and `#makecode-pkg-owners`; introduce your extension. | ⏳ Optional |
| **13** | **Submit approval form** — [MakeCode for micro:bit Extension Approval Form](https://form.jotform.com/90075019358357). Paste repo URL, release tag, describe AI/vision use case for students. | ⏳ You |
| **14** | **After approval** — Foundation opens PR to [pxt-microbit targetconfig.json](https://github.com/Microsoft/pxt-microbit/blob/master/targetconfig.json); then search **“enorasis”** in Extensions shows your card with icon; “User-provided / not endorsed” disclaimer removed. | ⏳ Wait |

### Step 9 detail — create GitHub Release (example)

1. Open https://github.com/skinformatics/enorasisCore-makecode/releases  
2. **Draft a new release**  
3. Tag: `v0.1.2` → target `main`  
4. Title: `v0.1.2 — Human vision for micro:bit (BLE)`  
5. Description: link enorasiscore.eu, note classroom-tested, micro:bit v2  
6. **Publish release**

### Step 13 detail — what to write in the form

- **Extension URL:** `https://github.com/skinformatics/enorasisCore-makecode`  
- **Release:** `v0.1.2`  
- **Purpose:** Students train image classes in the browser (ML); micro:bit receives labels over BLE and drives robotics — **vision for the micro:bit** without on-device neural networks.  
- **Hardware:** BBC micro:bit v2 + camera (phone/PC); optional servos/motors.  
- **Education:** STEM, AI literacy, no-install browser ML.

---

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```
