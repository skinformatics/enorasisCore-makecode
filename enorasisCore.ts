/**
 * How enorasisCore talks to the micro:bit.
 */
enum EnorasisLink {
    //% block="Bluetooth and USB"
    BluetoothAndUsb = 0,
    //% block="Bluetooth only"
    BluetoothOnly = 1,
    //% block="USB cable only"
    UsbOnly = 2
}

/**
 * enorasisCore: connect the micro:bit to browser Machine Learning (enorasiscore.eu).
 * The AI runs in the browser; the micro:bit receives class labels over Bluetooth (BLE UART)
 * or over the USB cable (serial, 115200 baud). Both arrive as one line per class.
 */
//% weight=95 color=#0066CC icon=""
//% blockNamespace=enorasisCore
//% blockGap=8
//% groups='["Start", "Classes", "Connection", "Send"]'
namespace enorasisCore {
    let _lastClass = ""
    let _bleReady = false
    let _usbReady = false
    let _bleEventsReady = false
    let _bleOn = false
    let _usbOn = false
    let _usbLast = 0
    let _usbPinged = false
    let _useBle = false
    let _useUsb = false

    interface ClassHandler {
        name: string
        handler: () => void
    }

    let _anyClassHandlers: (() => void)[] = []
    let _classHandlers: ClassHandler[] = []
    let _connectedHandlers: (() => void)[] = []
    let _disconnectedHandlers: (() => void)[] = []

    // Icons and your connection blocks run in the background,
    // so the micro:bit keeps reading class labels while they run.
    function fireConnected(): void {
        control.inBackground(function () {
            basic.showIcon(IconNames.Yes)
            for (let i = 0; i < _connectedHandlers.length; i++) {
                _connectedHandlers[i]()
            }
        })
    }

    function fireDisconnected(): void {
        control.inBackground(function () {
            basic.showIcon(IconNames.No)
            for (let i = 0; i < _disconnectedHandlers.length; i++) {
                _disconnectedHandlers[i]()
            }
        })
    }

    // A line from the USB cable means the browser is connected by cable.
    function usbAlive(): void {
        _usbLast = control.millis()
        if (!_usbOn) {
            _usbOn = true
            if (!_bleOn) {
                fireConnected()
            }
        }
    }

    function usbGone(): void {
        _usbPinged = false
        if (_usbOn) {
            _usbOn = false
            if (!_bleOn) {
                fireDisconnected()
            }
        }
    }

