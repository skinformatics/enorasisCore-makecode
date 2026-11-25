# enorasisCore class is

Check whether the last class label from enorasisCore is a given name.

```sig
enorasisCore.classIs("left")
```

## Parameters

* **name**: the class name to compare, exactly as you trained it (same spelling, same upper and lower case).

## Returns

* `true` when the last label equals **name**, otherwise `false`.

## Example

```blocks
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)
enorasisCore.onAnyClassReceived(function () {
    if (enorasisCore.classIs("stop")) {
        basic.showIcon(IconNames.No)
    }
})
```

## See also

**last enorasisCore class**

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```
