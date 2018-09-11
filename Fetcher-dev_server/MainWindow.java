
import java.awt.Color;

import javax.swing.JFrame;
import javax.swing.UIManager;
import java.net.*;
import java.io.*;

public class MainWindow {
	public static void main(String args[]) {
		ServerFrame frame = new ServerFrame();
		frame.setBackground(Color.white);
		frame.setBounds(100, 100, 650, 500);
		frame.setTitle("服务器");
		frame.setLocationRelativeTo(null);// 窗体居中显示
		frame.setVisible(true);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}
}
