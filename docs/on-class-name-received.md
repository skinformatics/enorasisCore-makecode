# on-class-name-received

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```

Runs your code when enorasisCore sends a **specific** class label.

The `className` parameter must match the class name from your enorasisCore training set exactly.

```blocks
enorasisCore.onClassReceived("left", function () {
    pins.servoWritePin(AnalogPin.P0, 0)
})
enorasisCore.onClassReceived("right", function () {
    pins.servoWritePin(AnalogPin.P0, 180)
})
```
