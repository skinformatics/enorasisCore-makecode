# last-class

Returns the **most recently received class label** (text string) from enorasisCore.

Example values: `left`, `right`, `red`, `go`, `stop` — whatever names you used when training in the browser.

```blocks
let name = enorasisCore.lastClass()
if (enorasisCore.classIs("left")) {
    basic.showArrow(ArrowNames.West)
}
```
