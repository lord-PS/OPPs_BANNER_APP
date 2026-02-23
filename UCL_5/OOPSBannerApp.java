public class OOPSBannerApp {
  public static void main(String[] args) {
        // Inline initialization reduces code volume [cite: 544]
        String[] lines = {
            String.join("", " ****", " ", " ****", " ", "****** ", " ", " **** "),
            String.join("", "** **", " ", "** **", " ", "** **", " ", "** "),
            String.join("", "** **", " ", "** **", " ", "** **", " ", "** "),
            String.join("", "** **", " ", "** **", " ", "****** ", " ", " **** "),
            String.join("", "** **", " ", "** **", " ", "** ", " ", "    **"),
            String.join("", "** **", " ", "** **", " ", "** ", " ", "    **"),
            String.join("", " ****", " ", " ****", " ", "** ", " ", " **** ")
        };

        // Standard loop-based rendering [cite: 530]
        for (String line : lines) {
            System.out.println(line);
        }
    }
}
