package dbservice;
/*
 * Fetcher Server Database Module V3.2
 * Provide interfaces of database operations
 * Including get, set, insert, delete methods 
 * Developed by Fan.W (Fetcher Group)
 * 
 * Update Log 2018/08/24 10:26
 * 1.Release V1.0
 * 2.Test interfaces locally
 * 
 * Update Log 2018/08/24 11:08
 * 1.Change constructor modifier to private
 * 2.Add a constructor with parameters
 * 3.Add a static method to create single object of Database 
 * 
 * Update Log 2018/08/27 10:53
 * 1.Release V2.0
 * 2.Delete overload of each method, merge String and Integer parameters into Object parameters
 * 3.Override the notes
 * 
 * Update Log 2018/08/28 9:27
 * 1.Release V3.0
 * 2.Redefine the return type and parameters of get-method, to fit the JSONObeject protocol
 * 3.Override the get-method, add two overloads
 * 4.Redefine the parameters of insert-method, to fit the JSONObeject protocol
 * 5.Override the insert-method
 * 
 * Update Log 2018/08/29 16:50
 * 1.Add method toMapArray
 * 2.Add method toJSONArrayString
 * 
 * Update Log 2018/08/31 9:30
 * 1.Add method overload for toJSONArrayString, to be used for get-methods
 * 2.Override the note 
 */
import java.sql.*;
import java.util.*;
import java.util.Map.Entry;

import com.alibaba.fastjson.*;

public class Database{
	
	//Define SQL objects, single instance of Database
	Connection connection;
	Statement statement;
	ResultSet rs;
	static Database dbinstance;
	
