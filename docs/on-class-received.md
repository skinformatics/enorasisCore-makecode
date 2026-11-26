# on enorasisCore class received

Run code whenever **any** class label arrives from enorasisCore.

Your code can take as long as it needs. If other classes arrive in the meantime, the newest one runs next.

```sig
enorasisCore.onAnyClassReceived(function () {})
```

Use this block when you want one place for all classes. Inside it, check the label with **last enorasisCore class** or **enorasisCore class is**.

## Example

```blocks
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)
enorasisCore.onAnyClassReceived(function () {
    basic.showString(enorasisCore.lastClass())
})
```

## See also

**on enorasisCore class (left) received**, **last enorasisCore class**, **enorasisCore class is**

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```