    function receive(line: string, fromUsb: boolean): void {
        // the browser sends one class per line; \r may come from serial terminals
        let label = line.replace("\r", "").trim()
        // control lines from enorasisCore start with # and never reach your blocks;
        // the reply to #hello goes out first, before anything else runs
        if (label.length > 0 && label.charAt(0) == "#") {
            if (!fromUsb) {
                return
            }
            if (label == "#hello") {
                serial.writeLine("ok enorasisCore microbit")
            } else if (label == "#bye") {
                usbGone()
                return
            } else if (label == "#ping") {
                _usbPinged = true
            }
            usbAlive()
            return
        }
        if (fromUsb) {
            usbAlive()
        }
        if (label.length == 0) {
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

    function ensureBleEvents(): void {
        if (_bleEventsReady) {
            return
        }
        _bleEventsReady = true
        bluetooth.onBluetoothConnected(function () {
            _bleOn = true
            if (!_usbOn) {
                fireConnected()
            }
        })
        bluetooth.onBluetoothDisconnected(function () {
            _bleOn = false
            if (!_usbOn) {
                fireDisconnected()
            }
        })
    }

    function ensureBle(): void {
        if (_bleReady) {
            return
        }
        _bleReady = true
        bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
            receive(bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)), false)
        })
    }

    function ensureUsb(): void {
        if (_usbReady) {
            return
        }
        _usbReady = true
        serial.setBaudRate(BaudRate.BaudRate115200)
        // room for several lines while your blocks run (the default is 20 bytes)
        serial.setRxBufferSize(128)
        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
            receive(serial.readUntil(serial.delimiters(Delimiters.NewLine)), true)
        })
        // enorasisCore sends a short #ping every 2 seconds over the cable.
        // After the first #ping, no line for 5 seconds means the cable connection has ended.
        // Pages that do not send #ping never trigger this check.
        control.inBackground(function () {
            while (true) {
                basic.pause(1000)
                if (_usbOn && _usbPinged && control.millis() - _usbLast > 5000) {
                    usbGone()
                }
            }
        })
    }

    /**
     * Start enorasisCore so the browser can send AI class labels to the micro:bit.
     * Choose Bluetooth, the USB cable, or both.
     * @param link how enorasisCore connects: Bluetooth, the USB cable, or both
     */
    //% blockId=enorasis_start_with block="start enorasisCore over %link"
    //% link.defl=EnorasisLink.BluetoothAndUsb
    //% weight=100 blockGap=8
    //% group="Start"
    //% help=enorasis-core/docs/start
    export function startWith(link: EnorasisLink): void {
        if (link != EnorasisLink.UsbOnly) {
            _useBle = true
            bluetooth.startUartService()
            ensureBleEvents()
            ensureBle()
        }
        if (link != EnorasisLink.BluetoothOnly) {
            _useUsb = true
            ensureUsb()
        }
        basic.showIcon(IconNames.Square)
    }

    /**
     * Start enorasisCore over Bluetooth and the USB cable.
     * Kept so that projects made with older versions keep working.
     */
    //% blockId=enorasis_start block="start enorasisCore"
    //% weight=99 blockGap=8
    //% group="Start"
    //% deprecated=true
    //% help=enorasis-core/docs/start
    export function start(): void {
        startWith(EnorasisLink.BluetoothAndUsb)
    }

    /**
     * Run when the AI in enorasisCore detects any trained class.
     */
    //% blockId=enorasis_on_any_class block="on enorasisCore class received"
    //% weight=90 blockGap=8
    //% group="Classes"
    //% draggable=false blockAllowMultiple=false
    //% help=enorasis-core/docs/on-class-received
    export function onAnyClassReceived(handler: () => void): void {
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
    //% group="Classes"
    //% draggable=false
    //% help=enorasis-core/docs/on-class-name-received
    export function onClassReceived(className: string, handler: () => void): void {
        let entry: ClassHandler = { name: className, handler: handler }
        _classHandlers.push(entry)
    }

    /**
     * The class name last sent by enorasisCore AI (e.g. left, red, go).
     */
    //% blockId=enorasis_last_class block="last enorasisCore class"
    //% weight=80
    //% group="Classes"
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
    //% group="Classes"
    //% help=enorasis-core/docs/class-is
    export function classIs(name: string): boolean {
        return _lastClass == name
    }

    /**
     * Run code when enorasisCore connects, over Bluetooth or the USB cable.
     */
    //% blockId=enorasis_on_connected block="on enorasisCore connected"
    //% weight=70 blockGap=8
    //% group="Connection"
    //% draggable=false blockAllowMultiple=false
    //% help=enorasis-core/docs/on-connected
    export function onConnected(handler: () => void): void {
        ensureBleEvents()
        _connectedHandlers.push(handler)
    }

    /**
     * Run code when enorasisCore disconnects, over Bluetooth or the USB cable.
     */
    //% blockId=enorasis_on_disconnected block="on enorasisCore disconnected"
    //% weight=69 blockGap=8
    //% group="Connection"
    //% draggable=false blockAllowMultiple=false
    //% help=enorasis-core/docs/on-disconnected
    export function onDisconnected(handler: () => void): void {
        ensureBleEvents()
        _disconnectedHandlers.push(handler)
    }

    /**
     * True while enorasisCore is connected, over Bluetooth or the USB cable.
     */
    //% blockId=enorasis_is_connected block="enorasisCore connected"
    //% weight=68
    //% group="Connection"
    //% help=enorasis-core/docs/is-connected
    export function isConnected(): boolean {
        return _bleOn || _usbOn
    }

    /**
     * How enorasisCore is connected right now: "Bluetooth", "USB", or empty when it is not connected.
     */
    //% blockId=enorasis_connection block="enorasisCore connection"
    //% weight=67
    //% group="Connection"
    //% help=enorasis-core/docs/connection
    export function connection(): string {
        if (_bleOn) {
            return "Bluetooth"
        }
        if (_usbOn) {
            return "USB"
        }
        return ""
    }

    /**
     * Send a short message from the micro:bit to enorasisCore in the browser,
     * over the connection in use. The learning environment shows it in the board card.
     * @param text the message to send, eg: "A pressed"
     */
    //% blockId=enorasis_send block="send to enorasisCore %text"
    //% text.defl="hello"
    //% weight=60
    //% group="Send"
    //% help=enorasis-core/docs/send
    export function send(text: string): void {
        if (text.length == 0 || text.charAt(0) == "#") {
            return
        }
        if (_bleOn) {
            bluetooth.uartWriteLine(text)
        }
        if (_useUsb) {
            serial.writeLine(text)
        }
    }
}
