public class OOPSBannerApp {
  public static void main(String[] args) {
        // Retrieve patterns from helper methods [cite: 780-782]
        String[] oPattern = getOPattern();
        String[] pPattern = getPPattern();
        String[] sPattern = getSPattern();

        // Loop through each of the 7 lines [cite: 786]
        for (int i = 0; i < oPattern.length; i++) {
            // Horizontal assembly using concatenation [cite: 725]
            System.out.println(oPattern[i] + " " + oPattern[i] + " " + pPattern[i] + " " + sPattern[i]);
        }
    }

    // Helper methods encapsulate pattern logic [cite: 674, 690]
    public static String[] getOPattern() {
        return new String[] {" ****", "** **", "** **", "** **", "** **", "** **", " ****"};
    }

    public static String[] getPPattern() {
        return new String[] {"******", "** **", "** **", "******", "** ", "** ", "** "};
    }

    public static String[] getSPattern() {
        return new String[] {" ****", "** ", "** ", " **** ", "    **", "    **", "**** "};
    }
}
