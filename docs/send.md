# send to enorasisCore

Send a short message from the micro:bit to enorasisCore in the browser.

```sig
enorasisCore.send("hello")
```

The message goes over the connection in use (Bluetooth or the USB cable). enorasisCore shows it in the board card, so students can see what the micro:bit reports.

## Parameters

* **text**: the message, for example `A pressed`. Keep it short (up to 20 characters works best over Bluetooth). Messages that start with `#` are not sent, because enorasisCore uses `#` for its own control messages.

## Example

```blocks
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)
input.onButtonPressed(Button.A, function () {
    enorasisCore.send("A pressed")
})
```

## See also

**enorasisCore connected**

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```