	//Default Constructor, connect to MySQL server
	private Database(){
		try {
		String dbURL = "jdbc:mysql://localhost:3306/" +
				"fetcher?user=root&password=destiny25";
		System.out.println(dbURL);
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection(dbURL);
		statement = connection.createStatement();
		if (!connection.isClosed())
			System.out.println("Successfully connected to MySQL server...");
		} catch (SQLException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	//Constructor with parameters
	private Database(String schema, String username, String password){
		try {
		String dbURL = "jdbc:mysql://localhost:3306/" +
				schema+"?user="+username+"&password="+password;
		System.out.println(dbURL);
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection(dbURL);
		statement = connection.createStatement();
		if (!connection.isClosed())
			System.out.println("Successfully connected to MySQL server...");
		} catch (SQLException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//Trans-method, make JSONArray String into Map[]
	public Map[] toMapArray(String jsonarr) {
		JSONArray arr = JSONArray.parseArray(jsonarr);
		@SuppressWarnings("unchecked")
		Map<String, Object>[] list = new Map[arr.size()];
		for(int i=0;i<arr.size();i++) {
			@SuppressWarnings("unchecked")
			Map<String, Object> mapType = JSON.parseObject(arr.getString(i),Map.class);
			list[i] = mapType;
		}
		return list;
	}
	//Trans-methods, make Map[] into JSONArray String
	public String toJSONArrayString(Map[] map) {
		JSONArray arr = new JSONArray();
		JSONObject tempobj;
		String tempstr;
		for(int i=0;i<map.length;i++) {
			tempstr = JSON.toJSONString(map[i]);
			tempobj = JSONObject.parseObject(tempstr);
			arr.add(tempobj);
		}
		return arr.toJSONString();
	}
	//Method-overload, make ResultSet into JSONArray String
	private String toJSONArrayString(ResultSet rs) throws SQLException{
		JSONArray arr = new JSONArray();
		ResultSetMetaData rsmd;
		rsmd = rs.getMetaData();
		int col = rsmd.getColumnCount();
		while(rs.next()) {
			HashMap<String,String> row = new HashMap<String,String>();
			for(int i=1;i<=col;i++) {
				String colname = rsmd.getColumnName(i);
				row.put(colname, rs.getString(colname));
			}
			JSONObject obj = JSONObject.parseObject(JSON.toJSONString(row));
			arr.add(obj);
		}
		System.out.println(arr.toJSONString());
		return arr.toJSONString();
	}
	
	//Get-method, parameters defining table name, return JSONString(JSONArray) of the whole table
	public String getTableInfo(String table) throws SQLException {
		statement.executeQuery("SELECT * FROM "+table);
		System.out.println("SELECT * FROM "+table);
		rs = statement.getResultSet();
		return toJSONArrayString(rs);
	}
	//Get-method overload, parameters defining the restrictive and values, return the JSONString(JSONArray) of rows
	public String getTableInfo(String table, String item, Object value) throws SQLException {
		statement.executeQuery("SELECT * FROM "+table+" WHERE "+item+" = '"+value.toString()+"'");
		System.out.println("SELECT * FROM "+table+" WHERE "+item+" = '"+value.toString()+"'");
		rs = statement.getResultSet();
		return toJSONArrayString(rs);
	}
	//Get-method overload, parameter defining the target-item, return the JSONString(JSONObject) of target-item and value
	public String getTableInfo(String table, String item, Object value, String targetitem) throws SQLException {
		statement.executeQuery("SELECT "+targetitem+" FROM "+table+" WHERE "+item+" = '"+value.toString()+"'");
		System.out.println("SELECT "+targetitem+" FROM "+table+" WHERE "+item+" = '"+value.toString()+"'");
		rs = statement.getResultSet();
		rs.next();
		String str = "{'"+targetitem+"':'"+rs.getString(targetitem)+"'}";
		JSONObject obj = JSONObject.parseObject(str);
		System.out.println(obj.toJSONString());
		return obj.toJSONString();
	}
	
	//Delete-method, parameters defining table name, restrictive and its value, delete a row from database
	public void deleteTableRow(String table, String item, Object value) throws SQLException {
		statement.executeUpdate("DELETE FROM "+table+" WHERE "+item+" = '"+value.toString()+"'");
		System.out.println("DELETE FROM "+table+" WHERE "+item+" = '"+value.toString()+"'"); 
	}

	//Set-method, parameters defining table name, restrictive and its value, target item and its value, change value in the database
	public void setTableInfo(String table, String itemA, Object valueA, String itemB, Object valueB) throws SQLException {
		statement.executeUpdate("UPDATE "+table+" SET "+itemB+" = '"+valueB.toString()+"' WHERE "+itemA+ " = '"+valueA.toString()+"'");
		System.out.println("UPDATE "+table+" SET "+itemB+" = '"+valueB.toString()+"' WHERE "+itemA+ " = '"+valueA.toString()+"'"); 
	}
	
	//Insert-method, parameters define table name, JSONString of item-value pairs, insert a new row into database
	public void insertTableInfo(String table, String data) throws SQLException {
		@SuppressWarnings("unchecked")
		Map<String, Object> set = JSON.parseObject(data,Map.class);
		String items = "";
		String values = "";
		Set<Entry<String, Object>> entrySet = set.entrySet();
		Iterator<Entry<String, Object>> it = entrySet.iterator();
		while(it.hasNext()) {
			Entry<String, Object> me = it.next();
			items += me.getKey()+",";
			values +="'"+me.getValue()+"',";
		}
		items = items.substring(0,items.length()-1);
		values = values.substring(0,values.length()-1);
		statement.executeUpdate("INSERT INTO "+table+" ("+items+") VALUES ("+values+")");
		System.out.println("INSERT INTO "+table+" ("+items+") VALUES ("+values+")");
	}
	
	//Get-method, get the single instance of Database
	public static Database getDatabaseInstance() {
		if(dbinstance == null) {
			dbinstance = new Database();
			return dbinstance;
		}
		else
			return dbinstance;
	}
	
	//Get-method, construct new Database object with given values.
	public static Database getDatabaseInstance(String schema, String username, String password) {
		dbinstance = new Database(schema,username,password);
		return dbinstance;
	}

	//Test-Method
	public static void main(String[] args) throws SQLException {
		Map<String,Object> set = new HashMap<String,Object>();
		set.put("UserID", 10000);
		set.put("Username", "王帆");
		set.put("NickName","RavenSpear");
		set.put("Psw","destiny25");
		//getDatabaseinstance().insertTableInfo("user", "{'UserID':10002,'UserName':'孟霖','NickName':'merlin','Psw':'xixixi'}");
		//getDatabaseinstance().setTableInfo("user", "UserName", "王帆", "NickName", "Boris");
		String obj = getDatabaseInstance().getTableInfo("user");
		//JSONArray arr = JSONArray.parseArray(obj);
		Map<String, Object>[] arr = getDatabaseInstance().toMapArray(obj);
		System.out.println(arr[0].get("UserName"));
		//getDatabaseinstance().deleteTableRow("user", "UserID", 10000);
	}
}