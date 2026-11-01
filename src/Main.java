import view.LoginFrame;

/**
 * Main Class
 * Entry point for the Student Management System
 * 
 * This is a complete Java Swing desktop application for managing
 * student information, teachers, courses, attendance, and marks.
 * 
 * Technology Stack:
 * - Frontend: Java Swing (JFrame, JPanel, JButton, JTable, etc.)
 * - Backend: Core Java with OOP concepts
 * - Database: MySQL with JDBC
 * - Design Patterns: Singleton, DAO, MVC
 * - Advanced Java: Collections, Streams, Lambda, Multithreading
 */
public class Main {
    
    /**
     * Main method - Application entry point
     * @param args Command line arguments
     */
    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println("  Student Management System");
        System.out.println("  College Administration Portal");
        System.out.println("========================================");
        System.out.println("Starting application...");
        
        // Launch the login frame using SwingUtilities
        // This ensures GUI is created on the Event Dispatch Thread
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                try {
                    // Set system look and feel
                    javax.swing.UIManager.setLookAndFeel(
                        javax.swing.UIManager.getSystemLookAndFeelClassName()
                    );
                } catch (Exception e) {
                    System.err.println("Error setting look and feel: " + e.getMessage());
                }
                
                // Create and show login frame
                LoginFrame loginFrame = new LoginFrame();
                loginFrame.setVisible(true);
                
                System.out.println("Application started successfully!");
            }
        });
    }
}
