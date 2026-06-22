/**
 * enorasisCore — BLE UART receiver for BBC micro:bit.
 * Receives class labels trained in enorasisCore (browser) via Nordic UART.
 * Protocol: UTF-8 class name + newline (\\n). Do not change without browser sync.
 */
//% weight=95 color=#0066CC icon="\uf1eb"
namespace enorasisCore {
    let _lastClass = ""
    let _listenerReady = false

    interface ClassHandler {
        name: string
        handler: () => void
    }

    let _anyClassHandlers: (() => void)[] = []
    let _classHandlers: ClassHandler[] = []

    function ensureUartListener(): void {
        if (_listenerReady) {
            return
        }
        _listenerReady = true
        bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
            _lastClass = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
            for (let i = 0; i < _anyClassHandlers.length; i++) {
                _anyClassHandlers[i]()
            }
            for (let j = 0; j < _classHandlers.length; j++) {
                if (_classHandlers[j].name == _lastClass) {
                    _classHandlers[j].handler()
                }
            }
        })
    }

    /**
     * Start BLE UART for enorasisCore. Place at the start of your program.
     */
    //% blockId=enorasis_start block="start enorasisCore BLE"
    //% weight=100 blockGap=8
    export function start(): void {
        bluetooth.startUartService()
        ensureUartListener()
        basic.showIcon(IconNames.Square)
    }

    /**
     * The most recently received class label from enorasisCore.
     */
    //% blockId=enorasis_last_class block="last enorasisCore class"
    //% weight=80
    export function lastClass(): string {
        return _lastClass
    }

    /**
     * True when the last received class equals the given name.
     */
    //% blockId=enorasis_class_is block="enorasisCore class is %name"
    //% name.defl=""
    //% weight=79
    export function classIs(name: string): boolean {
        return _lastClass == name
    }

    /**
     * Run code when any class label is received from enorasisCore.
     */
    //% blockId=enorasis_on_any_class block="on enorasisCore class received"
    //% weight=90 blockGap=8
    //% draggable=false blockAllowMultiple=false
    export function onAnyClassReceived(handler: () => void): void {
        ensureUartListener()
        _anyClassHandlers.push(handler)
    }

    /**
     * Run code when a specific class label is received.
     */
    //% blockId=enorasis_on_class block="on enorasisCore class %className received"
    //% className.defl=""
    //% weight=89 blockGap=8
    //% draggable=false
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
    export function onDisconnected(handler: () => void): void {
        bluetooth.onBluetoothDisconnected(function () {
            basic.showIcon(IconNames.No)
            handler()
        })
    }
}
