import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.Map;

import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;
import com.alibaba.fastjson.*;
import com.alibaba.fastjson.JSON;



/**
 * 服务器端业务逻辑
 */
public class ServerHandler extends IoHandlerAdapter {
	Database instance = Database.getDatabaseInstance();

	/**
	 * 连接创建事件
	 */
	@Override
	public void sessionCreated(IoSession session) {
		// 显示客户端的ip和端口
		System.out.println(session.getRemoteAddress().toString());
	}

	@Override
	// 异常抓取并反馈
	public void exceptionCaught(IoSession session, Throwable cause) throws Exception {
		cause.printStackTrace();
	}

	/**
	 * 消息接收事件
	 */
	@Override
	// 收到消息后，自动调用此方法
	public void messageReceived(IoSession session, Object message) throws Exception {
		// 处理收到信息
		// 利用下面写的函数，将buffer转化为string
		//String content = ioBufferToString(message);
		// 打印收到的信息
		System.out.println("server receive a message is : " + message);

		/*
		 * 此处根据fastjson库确定传过来的字符串怎么处理变成json对象 JSONObject request =
		 * JSONObject.fromObject(message.toString()); 根据传来的数据进行处理
		 * System.out.println(request);
		 * 
		 * 
		 */
		String content =message.toString();
		
		

		
		
		/*
		 * 服务器逻辑核心 用传过来的type转化为int型来判断客户端请求 通过switch语句来实现对不同请求的不同处理
		 * 每个case中都调用本.java中的private私有函数来处理请求 逻辑正式运算以及数据库接口的使用全部在private方法中
		 */
		JSONObject typeOb = JSON.parseObject(content);
		String typeStr = typeOb.getString("type");
		int typeInt = Integer.parseInt(typeStr);
		//此处已经转为int
		
		switch (typeInt) {
		case 100: {
			// 100type对应的请求，调用何种private
			// 注册
		}
			break;
		case 101: {
			// 101type对应的请求，调用何种private
			// 登录
			//将session加入session管理器！！
			
		}
			break;
		case 102: {
			// 102type对应的请求，调用何种private
			// 查询个人信息
		}
		case 103: {
			// 103type对应的请求，调用何种private
			// 提交大师兄意向
		}
		case 104: {
			// 104type对应的请求，调用何种private
			// 提交带哥意向
		}
		case 105:{
			/*
			 * 105type对应的请求，调用private
			 * 查询所有商品信息
			 */
		}
		case 999:{
			System.out.println("ok!!!!!!");
			SessionManager.getManager().add("test",session);
			SessionManager.getManager().send("test");
			session.write("def");
		}
		default: {
			// default语句，返回false
			session.write(false);
			// 应该是json的false格式，以后再改
		}

		}

	}

	@Override
	// 获取等待间隔数
	// 客户端无请求时+1
	public void sessionIdle(IoSession session, IdleStatus status) throws Exception {
		System.out.println("IDLE" + session.getIdleCount(status));
	}

	// 向客户端发送信息
	public void messageSent(IoSession session, Object message) throws Exception {
		// 依然是监听发送后的响应，但是发送操作不在这里执行
		// 发送操作应该在接下来的函数中，根据客户端请求发送
		// 根据需求，服务器从不主动发送信息
		// 所有情况均为响应客户端要求
		System.out.println("ServerMessageSent -> ：" + message);
		// 此方法暂时为接口，日后会用到
	}

	public void sessionClosed(IoSession session) throws Exception {
        super.sessionClosed(session);
        System.out.println("session closed ");
        SessionManager.getManager().remove(session);
    }
	

	
	/*
	 * 从此往下的这一部分是工具函数
	 * 1.buffer转string
	 * 2.数据库读取数据加报头
	 * 3.数据库读取数据加报尾
	 * 4.报头报尾合并
	 */
	
	
	
