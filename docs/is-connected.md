# enorasisCore connected

Check whether enorasisCore is connected right now, over **Bluetooth** or the **USB cable**.

```sig
enorasisCore.isConnected()
```

## Returns

* `true` while enorasisCore is connected, otherwise `false`.

## Example

```blocks
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)
basic.forever(function () {
    if (enorasisCore.isConnected()) {
        led.plot(4, 0)
    } else {
        led.unplot(4, 0)
    }
})
```

## See also

**enorasisCore connection**, **on enorasisCore connected**

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```
