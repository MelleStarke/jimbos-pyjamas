package shared_package;

import lejos.hardware.port.Port;
import lejos.hardware.port.SensorPort;
import lejos.hardware.sensor.EV3ColorSensor;
import lejos.hardware.sensor.EV3UltrasonicSensor;
import lejos.robotics.subsumption.Arbitrator;

public class Main {

	public static void main(String[] args){
		EV3ColorSensor lightSensorR = new EV3ColorSensor(SensorPort.S3);
		EV3ColorSensor lightSensorL = new EV3ColorSensor(SensorPort.S4);
		EV3UltrasonicSensor ultraSonic = new EV3UltrasonicSensor(SensorPort.S1);
		
		AmbientSensor amb = new AmbientSensor(lightSensorL, lightSensorR);
		
		Aggression[] aggro = {new Aggression(amb)};
		
		Arbitrator arie = new Arbitrator(aggro);
		arie.start();
	}

}
