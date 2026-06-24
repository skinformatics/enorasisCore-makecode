// enorasisCore extension — approval test suite
// Pass: project compiles; simulator runs without throw.
// Hardware BLE is not simulated — blocks register handlers only.

// 1. Start BLE service
enorasisCore.start()

// 2. Last class empty at boot
let emptyOk = enorasisCore.classIs("")

// 3. Register any-class handler
enorasisCore.onAnyClassReceived(function () {
    let label = enorasisCore.lastClass()
})

// 4. Register named-class handler
enorasisCore.onClassReceived("left", function () {
    basic.showIcon(IconNames.ArrowWest)
})

// 5. Connection handlers
enorasisCore.onConnected(function () {
    basic.showIcon(IconNames.Yes)
})
enorasisCore.onDisconnected(function () {
    basic.showIcon(IconNames.No)
})
