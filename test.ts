// enorasis-core extension test suite
// See README.md "Test suite" for pass/fail criteria.
// BLE is not simulated; tests verify compile-time registration only.

enorasisCore.start()

let bootLabel = enorasisCore.lastClass()
let bootEmpty = enorasisCore.classIs("")

enorasisCore.onAnyClassReceived(function () {
    let label = enorasisCore.lastClass()
    if (enorasisCore.classIs("left")) {
        basic.showArrow(ArrowNames.West)
    }
})

enorasisCore.onClassReceived("right", function () {
    basic.showArrow(ArrowNames.East)
})

enorasisCore.onClassReceived("nothing", function () {
    basic.showIcon(IconNames.Square)
})

enorasisCore.onConnected(function () {
    basic.showIcon(IconNames.Yes)
})

enorasisCore.onDisconnected(function () {
    basic.showIcon(IconNames.No)
})
