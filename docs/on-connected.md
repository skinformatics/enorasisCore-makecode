# on-connected

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```

Runs when a Bluetooth connection from enorasisCore is established.

The micro:bit shows a check mark icon when connected.

```blocks
enorasisCore.onConnected(function () {
    basic.showIcon(IconNames.Heart)
})
```
