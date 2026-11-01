import javax.swing.*;
import java.awt.*;

public class SimpleMain {
    
    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println("  Student Management System");
        System.out.println("========================================");
        
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            System.err.println("Error setting look and feel");
        }
        
        SwingUtilities.invokeLater(() -> {
            createLoginFrame();
        });
    }
    
    private static void createLoginFrame() {
        JFrame loginFrame = new JFrame("Student Management System - Login");
        loginFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        loginFrame.setSize(500, 400);
        loginFrame.setLocationRelativeTo(null);
        
        JPanel mainPanel = new JPanel(new BorderLayout());
        mainPanel.setBackground(new Color(25, 25, 112));
        
        JPanel centerPanel = new JPanel(new GridBagLayout());
        centerPanel.setBackground(new Color(25, 25, 112));
        
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        
        JLabel titleLabel = new JLabel("Student Management System");
        titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
        titleLabel.setForeground(Color.WHITE);
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 2;
        centerPanel.add(titleLabel, gbc);
        
        JLabel userLabel = new JLabel("Username:");
        userLabel.setFont(new Font("Arial", Font.PLAIN, 14));
        userLabel.setForeground(Color.WHITE);
        gbc.gridy = 1;
        gbc.gridwidth = 1;
        centerPanel.add(userLabel, gbc);
        
        JTextField userField = new JTextField(15);
        gbc.gridx = 1;
        centerPanel.add(userField, gbc);
        
        JLabel passLabel = new JLabel("Password:");
        passLabel.setFont(new Font("Arial", Font.PLAIN, 14));
        passLabel.setForeground(Color.WHITE);
        gbc.gridx = 0;
        gbc.gridy = 2;
        centerPanel.add(passLabel, gbc);
        
        JPasswordField passField = new JPasswordField(15);
        gbc.gridx = 1;
        centerPanel.add(passField, gbc);
        
        JButton loginButton = new JButton("Login");
        loginButton.setFont(new Font("Arial", Font.BOLD, 14));
        loginButton.setBackground(new Color(70, 130, 180));
        loginButton.setForeground(Color.WHITE);
        loginButton.setFocusPainted(false);
        gbc.gridx = 0;
        gbc.gridy = 3;
        gbc.gridwidth = 2;
        gbc.fill = GridBagConstraints.CENTER;
        centerPanel.add(loginButton, gbc);
        
        loginButton.addActionListener(e -> {
            String username = userField.getText();
            String password = new String(passField.getPassword());
            
            if (username.equals("admin") && password.equals("admin123")) {
                JOptionPane.showMessageDialog(loginFrame, "Login Successful!");
                loginFrame.dispose();
                createDashboard();
            } else {
                JOptionPane.showMessageDialog(loginFrame, "Invalid credentials!", "Error", JOptionPane.ERROR_MESSAGE);
            }
        });
        
        mainPanel.add(centerPanel, BorderLayout.CENTER);
        loginFrame.add(mainPanel);
        loginFrame.setVisible(true);
    }
    
    private static void createDashboard() {
        JFrame dashboard = new JFrame("Student Management System - Dashboard");
        dashboard.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        dashboard.setSize(1200, 800);
        dashboard.setLocationRelativeTo(null);
        
        JPanel mainPanel = new JPanel(new BorderLayout());
        
        JPanel sidebar = new JPanel();
        sidebar.setLayout(new BoxLayout(sidebar, BoxLayout.Y_AXIS));
        sidebar.setBackground(new Color(25, 25, 112));
        sidebar.setPreferredSize(new Dimension(250, 0));
        sidebar.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        
        JLabel titleLabel = new JLabel("SMS Admin");
        titleLabel.setFont(new Font("Arial", Font.BOLD, 22));
        titleLabel.setForeground(Color.WHITE);
        titleLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
        
        sidebar.add(titleLabel);
        sidebar.add(Box.createVerticalStrut(30));
        
        String[] menuItems = {"Dashboard", "Students", "Teachers", "Courses", "Subjects", "Attendance", "Marks", "Reports", "Logout"};
        
        for (String item : menuItems) {
            JButton menuButton = new JButton(item);
            menuButton.setFont(new Font("Arial", Font.PLAIN, 14));
            menuButton.setBackground(new Color(25, 25, 112));
            menuButton.setForeground(Color.WHITE);
            menuButton.setBorder(BorderFactory.createEmptyBorder(12, 15, 12, 15));
            menuButton.setFocusPainted(false);
            menuButton.setHorizontalAlignment(SwingConstants.LEFT);
            menuButton.setMaximumSize(new Dimension(Integer.MAX_VALUE, 45));
            
            menuButton.addActionListener(evt -> {
                if (item.equals("Logout")) {
                    dashboard.dispose();
                    createLoginFrame();
                } else {
                    JOptionPane.showMessageDialog(dashboard, item + " module - Coming soon!");
                }
            });
            
            sidebar.add(menuButton);
            sidebar.add(Box.createVerticalStrut(10));
        }
        
        JPanel content = new JPanel(new BorderLayout());
        content.setBackground(new Color(240, 240, 240));
        content.setBorder(BorderFactory.createEmptyBorder(30, 30, 30, 30));
        
        JLabel headerLabel = new JLabel("Dashboard");
        headerLabel.setFont(new Font("Arial", Font.BOLD, 28));
        headerLabel.setForeground(new Color(25, 25, 112));
        
        JPanel statsPanel = new JPanel(new GridLayout(2, 4, 20, 20));
        statsPanel.setBackground(new Color(240, 240, 240));
        
        String[] stats = {"Total Students", "Total Teachers", "Total Courses", "Total Subjects", "Attendance Today", "Exams Pending", "Reports Generated", "Active Users"};
        Color[] colors = {
            new Color(70, 130, 180),
            new Color(34, 139, 34),
            new Color(255, 140, 0),
            new Color(220, 20, 60),
            new Color(147, 112, 219),
            new Color(0, 139, 139),
            new Color(255, 105, 180),
            new Color(60, 179, 113)
        };
        
        for (int i = 0; i < stats.length; i++) {
            JPanel statCard = new JPanel(new BorderLayout());
            statCard.setBackground(Color.WHITE);
            statCard.setBorder(BorderFactory.createLineBorder(new Color(200, 200, 200), 1));
            
            JLabel statLabel = new JLabel(stats[i]);
            statLabel.setFont(new Font("Arial", Font.BOLD, 14));
            statLabel.setForeground(colors[i]);
            statLabel.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));
            
            JLabel valueLabel = new JLabel("0");
            valueLabel.setFont(new Font("Arial", Font.BOLD, 24));
            valueLabel.setForeground(new Color(50, 50, 50));
            valueLabel.setBorder(BorderFactory.createEmptyBorder(0, 15, 15, 15));
            
            statCard.add(statLabel, BorderLayout.NORTH);
            statCard.add(valueLabel, BorderLayout.CENTER);
            statsPanel.add(statCard);
        }
        
        content.add(headerLabel, BorderLayout.NORTH);
        content.add(statsPanel, BorderLayout.CENTER);
        
        mainPanel.add(sidebar, BorderLayout.WEST);
        mainPanel.add(content, BorderLayout.CENTER);
        
        dashboard.add(mainPanel);
        dashboard.setVisible(true);
    }
}
