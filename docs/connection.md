# enorasisCore connection

How enorasisCore is connected right now.

```sig
enorasisCore.connection()
```

## Returns

* `"Bluetooth"` or `"USB"` while connected, or an empty string when enorasisCore is not connected.

## Example

```blocks
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)
input.onButtonPressed(Button.B, function () {
    basic.showString(enorasisCore.connection())
})
```

## See also

**enorasisCore connected**

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```
