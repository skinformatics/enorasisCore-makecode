# on-disconnected

Runs when the Bluetooth connection from enorasisCore is lost.

The micro:bit shows an X icon when disconnected.

```blocks
enorasisCore.onDisconnected(function () {
    basic.showIcon(IconNames.Asleep)
})
```
