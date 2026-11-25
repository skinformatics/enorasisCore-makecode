/**
 * enorasisCore — connect micro:bit to browser Machine Learning (enorasiscore.eu).
 * The AI runs in the browser; the micro:bit receives class labels over Bluetooth (BLE UART)
 * or over the USB cable (serial, 115200 baud). Both arrive as one line per class.
 */
//% weight=95 color=#0066CC icon="\uf1eb"
//% blockNamespace=enorasisCore
//% blockGap=8
namespace enorasisCore {
    let _lastClass = ""
    let _listenerReady = false

    interface ClassHandler {
        name: string
        handler: () => void
    }

    let _anyClassHandlers: (() => void)[] = []
    let _classHandlers: ClassHandler[] = []

    function receive(line: string): void {
        // the browser sends one class per line; \r may come from serial terminals
        let label = line.replace("\r", "").trim()
        if (label.length == 0) {
            return
        }
        // control lines from the browser start with #
        if (label.charAt(0) == "#") {
            if (label == "#hello") {
                serial.writeLine("ok enorasisCore microbit")
            }
            return
        }
        _lastClass = label
        for (let i = 0; i < _anyClassHandlers.length; i++) {
            _anyClassHandlers[i]()
        }
        for (let j = 0; j < _classHandlers.length; j++) {
            if (_classHandlers[j].name == _lastClass) {
                _classHandlers[j].handler()
            }
        }
    }

    function ensureUartListener(): void {
        if (_listenerReady) {
            return
        }
        _listenerReady = true
        // Bluetooth
        bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
            receive(bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)))
        })
        // USB cable (enorasisCore 11 and newer can connect by cable)
        serial.setBaudRate(BaudRate.BaudRate115200)
        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
            receive(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
        })
    }

    /**
     * Start enorasisCore so the browser can send AI class labels over Bluetooth or the USB cable.
     */
    //% blockId=enorasis_start block="start enorasisCore"
    //% weight=100 blockGap=8
    //% help=enorasis-core/docs/start
    export function start(): void {
        bluetooth.startUartService()
        ensureUartListener()
        basic.showIcon(IconNames.Square)
    }

    /**
     * The class name last sent by enorasisCore AI (e.g. left, red, go).
     */
    //% blockId=enorasis_last_class block="last enorasisCore class"
    //% weight=80
    //% help=enorasis-core/docs/last-class
    export function lastClass(): string {
        return _lastClass
    }

    /**
     * Returns true when the last class label received from enorasisCore equals the given name.
     * @param name the class label to compare against, eg: "left"
     */
    //% blockId=enorasis_class_is block="enorasisCore class is %name"
    //% name.defl=""
    //% weight=79
    //% help=enorasis-core/docs/class-is
    export function classIs(name: string): boolean {
        return _lastClass == name
    }

    /**
     * Run when the AI in enorasisCore detects any trained class.
     */
    //% blockId=enorasis_on_any_class block="on enorasisCore class received"
    //% weight=90 blockGap=8
    //% draggable=false blockAllowMultiple=false
    //% help=enorasis-core/docs/on-class-received
    export function onAnyClassReceived(handler: () => void): void {
        ensureUartListener()
        _anyClassHandlers.push(handler)
    }

    /**
     * Run code when enorasisCore sends this exact class label.
     * The label must match the class name you trained in enorasisCore (same spelling and case).
     * @param className the exact class label to listen for, eg: "left"
     */
    //% blockId=enorasis_on_class block="on enorasisCore class %className received"
    //% className.defl=""
    //% weight=89 blockGap=8
    //% draggable=false
    //% help=enorasis-core/docs/on-class-name-received
    export function onClassReceived(className: string, handler: () => void): void {
        ensureUartListener()
        let entry: ClassHandler = { name: className, handler: handler }
        _classHandlers.push(entry)
    }

    /**
     * Run code when a device connects over Bluetooth (enorasisCore).
     */
    //% blockId=enorasis_on_connected block="on enorasisCore connected"
    //% weight=70 blockGap=8
    //% draggable=false blockAllowMultiple=false
    //% help=enorasis-core/docs/on-connected
    export function onConnected(handler: () => void): void {
        bluetooth.onBluetoothConnected(function () {
            basic.showIcon(IconNames.Yes)
            handler()
        })
    }

    /**
     * Run code when Bluetooth disconnects.
     */
    //% blockId=enorasis_on_disconnected block="on enorasisCore disconnected"
    //% weight=69 blockGap=8
    //% draggable=false blockAllowMultiple=false
    //% help=enorasis-core/docs/on-disconnected
    export function onDisconnected(handler: () => void): void {
        bluetooth.onBluetoothDisconnected(function () {
            basic.showIcon(IconNames.No)
            handler()
        })
    }
}
