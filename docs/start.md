# start

```package
enorasis-core=github:skinformatics/enorasisCore-makecode
```

Starts the Bluetooth UART service so [enorasisCore](https://enorasiscore.eu) can send **machine learning class labels** from the browser to your micro:bit.

Place this block once at the beginning of your program (for example inside `on start`). The micro:bit displays a square icon when it is ready to receive labels.

**Requires:** BBC micro:bit **V2**, enorasisCore open in Chrome or Edge, and a flashed `.hex` from this project.

```blocks
enorasisCore.start()
```
