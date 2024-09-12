radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    }
})
function MoveRobotLeft () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(200)
    while (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 0) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    }
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
}
function MoveRobotRight () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(200)
    while (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 0) {
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
})
function showDirection (Direction2: string) {
    if (Direction2 == "Left") {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . #
            . . # . #
            `)
        MoveRobotLeft()
    } else if (Direction2 == "Right") {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            # . . # .
            # . # . .
            `)
        MoveRobotRight()
    } else if (Direction2 == "Forward") {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        MoveRobotForward()
    } else {
        basic.showIcon(IconNames.No)
    }
    music.ringTone(988)
    music.rest(music.beat(BeatFraction.Whole))
    basic.pause(1000)
    basic.clearScreen()
    basic.pause(200)
}
function MoveRobotForward () {
    if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 1) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
        basic.pause(200)
        while (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 0 && maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 0) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
        }
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    }
}
radio.setGroup(33)
maqueenPlusV2.I2CInit()
basic.forever(function () {
	
})
