radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    }
})
function ShowStatus () {
    basic.clearScreen()
    led.plot(0, maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL2))
    led.plot(1, maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1))
    led.plot(2, maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM))
    led.plot(3, maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1))
    led.plot(4, maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR2))
    basic.pause(1000)
}
input.onButtonPressed(Button.A, function () {
    if (IsOn) {
        maqueenPlusV2.ledBlank()
        IsOn = 0
    } else {
        maqueenPlusV2.showColor(maqueenPlusV2.NeoPixelColors.White)
        IsOn = 1
    }
})
function MoveRobotLeft () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, Speed)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, Speed)
    basic.pause(500)
    while (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 0) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, Speed)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, Speed)
    }
}
function MoveRobotRight () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, Speed)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, Speed)
    basic.pause(500)
    while (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 0) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, Speed)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, Speed)
    }
}
radio.onReceivedString(function (receivedString) {
    for (let value2 of receivedString.split(",")) {
        showDirection(value2)
    }
    basic.showIcon(IconNames.Yes)
    basic.pause(1000)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    ShowStatus()
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
})
function showDirection (Direction2: string) {
    if (Direction2 == "L") {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . #
            . . # . #
            `)
        MoveRobotLeft()
    } else if (Direction2 == "R") {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            # . . # .
            # . # . .
            `)
        MoveRobotRight()
    } else if (Direction2 == "F") {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        MoveRobotForward()
    } else {
        basic.showIcon(IconNames.Happy)
    }
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    basic.clearScreen()
    basic.pause(1000)
}
function MoveRobotForward () {
    if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 1) {
        while (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL2) == 1 || maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR2) == 1) {
            MaintainLine()
        }
        while (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL2) == 0 && maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR2) == 0) {
            MaintainLine()
        }
    } else {
        basic.showIcon(IconNames.Sad)
    }
}
function MaintainLine () {
    if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1) == 0 && maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1) == 1) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, SpeedHigh)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, SpeedLow)
    } else if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1) == 1 && maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1) == 0) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, SpeedHigh)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, SpeedLow)
    } else {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, Speed)
    }
}
let IsOn = 0
let SpeedLow = 0
let SpeedHigh = 0
let Speed = 0
radio.setGroup(33)
maqueenPlusV2.I2CInit()
maqueenPlusV2.ledBlank()
maqueenPlusV2.setBrightness(56)
maqueenPlusV2.showColor(maqueenPlusV2.NeoPixelColors.White)
Speed = 40
SpeedHigh = 80
SpeedLow = 40
