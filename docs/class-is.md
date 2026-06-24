# class-is

Returns `true` when the last received class label **equals** the given name.

The name must match your enorasisCore training label **exactly** (same spelling and case).

```blocks
enorasisCore.onAnyClassReceived(function () {
    if (enorasisCore.classIs("stop")) {
        basic.showIcon(IconNames.No)
    }
})
```
