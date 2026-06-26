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
 *  - start()              PASS if it compiles and the UART service
 *                         starts without a simulator error.
 *  - lastClass()          PASS if it returns a string at boot ("").
 *  - classIs("")          PASS if it returns a boolean at boot.
 *  - onAnyClassReceived   PASS if the handler registers (no throw).
 *  - onClassReceived(...)  PASS if specific-label handlers register.
 *  - onConnected /        PASS if the connection handlers register.
 *    onDisconnected
 *  - BLE data transfer    Tested on a real micro:bit V2 with
 *                         enorasisCore — not in the simulator.
 *
 * The suite must not throw in the simulator even though it relies on
 * hardware Bluetooth that the simulator does not provide.
 */

// start the BLE UART service
enorasisCore.start()

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
