public class OOPSBannerApp {
  // Inner static class to encapsulate character-to-pattern mapping
    static class CharacterPatternMap {
        private Character character;
        private String[] pattern;

        public CharacterPatternMap(Character character, String[] pattern) {
            this.character = character;
            this.pattern = pattern;
        }

        public Character getCharacter() { 
            return character; 
        }

        public String[] getPattern() { 
            return pattern; 
        }
    }

    public static void main(String[] args) {
        // Initialize the array of pattern objects
        CharacterPatternMap[] charMaps = createCharacterPatternMaps();
        // Define message and print
        String message = "OOPS";
        printMessage(message, charMaps);
    }

    public static CharacterPatternMap[] createCharacterPatternMaps() {
        // Create objects for O, P, S and Space [cite: 887-890]
        return new CharacterPatternMap[] {
            new CharacterPatternMap('O', new String[]{"  *** ", " ** ** ", "** **", "** **", "** **", " ** ** ", "  *** "}),
            new CharacterPatternMap('P', new String[]{"****** ", "** **", "** **", "****** ", "** ", "** ", "** "}),
            new CharacterPatternMap('S', new String[]{" ***** ", "** ", "** ", " ***** ", "     **", "     **", " ***** "}),
            new CharacterPatternMap(' ', new String[]{"       ", "       ", "       ", "       ", "       ", "       ", "       "})
        };
    }

    public static String[] getCharacterPattern(char ch, CharacterPatternMap[] charMaps) {
        // Linear search to find matching character pattern [cite: 893-895]
        for (CharacterPatternMap map : charMaps) {
            if (map.getCharacter().equals(ch)) {
                return map.getPattern();
            }
        }
        return getCharacterPattern(' ', charMaps); // Return space if not found [cite: 978]
    }

    public static void printMessage(String message, CharacterPatternMap[] charMaps) {
        // Loop through each of the 7 lines of the banner height [cite: 898]
        for (int i = 0; i < 7; i++) {
            StringBuilder sb = new StringBuilder();
            for (char ch : message.toCharArray()) {
                // Get pattern for character and append the specific line
                String[] pattern = getCharacterPattern(ch, charMaps);
                sb.append(pattern[i]).append(" "); 
            }
            System.out.println(sb.toString());
        }
    }
}
