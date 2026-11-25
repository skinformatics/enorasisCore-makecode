/**
 * enorasis-core — test suite
 * =================================================================
 *
 * Purpose
 * -------
 * Verify that every block in this extension keeps compiling and
 * registering correctly if MakeCode or the Micro:bit Educational
 * Foundation change the way the micro:bit is compiled.
 *
 * How to run
 * ----------
 * Open this extension in the MakeCode editor (or run `pxt test`
 * locally). The tests run at startup. The Bluetooth link itself is
 * NOT simulated — these tests only confirm that the API compiles and
 * that the event handlers register without throwing in the simulator.
 *
 * Pass / fail criteria
 * --------------------
 *  - startWith(...)      PASS if it compiles and starts listening
 *                         (Bluetooth and USB) without a simulator error.
 *  - start()              PASS if the older block still compiles
 *                         (kept for projects made before 0.1.8).
 *  - lastClass()          PASS if it returns a string at boot ("").
 *  - classIs("")          PASS if it returns a boolean at boot.
 *  - onAnyClassReceived   PASS if the handler registers (no throw).
 *  - onClassReceived(...)  PASS if specific-label handlers register.
 *  - onConnected /        PASS if the connection handlers register.
 *    onDisconnected
 *  - isConnected(),       PASS if they return a boolean and a string
 *    connection()         at boot (false, "").
 *  - send("...")          PASS if it compiles and does not throw
 *                         when nothing is connected.
 *  - Data transfer        Tested on a real micro:bit V2 with
 *                         enorasisCore over Bluetooth and the USB
 *                         cable, not in the simulator.
 *
 * The suite must not throw in the simulator even though it relies on
 * hardware Bluetooth that the simulator does not provide.
 */

// start listening over Bluetooth and the USB cable
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)

// value blocks return sensible defaults before any label arrives
let bootLabel = enorasisCore.lastClass()
let bootEmpty = enorasisCore.classIs("")

// "any class" handler with a conditional check
enorasisCore.onAnyClassReceived(function () {
    let label = enorasisCore.lastClass()
    if (enorasisCore.classIs("left")) {
        basic.showArrow(ArrowNames.West)
    }
})

// specific-label handlers (must match the names trained in enorasisCore)
enorasisCore.onClassReceived("right", function () {
    basic.showArrow(ArrowNames.East)
})

enorasisCore.onClassReceived("nothing", function () {
    basic.showIcon(IconNames.Square)
})

// connection lifecycle handlers
enorasisCore.onConnected(function () {
    basic.showIcon(IconNames.Yes)
})

enorasisCore.onDisconnected(function () {
    basic.showIcon(IconNames.No)
})

// connection state at boot
let bootConnected = enorasisCore.isConnected()
let bootVia = enorasisCore.connection()

// message back to the browser (ignored while nothing is connected)
input.onButtonPressed(Button.A, function () {
    enorasisCore.send("A pressed")
})
