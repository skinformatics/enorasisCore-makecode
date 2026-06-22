// enorasisCore extension — smoke tests (simulator / compile)
// Run via MakeCode extension test or pxt deploy

enorasisCore.start()
let label = enorasisCore.lastClass()
if (enorasisCore.classIs("")) {
    // empty last class at boot is expected
}
enorasisCore.onAnyClassReceived(function () {
    let c = enorasisCore.lastClass()
})
enorasisCore.onClassReceived("test", function () {
    basic.showIcon(IconNames.Heart)
})
enorasisCore.onConnected(function () {
    basic.showIcon(IconNames.Yes)
})
enorasisCore.onDisconnected(function () {
    basic.showIcon(IconNames.No)
})
