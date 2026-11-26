# on enorasisCore class received (one class)

Run code when enorasisCore sends **one specific** class label.

Your code can take as long as it needs, for example an animation with pauses. If other classes arrive in the meantime, the newest one runs next.

```sig
enorasisCore.onClassReceived("left", function () {})
```

## Parameters

* **className**: the class name exactly as you trained it in enorasisCore (same spelling, same upper and lower case).

## Example

```blocks
enorasisCore.startWith(EnorasisLink.BluetoothAndUsb)
enorasisCore.onClassReceived("left", function () {
    pins.servoWritePin(AnalogPin.P0, 0)
})
enorasisCore.onClassReceived("right", function () {
    pins.servoWritePin(AnalogPin.P0, 180)
})
```

## See also

**on enorasisCore class received**, **enorasisCore class is**

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```
