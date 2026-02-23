public class OOPSBannerApp {
  public static void main(String[] args) {
          // Initialize the HashMap collection
          HashMap<Character, String[]> charMap = createCharacterMap();
          String message = "OOPS";
          // Call display function
          displayBanner(message, charMap);
      }
  
      public static HashMap<Character, String[]> createCharacterMap() {
          HashMap<Character, String[]> charMap = new HashMap<>();
          
          // Populate patterns into the Map [cite: 1142-1144]
          charMap.put('O', new String[]{"  *** ", " ** ** ", "** **", "** **", "** **", " ** ** ", "  *** "});
          charMap.put('P', new String[]{"****** ", "** **", "** **", "****** ", "** ", "** ", "** "});
          charMap.put('S', new String[]{" ***** ", "** ", "** ", " ***** ", "     **", "     **", " ***** "});
          charMap.put(' ', new String[]{"       ", "       ", "       ", "       ", "       ", "       ", "       "});
          
          return charMap;
      }
  
      public static void displayBanner(String message, HashMap<Character, String[]> charMap) {
          // Determine pattern height (assuming all characters are 7 lines high) [cite: 1155]
          int patternHeight = 7;
  
          // Iterate line by line to build the banner horizontally [cite: 1096]
          for (int line = 0; line < patternHeight; line++) {
              StringBuilder sb = new StringBuilder();
              for (char ch : message.toCharArray()) {
                  // Look up the pattern in the HashMap [cite: 1101]
                  String[] pattern = charMap.get(ch);
                  if (pattern == null) {
                      pattern = charMap.get(' '); // Default to space if char not found
                  }
                  sb.append(pattern[line]).append(" "); 
              }
              // Print the assembled line to the console [cite: 1103]
              System.out.println(sb.toString());
          }
      }
}
