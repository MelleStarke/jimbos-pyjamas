package shared_package;

import lejos.hardware.port.Port;
import lejos.hardware.port.SensorPort;
import lejos.hardware.sensor.EV3ColorSensor;
import lejos.hardware.sensor.EV3UltrasonicSensor;

public class Main {

	public static void main(String[] args) {
		Port lightSensorR = (Port) new EV3ColorSensor(SensorPort.S1);
		Port lightSensorL = (Port) new EV3ColorSensor(SensorPort.S4);
		Port ultraSonic = (Port) new EV3UltrasonicSensor(SensorPort.S3);

	}

}