	// 1.buffer转string函数
	public static String ioBufferToString(Object message) {
		if (!(message instanceof IoBuffer)) {
			return "";
		}
		IoBuffer ioBuffer = (IoBuffer) message;
		byte[] b = new byte[ioBuffer.limit()];
		ioBuffer.get(b);
		StringBuffer stringBuffer = new StringBuffer();

		for (int i = 0; i < b.length; i++) {

			stringBuffer.append((char) b[i]);
		}
		return stringBuffer.toString();
	}

	
	//2.加报头
	
	public String addHead(String type,String message) {
		String head="{\"type\":"+type+",\"state\":0,\"data\":";
		return head+message;
	}
	
	//3.加报尾
	public String addTail(String message) {
		//直接返回加“}”
		return message+"}";
	}
	
	//4.报头报尾合并
	
	public String addHeadTail(String type,String message) {
		return
				addTail(addHead(type,message));
	}
	
	
	
	
	
	
	
	/*
	 * 从此往上的这一部分是工具函数
	 * 
	 * 
	 * 
	 */
	
	
	
	
	
	
	
	// private方法如下：
	// 注册
	private void signIn(IoSession session, Object message) throws Exception {
		// message 转string
		String content = ioBufferToString(message);
		JSONObject messageObj = JSON.parseObject(content);
		String data = messageObj.getString("data");
		// 写入数据库
		// 调用增加接口
		try {
			instance.insertTableInfo("UserInfo", data);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			session.write(false);
			return;
		}

		session.write(true);
		return;

	}

	
	
	
	
