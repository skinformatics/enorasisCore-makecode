# enorasisCore — MakeCode Extension

**Machine learning in the browser. Your micro:bit acts on what the AI sees.**

[![Platform](https://img.shields.io/badge/enorasisCore-ML%20%2B%20BLE-blue)](https://enorasiscore.eu)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.txt)
[![micro:bit v2](https://img.shields.io/badge/micro:bit-v2-00ED00)](https://microbit.org/)

---

## What is this? (for students & teachers)

This extension connects your **BBC micro:bit v2** to **[enorasisCore](https://enorasiscore.eu)** — a platform where you **train Artificial Intelligence** in the web browser (no install, no coding for the ML part).

### How machine learning works here

```
Camera (phone / laptop)
    → enorasisCore trains a model (classes you define: colours, arrows, objects…)
    → Live Test: AI picks the best matching class
    → Bluetooth sends the class name to micro:bit
    → Your blocks move servos, motors, LEDs…
```

| Where | What happens |
|-------|----------------|
| **Browser (enorasisCore)** | Collect images, **Train**, **Test** — this is **Machine Learning** |
| **micro:bit (this extension)** | Receives only the **class label** (text) via BLE — **no AI on the board** |

The micro:bit does **not** run the neural network. That keeps projects fast and suitable for schools. You learn **how ML connects to the real world** (robotics, sensors, automation).

### Example class names

You choose names when training, e.g. `left`, `right`, `kokkino`, `go`, `stop`.  
They must match **exactly** in MakeCode blocks and in enorasisCore Train.

---

## Τι είναι αυτό; (για μαθητές & εκπαιδευτές)

Το extension συνδέει το **BBC micro:bit v2** με την **[enorasisCore](https://enorasiscore.eu)** — πλατφόρμα όπου εκπαιδεύεις **Τεχνητή Νοημοσύνη** στο browser (χωρίς εγκατάσταση, χωρίς κώδικα για το ML).

### Πώς δουλεύει η μηχανική μάθηση

```
Κάμερα (κινητό / laptop)
    → Στο enorasisCore εκπαιδεύεις μοντέλο (κλάσεις: χρώματα, βελάκια, αντικείμενα…)
    → Live Test: η AI διαλέγει την καλύτερη κλάση
    → Bluetooth στέλνει το όνομα κλάσης στο micro:bit
    → Τα blocks σου κινούν servos, motors, LEDs…
```

| Πού | Τι γίνεται |
|-----|------------|
| **Browser (enorasisCore)** | Φωτό, **Train**, **Test** — εδώ γίνεται η **Μηχανική Μάθηση** |
| **micro:bit (extension)** | Λαμβάνει μόνο **ετικέτα κλάσης** (κείμενο) μέσω BLE — **όχι AI στην πλακέτα** |

Το micro:bit **δεν** τρέχει το νευρωνικό δίκτυο. Έτσι τα projects μένουν απλά και κατάλληλα για σχολείο. Μαθαίνεις **πώς το ML συνδέεται με τον πραγματικό κόσμο**.

---

## Install

1. Open [makecode.microbit.org](https://makecode.microbit.org/)
2. **New Project** → ⚙️ **Extensions**
3. Paste:

```
https://github.com/skinformatics/enorasisCore-makecode
```

4. Pick the **enorasisCore** card (ML icon)

**macOS:** Project Settings → **No Pairing Required** → Save → re-Download `.hex`

---

## Blocks API

| Block | Description |
|-------|-------------|
| `start enorasisCore BLE` | Start UART service; micro:bit shows □ when ready |
| `on enorasisCore connected` | Runs when enorasisCore connects (shows ✓) |
| `on enorasisCore disconnected` | Runs on disconnect (shows ✗) |
| `on enorasisCore class received` | Any new class label from AI |
| `on enorasisCore class … received` | Specific class (e.g. `left`) |
| `last enorasisCore class` | Last received label (string) |
| `enorasisCore class is …` | True if last label matches |

### Example — colour → servo

```blocks
enorasisCore.start()
enorasisCore.onClassReceived("kokkino", function () {
    pins.servoWritePin(AnalogPin.P0, 0)
    basic.showIcon(IconNames.Heart)
})
```

---

## Protocol (do not change)

- Nordic UART BLE (same as enorasisCore browser)
- Message = **class name** + newline `\n`
- Connect only from **enorasisCore** in Chrome / Edge (Web Bluetooth)

---

## Phase 2 (planned)

Motor driver blocks for approved micro:bit shields (Keyestudio Robo1, etc.) — after BLE phase is validated in class.

---

## Files

| File | Purpose |
|------|---------|
| `enorasisCore.ts` | Blocks |
| `icon.png` | Gallery icon 300×200 |
| `test.ts` | Compile / approval tests |
| `LICENSE.txt` | MIT |

---

## Links

- Platform: [enorasiscore.eu](https://enorasiscore.eu)
- Staging: [enorasiscore.etux4u.gr](https://enorasiscore.etux4u.gr)
- GitHub (dev): [cursor_enorasisCore](https://github.com/skinformatics/cursor_enorasisCore)

MIT © skinformatics / enorasisCore
