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
		Motor.A.forward();
		Motor.D.forward();
	}

	private void adjustMotors() {
		float leftSpeed = 100 * 1 / amb.getRatio() * amb.getOverallAmbiance();
		float rightSpeed = 100 * amb.getRatio() * amb.getOverallAmbiance();
		Motor.A.setSpeed(leftSpeed);
		Motor.D.setSpeed(rightSpeed);
	}

	private void adjustMotors2() {
		float leftSpeed = 100 * amb.getRightAmbiance();
		float rightSpeed = 100 * amb.getLeftAmbiance();
		Motor.A.setSpeed(leftSpeed);
		Motor.D.setSpeed(rightSpeed);
	}

	@Override
	public void suppress() {
		this.suppressed = true;
	}

}
