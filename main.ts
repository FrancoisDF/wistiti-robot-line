radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    }
    maqueenPlusV2.showColor(maqueenPlusV2.NeoPixelColors.White)
})
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
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(200)
    while (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1) == 0) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    }
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
}
function MoveRobotRight () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(200)
    while (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1) == 0) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    }
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
}
radio.onReceivedString(function (receivedString) {
    for (let value2 of receivedString.split(",")) {
        showDirection(value2)
    }
    basic.showIcon(IconNames.Yes)
    basic.pause(1000)
    basic.clearScreen()
    maqueenPlusV2.ledBlank()
})
input.onButtonPressed(Button.B, function () {
    showDirection("F")
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
    music.ringTone(988)
    music.rest(music.beat(BeatFraction.Whole))
    basic.clearScreen()
    basic.pause(200)
}
function MoveRobotForward () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(500)
    if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 1) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
        basic.pause(500)
        while (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR2) == 0 && maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL2) == 0) {
            if (0 == 0) {
            	
            } else {
            	
            }
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
        }
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Backward, 100)
        basic.pause(100)
    }
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
}
let IsOn = 0
radio.setGroup(33)
maqueenPlusV2.I2CInit()
maqueenPlusV2.ledBlank()
maqueenPlusV2.setBrightness(56)