	// 登录验证
	private void signUp(IoSession session, Object message) throws Exception {
		// message 转string
		String content = ioBufferToString(message);
		// json方法
		JSONObject info = JSON.parseObject(content);
		String UserID = info.getString("UserID");
		String psw = info.getString("psw");

		// 写入数据库
		// 调用查询接口
		try {
			// 此处返回个人信息
			// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			String actually = instance.getTableInfo("User", "UserID", UserID, "psw");
			JSONObject actuallyObj = JSONObject.parseObject(actually);
			if ((actuallyObj.getString("psw")).equals(psw)) {
				session.write("{\"type\":101,\"state\":1}");
				
				/*
				 * 在登录时将session保存加入静态session管理器
				 * 断网重连每次都登录
				 * 检测是否已经从管理器中删除
				 * 未删除的将原有删除加入新session
				 * 已删除的直接加入新session
				 * session是hashMap
				 * 键值对为  UserId：session
				 * 通过UserId查询对应session
				 * 通过已经保存的session来给客户端传递信息
				 */
				
				SessionManager.getManager().add(UserID,session);
				// 这里应该是true的json格式，以后再改
			} else {
				session.write(false);
				// 同理，应该是json的false格式，以后再改
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			return;
		}

		return;
	}

	
	
	
	
	
	// 用户每次查询个人信息均返回（调用次数较多）
	private void returnUserInfo(IoSession session, Object message) throws Exception {
		// message 转string
		String content = ioBufferToString(message);
		// json方法
		JSONObject info = JSON.parseObject(content);
		// json中传来的应该是用户id，所以
		String UserId = info.getString("UserID");
		// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
		try {
			String UserInfo = instance.getTableInfo("User", "UserID", UserId);
			// 直接发
			String UserInfo2=addHeadTail("102",UserInfo);
			session.write(UserInfo2);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			session.write(false);
			// json格式，需修改
			return;
		}

	}

	
	
	
	
	// 查询商品信息（每次下单都要看有哪些商品）
	private void getItemsInfo(IoSession session, Object message) throws Exception {
		// message 转string
		String content = ioBufferToString(message);
		// json方法
		JSONObject info = JSON.parseObject(content);
		/*
		 * 此处直接调用缺省值，将整张表都拿过来做一个object 这个object转成string然后直接给到客户端 客户端根据数据库方面方式解开
		 */
		try {
			String itemsInfo = instance.getTableInfo("ItemInfo");
			// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			// 直接发
			String itemsInfo2=addHeadTail("105",itemsInfo);
			session.write(itemsInfo2);

		} catch (Exception e) {
			e.printStackTrace();
			session.write(false);
			// json格式，需修改
			return;
		}

	}

	
	
	
	// 接受大师兄意向信息
	private void wantInfo(IoSession session, Object message) throws Exception {
		// message 转string
		String content = ioBufferToString(message);
		// json方法
		JSONObject info = JSON.parseObject(content);
		String data = info.getString("data");
		/*
		 * 接收过来大师兄意向信息 写入数据库
		 */
		try {
			// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			instance.insertTableInfo("wantInfo", data);
			// json格式，需修改
			// session.write(true);
			/*
			 * 没有错误就不返回 有错误就向服务器返回false
			 */
		} catch (Exception e) {
			e.printStackTrace();
			session.write(false);
			// json格式，需修改
			return;
		}
	}

	
	
	
	// 接受带哥意向信息
	private void wantedInfo(IoSession session, Object message) throws Exception {
		// message 转string
		String content = ioBufferToString(message);
		// json方法
		JSONObject info = JSON.parseObject(content);
		String data = info.getString("data");
		JSONObject dataObj=JSONObject.parseObject(data);
		String location=dataObj.getString("location");
		String time = dataObj.getString("time");
		//Boolean bigOrNot=dataObj.getBoolean("AcceptBigSize");
		//Boolean onDoor=dataObj.getBoolean("Accept");
		/*
		 * 接收过来带哥意向信息 写入数据库
		 */
		try {
			// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			instance.insertTableInfo("wantedInfo", data);
			// json格式，需修改
			// session.write(true);
			/*
			 * 没有错误就不返回 有错误就向服务器返回false
			 */
			
			
			
			
			/*
			 * 返回当前可用订单
			 * 调用函数
			 */
			
			
			
			
			/*
			 * 核心函数
			 */
			matchAlreadyOrder(session,location,time);
			/*
			 * 核心函数
			 */
			
			
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
			session.write(false);
			// json格式，需修改
			return;
		}

	}
	
	
	/*
	 * 返回当前可用订单
	 * 此方法写入
	 * wantInfo中
	 * 作为wantInfo的方法函数使用
	 */
	private void matchAlreadyOrder(
			IoSession session,String location ,String time )
					throws Exception
	{
		try {
			String wantInfo = instance.getTableInfo("wantInfo");
			// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			//转map函数
			Map[] wantMap=instance.toMapArray("wantInfo");
			
			/*
			 * 判断是否符合订单信息
			 * 不符合的写入null
			 */
			for(int i=0;i<wantMap.length;i++) {
				if((!(wantMap[i].get("location").equals("location")))
						||
						(!(wantMap[i].get("time").equals("time")))
						
						)
					wantMap[i]=null;	
			}
			/*
			 * 将null去掉
			 * 写入另一个map数组
			 */
			Map[] wantMap2=new Map[100];
			int j=0;
			for(int i=0;i<wantMap.length;i++) {
				if(wantMap[i]!=null) {
					wantMap2[j]=wantMap[i];
					j++;
				}
			}
			
			
			/*
			 * 将数组中的map元素全部转化为String
			 * 再转成jsonobject
			 * 再加入jsonarray
			 * 再把jsonarray转字符串
			 * 再加报头报尾
			 * 发送
			 * 
			 */
			String tempStr=null;
			JSONObject tempObj=null;
			JSONArray wantMapArray=new JSONArray();
			for(int i=0;i<j;i++) {
				 tempStr=JSON.toJSONString(wantMap2[i]);
				 tempObj=JSONObject.parseObject(tempStr);
				 wantMapArray.add(tempObj);
			}
			//转string
			String alreadyMatchOrders=wantMapArray.toJSONString();
			//加报头报尾
			String orders=addHeadTail("196",alreadyMatchOrders);
			
			
			//发送
			session.write(orders);
			

		} catch (Exception e) {
			e.printStackTrace();
			session.write(false);
			// json格式，需修改
			return;
		}

		
	}
	
	
	//
	
	

}
