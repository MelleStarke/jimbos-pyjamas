package braitenberg;

import lejos.*;
import lejos.robotics.subsumption.Arbitrator;
import lejos.robotics.subsumption.Behavior;

public class main
{
  static ColorSensor cs1;
  static ColorSensor cs2;
  
  public static void main(String[] args)
  {
    Behavior[] test = new Behavior[1];
    test[1] = new Behavior_Fear(cs1, cs2);
    
    Arbitrator arbi=new Arbitrator(test);
    arbi.start();
  }
}
