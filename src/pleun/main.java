package pleun;

import lejos.*;
import lejos.robotics.subsumption.Arbitrator;
import lejos.robotics.subsumption.Behavior;

public class main
{
  static ColorSensor csLeft = new ColorSensor(4);
  static ColorSensor csRight = new ColorSensor(3);
  
  public static void main( String[] args ) {
    Behavior[] test = { new Behavior_Exploration(csLeft, csRight) };
    
    Arbitrator arbi = new Arbitrator(test);
    arbi.start();
  }
}
