package shared_package;

import lejos.hardware.motor.Motor;
import lejos.robotics.subsumption.Behavior;

public class Aggression implements Behavior {

	private boolean suppressed = false;
	private AmbientSensor amb;

	public Aggression(AmbientSensor amb) {
		this.amb = amb;
	}

	@Override
	public boolean takeControl() {
		return !suppressed;
	}

	@Override
	public void action() {
		adjustMotors2();
		Motor.D.forward();
		Motor.A.forward();
	}

	private void adjustMotors() {
		float leftSpeed = 100 * 1 / amb.getRatio() * amb.getOverallAmbiance();
		float rightSpeed = 100 * amb.getRatio() * amb.getOverallAmbiance();
		Motor.D.setSpeed(leftSpeed);
		Motor.A.setSpeed(rightSpeed);
	}

	private void adjustMotors2() {
		float leftSpeed = 600 * amb.getRightAmbiance() + 100;
		float rightSpeed = 600 * amb.getLeftAmbiance() + 100;
		Motor.D.setSpeed(leftSpeed);
		Motor.A.setSpeed(rightSpeed);
	}

	@Override
	public void suppress() {
		this.suppressed = true;
	}

}
