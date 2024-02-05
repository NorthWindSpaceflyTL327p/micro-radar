radio.onReceivedValue(function on_received_value(name: string, value: number) {
    
    if (name == "Alarm-Start") {
        Alarm = 1
    } else if (name == "Alarm-Clear") {
        Alarm = 0
    } else {
        
    }
    
})
let Distance = 0
let Sonar_Echo_Delay = 0
let Sonar_Send = 0
let Servo_Rotation_Angles = 0
let Alarm = 0
radio.setGroup(118)
OLED12864_I2C.init(60)
basic.forever(function on_forever() {
    
    for (let index = 0; index < 180; index++) {
        Servo_Rotation_Angles += 1
        pins.servoWritePin(AnalogPin.P4, Servo_Rotation_Angles)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P1, 1)
        control.waitMicros(10)
        pins.digitalWritePin(DigitalPin.P1, 0)
        control.waitMicros(10)
        Sonar_Send = control.eventTimestamp()
        if (!((control.eventTimestamp() - Sonar_Send) * 0.034 / 2 < 400)) {
            Sonar_Echo_Delay = control.eventTimestamp() - Sonar_Send
            Distance = (control.eventTimestamp() - Sonar_Send) * 0.034 / 2
        } else {
            Distance = 400
        }
        
        radio.sendValue("Distance", Distance)
    }
    for (let index2 = 0; index2 < 180; index2++) {
        Servo_Rotation_Angles += -1
        pins.servoWritePin(AnalogPin.P4, Servo_Rotation_Angles)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P1, 1)
        control.waitMicros(10)
        pins.digitalWritePin(DigitalPin.P1, 0)
        control.waitMicros(10)
        Sonar_Send = control.eventTimestamp()
        if (!((control.eventTimestamp() - Sonar_Send) * 0.034 / 2 < 400)) {
            Sonar_Echo_Delay = control.eventTimestamp() - Sonar_Send
            Distance = (control.eventTimestamp() - Sonar_Send) * 0.034 / 2
        } else {
            Distance = 400
        }
        
        radio.sendValue("Distance", Distance)
    }
})
control.inBackground(function on_in_background() {
    if (Alarm == 1) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        basic.pause(100)
        music.rest(music.beat(BeatFraction.Whole))
    } else if (false) {
        
    } else {
        
    }
    
})
