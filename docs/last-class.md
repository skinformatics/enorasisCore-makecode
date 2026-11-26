# last enorasisCore class

The **most recent class label** that your class blocks received from enorasisCore, as text.

```sig
enorasisCore.lastClass()
```

## Returns

* a string with the class name, for example `left`, `red` or `stop`: whatever names you used when training in the browser. It is empty until the first class arrives.

## Example

```blocks
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)
enorasisCore.onAnyClassReceived(function () {
    basic.showString(enorasisCore.lastClass())
})
```

## See also

**enorasisCore class is**, **on enorasisCore class received**

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```
