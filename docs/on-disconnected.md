# on enorasisCore disconnected

Run code when the connection with enorasisCore ends, over **Bluetooth** or the **USB cable**.

```sig
enorasisCore.onDisconnected(function () {})
```

The micro:bit shows an X first, then runs your code. Over the USB cable this happens when you press **Disconnect** in enorasisCore, or, while enorasisCore checks the cable every 2 seconds, when no message has arrived for 5 seconds (for example, the browser tab was closed).

Before version 0.1.8 this block ran for Bluetooth only.

## Example

```blocks
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)
enorasisCore.onDisconnected(function () {
    pins.servoWritePin(AnalogPin.P0, 90)
})
```

## See also

**on enorasisCore connected**

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```
