# on enorasisCore connected

Run code when enorasisCore connects to the micro:bit, over **Bluetooth** or the **USB cable**.

```sig
enorasisCore.onConnected(function () {})
```

The micro:bit shows a check mark first, then runs your code. Over the USB cable the connection starts when enorasisCore sends its first message after you press **Connect by USB cable**.

Before version 0.1.8 this block ran for Bluetooth only.

## Example

```blocks
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)
enorasisCore.onConnected(function () {
    basic.showIcon(IconNames.Heart)
})
```

## See also

**on enorasisCore disconnected**, **enorasisCore connected**

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```
