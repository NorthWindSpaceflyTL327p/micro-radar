def on_received_value(name, value):
    global Alarm
    if name == "Alarm-Start":
        Alarm = 1
    elif name == "Alarm-Clear":
        Alarm = 0
    else:
        pass
radio.on_received_value(on_received_value)

Distance = 0
Sonar_Echo_Delay = 0
Sonar_Send = 0
Servo_Rotation_Angles = 0
Alarm = 0
radio.set_group(118)
OLED12864_I2C.init(60)

def on_forever():
    global Servo_Rotation_Angles, Sonar_Send, Sonar_Echo_Delay, Distance
    for index in range(180):
        Servo_Rotation_Angles += 1
        pins.servo_write_pin(AnalogPin.P4, Servo_Rotation_Angles)
        pins.digital_write_pin(DigitalPin.P1, 0)
        pins.digital_write_pin(DigitalPin.P1, 1)
        control.wait_micros(10)
        pins.digital_write_pin(DigitalPin.P1, 0)
        control.wait_micros(10)
        Sonar_Send = control.event_timestamp()
        if not ((control.event_timestamp() - Sonar_Send) * 0.034 / 2 < 400):
            Sonar_Echo_Delay = control.event_timestamp() - Sonar_Send
            Distance = (control.event_timestamp() - Sonar_Send) * 0.034 / 2
        else:
            Distance = 400
        radio.send_value("Distance", Distance)
    for index2 in range(180):
        Servo_Rotation_Angles += -1
        pins.servo_write_pin(AnalogPin.P4, Servo_Rotation_Angles)
        pins.digital_write_pin(DigitalPin.P1, 0)
        pins.digital_write_pin(DigitalPin.P1, 1)
        control.wait_micros(10)
        pins.digital_write_pin(DigitalPin.P1, 0)
        control.wait_micros(10)
        Sonar_Send = control.event_timestamp()
        if not ((control.event_timestamp() - Sonar_Send) * 0.034 / 2 < 400):
            Sonar_Echo_Delay = control.event_timestamp() - Sonar_Send
            Distance = (control.event_timestamp() - Sonar_Send) * 0.034 / 2
        else:
            Distance = 400
        radio.send_value("Distance", Distance)
basic.forever(on_forever)

def on_in_background():
    if Alarm == 1:
        music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
        basic.pause(100)
        music.rest(music.beat(BeatFraction.WHOLE))
    elif False:
        pass
    else:
        pass
control.in_background(on_in_background)
