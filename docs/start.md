# start enorasisCore

Start receiving **machine learning class labels** from [enorasisCore](https://enorasiscore.eu) in the browser.

```sig
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)
```

Place this block once, at the beginning of your program (for example in **on start**). The micro:bit shows a square icon when it is ready.

## Parameters

* **link**: how enorasisCore connects to the micro:bit.
  * **Bluetooth and USB** (default): the micro:bit listens on both, so you can choose in enorasisCore.
  * **Bluetooth only**: for phones, tablets and computers with working Bluetooth.
  * **USB cable only**: for computers where Bluetooth does not work with the browser.

No Pairing Required is set automatically by the extension, so there is nothing to change in Project Settings.

This block starts the Bluetooth UART service and the USB serial connection. Do not add **bluetooth uart service** or **bluetooth on data received** to the same project: a second block that reads new lines stops the class labels from reaching your blocks.

## Requirements

BBC micro:bit **V2**, and enorasisCore open in Chrome or Edge. The USB cable works in Chrome or Edge on a computer.

## Projects from older versions

Before version 0.1.8 this block was called **start enorasisCore**, without a choice. Projects that use it keep working: it listens over Bluetooth and the USB cable.

## Example

```blocks
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)
enorasisCore.onClassReceived("left", function () {
    basic.showArrow(ArrowNames.West)
})
```

## See also

**on enorasisCore class received**, **on enorasisCore connected**

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```
