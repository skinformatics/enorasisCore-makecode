# on-disconnected

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```

Runs when the Bluetooth connection from enorasisCore is lost. A USB cable connection has no disconnect event.

The micro:bit shows an X icon when disconnected.

```blocks
enorasisCore.onDisconnected(function () {
    basic.showIcon(IconNames.Asleep)
})
```
