# on-class-received

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```

Runs your code whenever **any** new class label arrives from enorasisCore over Bluetooth.

Use this block when you want one handler and you check the label with `last enorasisCore class` or `enorasisCore class is`.

```blocks
enorasisCore.onAnyClassReceived(function () {
    let label = enorasisCore.lastClass()
    basic.showString(label)
})
```
