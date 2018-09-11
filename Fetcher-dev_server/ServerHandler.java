import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;
import com.alibaba.fastjson.*;
import com.alibaba.fastjson.JSON;

import dbservice.Base64coder;
import dbservice.Database;
import filter.MinaBean;
import utils.WebSocketUtil;
import view.IUpdateViewFactory;




/**
 * 服务器端业务逻辑
 */
@SuppressWarnings({ "unused", "unused" })
public class ServerHandler extends IoHandlerAdapter {
	Database instance = Database.getDatabaseInstance();

	/**
	 * 连接创建事件
	 */
	@Override
	public void sessionCreated(IoSession session) {
		// 显示客户端的ip和端口
		System.out.println(session.getRemoteAddress().toString());
		IUpdateViewFactory.getUpdateView().updateLineNumber(
				session.getService().getManagedSessionCount());
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
		//System.out.println("server receive a message is : " + message);

		/*
		 * 此处根据fastjson库确定传过来的字符串怎么处理变成json对象 JSONObject request =
		 * JSONObject.fromObject(message.toString()); 根据传来的数据进行处理
		 * System.out.println(request);
		 * 
		 * 
		 */
		//String content =message.toString();
		IUpdateViewFactory.getUpdateView().log(
				"[messageReceived] " + message.toString());
		MinaBean minaBean = (MinaBean) message;
		MinaBean sendMessage = minaBean;
		
		if (minaBean.isWebAccept()) {
			
			sendMessage.setContent(WebSocketUtil.getSecWebSocketAccept(minaBean
					.getContent()));
			session.write(sendMessage);
			//System.out.println(minaBean.getContent());
			//MinaBean ok=new MinaBean("okkkkk");
			//session.write(ok);
		} /*else {
			Collection<IoSession> ioSessionSet = session.getService()
					.getManagedSessions().values();
			for (IoSession is : ioSessionSet) {
				is.write(message);
			}
		}*/
		

		
		
		/*
		 * 服务器逻辑核心 用传过来的type转化为int型来判断客户端请求 通过switch语句来实现对不同请求的不同处理
		 * 每个case中都调用本.java中的private私有函数来处理请求 逻辑正式运算以及数据库接口的使用全部在private方法中
		 */
		
		
		
		
		
		String content=EOSDecoder(minaBean.getContent());
		
		
		
		System.out.println("iiii"+content);
		JSONObject typeOb = JSON.parseObject(content);
		String typeStr = typeOb.getString("type");
		int typeInt = Integer.parseInt(typeStr);;
		//此处已经转为int
		
		switch (typeInt) {
		case 99: {
			// Splash
			Splash(session,content);
		}
			break;
		case 100: {
			// 100type对应的请求，调用何种private
			// 注册
			signIn(session,content);
		}
			break;
		case 101: {
			// 101type对应的请求，调用何种private
			// 登录
			//将session加入session管理器！！
			signUp(session,content);
		}
			break;
		case 102: {
			// 102type对应的请求，调用何种private
			// 查询个人信息
			returnUserInfo(session,content);
		}
			break;
		case 103: {
			// 103type对应的请求，调用何种private
			// 提交大师兄意向
			wantInfo(session,content);
		}
			break;
		case 104: {
			// 104type对应的请求，调用何种private
			// 提交带哥意向
			wantedInfo(session,content);
		}
		break;
		case 105:{
			/*
			 * 105type对应的请求，调用private
			  * initialize
			 */
			getInitial(session,content);
		}
		break;
		case 999:{
			System.out.println("ok!!!!!!");
			SessionManager.getManager().add("test",session);
			SessionManager.getManager().send("test");
			session.write(new MinaBean("def"));
		}
		break;
		case 106:{
			/*
			 * keep matching
			 * 每次查询信息动态匹配返回
			 * */
			 keepMatching(session,content);
		}
		break;
		case 107:{
			/*
			 * 确认订单信息
			 * 匹配大师兄
			 * 如果sessionManager里有这个user我们直接返回订单被接
			 * 如果sessionManager里这个大师兄的session已经没了
			 * 我们就让所有人在登录时查看信息，跳出来提示
			 * 说已经被接单
			 * */
			acceptOrder(session,content);
		}
		break;
		/*case 108:{
			
			 * 查询订单信息
			 * 不管是大师兄还是带哥
			 * 根据UserId查询
			 * 得到结果应该一样
			 
			queryFetcherOrder(session,content);
		}
		break;*/
		case 109:{
			/*
			 * 查询订单详细信息
			 * 不管是大师兄还是带哥
			 * 根据UserId查询
			 * 
			 */
			orderDetail(session,content);
		}
		break;
		case 110:{
			/* 110
			 * confirm the complete of trade
			 */
			confirmTradeComplete(session,content);
		}
		break;
		case 111:{
			/* 111
			 * query single item info
			 */
			querySingleItemInfo(session,content);
		}
		break;
		case 112:{
			/*
			 * 查询订单信息
			 * 大师兄
			 * 
			 * 
			 */
			queryAllWantInfo(session,content);
		}
		break;
		case 113:{
			/*
			 * 查询所有带哥订单
			
			 * 
			 * 
			 */
			queryAllWantedInfo(session,content);
		}
		break;
		case 114:{
			/*
			 * 查询Fetcher
			 *  wanted信息
			
			 * 
			 * 
			 */
			queryWantedInfo(session,content);
		}
		break;
		default: {
			// default语句，返回false
			session.write(new MinaBean("{\"type\":999,\"state\":1}"));
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
		IUpdateViewFactory.getUpdateView().log(
				"[messageSent] [" + session.getRemoteAddress() + "] "
						+ message.toString());
	}

	public void sessionClosed(IoSession session) throws Exception {
        super.sessionClosed(session);
        System.out.println("session closed ");
        SessionManager.getManager().remove(session);
        IUpdateViewFactory.getUpdateView().updateLineNumber(
				session.getService().getManagedSessionCount());
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
	
	//5.解码
	public String EOSDecoder(String input) {
		return input.split("EOS")[0];
	}
	
	
	
	
	
	
	/*
	 * 从此往上的这一部分是工具函数
	 * 
	 * 
	 * 
	 */
	
	
	
	
	
	
	
	
	
	
	// private方法如下：
	// 注册
	private void signIn(IoSession session, String content) throws Exception {
		// message 转string
		
		JSONObject messageObj = JSON.parseObject(content);
		String data = messageObj.getString("data");
		JSONObject userNameObj=JSON.parseObject(data);
		String UserName=userNameObj.getString("UserName");
		// 写入数据库
		// 调用增加接口
		try {
			if(!(instance.IsExist("user", "UserName", UserName))) {
				instance.insertTableInfo("user", data);
				String userid=instance.getTableInfo("user", "UserName", UserName, "UserID");
				JSONObject idObj=JSON.parseObject(userid);
				int idStr=idObj.getIntValue("UserID");
				String insertbbinfo = new String("{\"UserID\":"+idStr+",\"TotalDistance\":0,\"TotalTime\":0,\"Counter\":0,\"Turnover\":0,\"Rate\":0}");
				String insertfetcherinfo = new String("{\"UserID\":"+idStr+",\"TotalDistance\":0,\"TotalTime\":0,\"Counter\":0,\"Turnover\":0,\"Rate\":0}");
				String insertuserinfo = new String("{\"UserID\":"+idStr+",\"Gender\":0,\"ExtraInfo\":\"\"}");
				instance.insertTableInfo("userinfo", insertbbinfo);
				instance.insertTableInfo("bbinfo", insertbbinfo);	
				instance.insertTableInfo("fetcherinfo", insertfetcherinfo);	
				session.write(new MinaBean("{\"type\":100,\"state\":0,\"UserID\":"+idStr+"}"));
			}else {
				session.write(new MinaBean("{\"type\":100,\"state\":2,\"data\":\"UserName has been used\"}"));
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			session.write(new MinaBean("{\"type\":100,\"state\":1}"));
			return;
		}
	}
	
	
	
	
	
	
	

	
	// 登录验证
			private void signUp(IoSession session, String content) throws Exception {
				// message 转string
				
				// json方法
				JSONObject info = JSON.parseObject(content);
				String dataStr=info.getString("data");
				JSONObject data = JSON.parseObject(dataStr);
				String UserID = data.getString("UserName");
				String psw = data.getString("Psw");

				// 写入数据库
				// 调用查询接口
				try {
					// 此处返回个人信息
					// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
					String actually = instance.getTableInfo("user", "UserName", UserID, "Psw");
					JSONObject actuallyObj = JSONObject.parseObject(actually);
					if ((actuallyObj.getString("Psw")).equals(psw)) {
						String id=instance.getTableInfo("user", "UserName", UserID, "UserID");
						JSONObject idObj=JSON.parseObject(id);
						String idStr=idObj.getString("UserID");
						
						String message="{\"type\":101,\"state\":0,\"data\":"
								
								+instance.getTableInfo("user", "UserName", UserID)+
								
								"}";
						session.write(new MinaBean(message));
						//session.write(new MinaBean("{type:101,\"state\":1}"));
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
						
						/*
						 * 判断是否有被接订单
						 * 提醒
						 * 格式191
						 */
						
						
						/*
						 * delete it for while
						 
						String arrayStr=instance.getTableInfo("wantid", "BbID", UserID);
						JSONArray arrayArr=JSON.parseArray(arrayStr);
						for(int i=0;i<arrayArr.size();i++) {
							String Str=arrayArr.getString(i);
							JSONObject Obj=JSON.parseObject(Str);
							int state=Obj.getIntValue("state");
							if(state==1) {
								session.write(addHeadTail("191",""));
								instance.setTableInfo("WantInfo", "WantID", Obj.get("WantID"), "state", "0");
								/*
								 * need to confirm with database!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
								 
							}
					*/
							
						
						
						// 这里应该是true的json格式，以后再改
					}else {
						session.write(new MinaBean("{\"type\":101,\"state\":1}"));
						// 同理，应该是json的false格式，以后再改
					}
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					session.write(new MinaBean("{\"type\":101,\"state\":1}"));
					return;
				}
				return;
			}
	
	
	// 用户每次查询个人信息均返回（调用次数较多）
	private void returnUserInfo(IoSession session, String content)  {
		// message 转string
		
		// json方法
		JSONObject info = JSON.parseObject(content);
		// json中传来的应该是用户id，所以
		String dataStr=info.getString("data");
		JSONObject data = JSON.parseObject(dataStr);
		String UserId = data.getString("UserID");
		// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
		try {
			String UserInfo = instance.getTableInfo("user", "UserID", UserId);
			// 直接发
			String UserInfo2=addHeadTail("102",UserInfo);
			session.write(new MinaBean(UserInfo2));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			session.write(new MinaBean("{\"type\":102,\"state\":1}"));
			// json格式，需修改
			return;
		}

	}

	//Splash
	
	private void Splash(IoSession session,String content) throws Exception{
		String cont="{\"type\":99,\"state\":0,\"data\":{\"Splash\":\"";
		String splash=instance.getTableInfo("ad", "AdID", "10000", "Splash");
		JSONObject splashObj=JSON.parseObject(splash);
		String splashStr=splashObj.getString("Splash");
		cont=cont+splashStr+"\"}}";
		session.write(new MinaBean(cont));
	}
	
	
	
	// 请求初始化
		//105
		private void getInitial(IoSession session, String content) throws Exception {
			// message 转string
			
			// json方法
			JSONObject info = JSON.parseObject(content);
			/*
			 * 此处直接调用缺省值，将整张表都拿过来做一个object 这个object转成string然后直接给到客户端 客户端根据数据库方面方式解开
			 */
			try {
				String itemsInfo = instance.getTableInfo("ItemInfo");
				// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
				// 直接发
				
				String head="{\"type\":"+"105"+",\"state\":0,\"data\":{";
				itemsInfo=head+"\"ItemInfoList\":"+itemsInfo;
				String adpic=instance.getTableInfo("ad", "AdID", "10000", "AdPic");
				JSONObject adpicObj=JSON.parseObject(adpic);
				String adpicStr=adpicObj.getString("AdPic");
				itemsInfo=itemsInfo+",\"AdPic\":"+adpicStr;
//				String splash=instance.getTableInfo("ad", "AdID", "10000", "Splash");
//				JSONObject splashObj=JSON.parseObject(splash);
//				String splashStr=splashObj.getString("Splash");
//				itemsInfo=itemsInfo+",\""+splashStr+"\"}";
				itemsInfo=itemsInfo+"}}";
				
						
				
				
				
				
				
				session.write(new MinaBean(itemsInfo));

			} catch (Exception e) {
				e.printStackTrace();
				session.write(new MinaBean("{\"type\":105,\"state\":1}"));
				// json格式，需修改
				return;
			}

		}

	
	
	
	// 接受大师兄意向信息
	private void wantInfo(IoSession session, String content) throws Exception {
		// message 转string
		
		// json方法
		JSONObject info = JSON.parseObject(content);
		
		//构建table的jsonobject
		JSONObject table = info.getJSONObject("data");
		String pic = table.getString("Image");
		
		if(!pic.equals("")){
			String userid = table.getString("UserID");
			Calendar a = Calendar.getInstance();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String currenttime = df.format(a.getTime());
			String filename = new String(userid+" "+currenttime+".png");
			
			//将img写入硬盘
	        File file = null;
	        String path = null;
	        try {  
	            File dir = new File("D:/userimage/"+userid);  
	            if(!(dir.exists()&&dir.isDirectory())){//判断文件目录是否存在  
	                dir.mkdirs();  
	            }  
	            file = new File("D:/userimage/"+userid+"/"+filename);
	            path = file.toString();
	            Base64coder.Base64ToImage(pic,path);
 
	        } catch (Exception e) {  
	            e.printStackTrace();  
	        } 
	        table.replace("image", "path");
		}
		/*
		 * 接收过来大师兄意向信息 写入数据库
		 */
		try {
			// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			instance.insertTableInfo("wantInfo", table.toJSONString());
			session.write(new MinaBean("{\"type\":103,\"state\":0}"));
			// json格式，需修改
			// session.write(true);
			/*
			 * 没有错误就不返回 有错误就向服务器返回false
			 */
		} catch (Exception e) {
			e.printStackTrace();
			session.write(new MinaBean("{\"type\":103,\"state\":1}"));
			// json格式，需修改
			return;
		}
	}
	
	
	
	// 接受带哥意向信息
		private void wantedInfo(IoSession session, Object message) throws Exception {
			// message 转string
			String content = message.toString();
			// json方法
			JSONObject info = JSON.parseObject(content);
			String data = info.getString("data");
			JSONObject dataObj=JSONObject.parseObject(data);
			String location=dataObj.getString("Destination");
			String time = dataObj.getString("ArriveTime");
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
				session.write(new MinaBean("{\"type\":194,\"state\":1}"));
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
				String wantInfo = instance.getTableInfo("wantinfo");
				// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
				//转map函数
				Map[] wantMap=instance.toMapArray(wantInfo);
				
				/*
				 * 判断是否符合订单信息
				 * 不符合的写入null
				 */
				System.out.println("wantmap.length="+wantMap.length);
				for(int i=0;i<wantMap.length;i++) {
					//System.out.println("qweeee="+wantMap[i].get("Destination"));
					//System.out.println("rrrttt="+wantMap[i].get("ArriveTime"));
					String destination=wantMap[i].get("Destination").toString();
					if(!((destination.equals(location))&&(wantMap[i].get("ArriveTime").equals(time)))) {
						
						wantMap[i]=null;
						System.out.println("inside this");
						}
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
				System.out.println("j="+j);
				
				/*
				 * 将数组中的map元素全部转化为String
				 * 再转成jsonobject
				 * 再加入jsonarray
				 * 再把jsonarray转字符串
				 * 再加报头报尾
				 * 发送
				 * 
				 */
//				String tempStr=null;
//				JSONObject tempObj=null; 
//				JSONArray wantMapArray=new JSONArray();
//				for(int i=0;i<j;i++) {
//					 tempStr=JSON.toJSONString(wantMap2[i]);
//					 tempObj=JSONObject.parseObject(tempStr);
//					 wantMapArray.add(tempObj);
//				}
//				//转string
//				String alreadyMatchOrders=wantMapArray.toJSONString();
//				//加报头报尾
//				String orders=addHeadTail("194",alreadyMatchOrders);
//				
//				
//				//发送
//				session.write(orders);
				
				
				
				
				String cont="{\"type\":194,\"state\":0,\"data\":[";
				if(j==0) {
					cont=cont+"]}";
					session.write(new MinaBean(cont));
					return;
				}
				for(int i=0;i<j;i++) {
					cont=cont+"{\"WantInfo\":"+JSON.toJSONString(wantMap2[i])+","					
							+ "\"data\":[";
					
					
					
					String itemslist=(String) wantMap2[i].get("ItemList");
					JSONArray itemslistArr=JSON.parseArray(itemslist);
					
					
					for(int p=0;p<itemslistArr.size();p++) {
						cont=cont+"{\"ItemInfo\":"+instance.getTableInfo("iteminfo", "ItemID", itemslistArr.get(p));
						int qua=1;
						for(int k=p+1;k<itemslistArr.size();k++) {
							if(itemslistArr.get(k).equals(itemslistArr.get(p))) {
								qua++;
								itemslistArr.remove(k);
							}
						}
						cont=cont+",\"Quantity\":"+qua+"},";
							
					}
					
					cont=cont.substring(0,cont.length()-1);
					cont=cont+"]},";
					
				}
				cont=cont.substring(0,cont.length()-1);
				cont=cont+"]}";
				
				
				
				session.write(new MinaBean(cont));
				
				
				

			} catch (Exception e) {
				e.printStackTrace();
				session.write(new MinaBean("{\"type\":194,\"state\":1}"));
				// json格式，需修改
				return;
			}

			
		}
		
	
	
	
	
	/*
	 * 106
	 * 如果客户端选择持续等待
	 * 调用此函数进行动态匹配及提醒
	 */
	
	private void keepMatching(IoSession session,String content ) {
		JSONObject dataObj=JSON.parseObject(content);
		String dataStr=dataObj.getString("data");
		JSONObject data=JSON.parseObject(dataStr);
		String fetcherid = data.getString("FetcherID");
		//IoSession session = SessionManager.getManager().getSession(fetcherid);
		try {
			String location = instance.getTableInfo("wantedinfo", "FetcherID", fetcherid, "Destination");
			String time = instance.getTableInfo("wantedinfo", "FetcherID", fetcherid, "ArriveTime");
			Boolean found = false;
			while(!found) {
				String wantInfo = instance.getTableInfo("wantInfo");
				Map[] wantMap=instance.toMapArray(wantInfo);
				for(int i=0;i<wantMap.length;i++) {
					if((!(wantMap[i].get("Destination").equals(location)))
							||
							(!(wantMap[i].get("ArriveTime").equals(time)))
							
							)
						wantMap[i]=null;	
				}
				Map[] wantMap2=new Map[100];
				int j=0;
				for(int i=0;i<wantMap.length;i++) {
					if(wantMap[i]!=null) {
						wantMap2[j]=wantMap[i];
						j++;
					}
				}
				String tempStr=null;
				JSONObject tempObj=null;
				JSONArray wantMapArray=new JSONArray();
				for(int i=0;i<j;i++) {
					 tempStr=JSON.toJSONString(wantMap2[i]);
					 tempObj=JSONObject.parseObject(tempStr);
					 wantMapArray.add(tempObj);
				}
				if(wantMapArray.isEmpty()) {
					Thread.sleep(1000);
				}else {
					found = true;
					String alreadyMatchOrders=wantMapArray.toJSONString();
					String orders=addHeadTail("194",alreadyMatchOrders);
					session.write(new MinaBean(orders));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.write(new MinaBean("{\"type\":106,\"state\":1}"));
			return;
		}	
	}
	
	
	
	
	
	/*
	 * 107
	 * 查找当前被接单的大师兄是否在线
	 * 如果在线发送提示
	 * 如果不在线
	 * 写入状态为1
	 * 等待登录后主动提示
	 * 发来的data里是wantId
	 */
	private void acceptOrder(IoSession session,String content) throws Exception {
		/*
		 * object转string转json提取再转再转
		 * 提出wangid就是大师兄意向id
		 * 
		 * 
		 */
		
		JSONObject info=JSON.parseObject(content);
		String dataStr=info.getString("data");
		JSONObject data=JSON.parseObject(dataStr);
		String wantId=data.getString("WantIDList");
		//JSONArray wantIDList=JSON.parseArray(wantId);
		String fetcherId=data.getString("FetcherID");
		String BbId=null;
		//获取wantedid
				String wantedIdStr=instance.getTableInfo("wantedinfo", "FetcherID", fetcherId, "WantedID");
				JSONObject wantedIdObj=JSON.parseObject(wantedIdStr);
				String wantedId=wantedIdObj.getString("WantedID");
				
				//获取finishtime
				String arriveTimeStr=instance.getTableInfo("wantedinfo", "FetcherID", fetcherId, "ArriveTime");
				JSONObject arriveTimeObj=JSON.parseObject(arriveTimeStr);
				String arriveTime=arriveTimeObj.getString("ArriveTime");
				Calendar a=Calendar.getInstance();
				SimpleDateFormat b=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String StartTime=b.format(a.getTime());
		
		
		
		
		
		
		
		JSONArray wantIdList=JSONArray.parseArray(wantId);
		int num=wantIdList.size();
		for(int i=0;i<num;i++) 
		{
			
		
		/*
		 * 进数据库查这个意向id是哪个大师兄下的单
		 * 进SessionManager查这个大师兄id对应的session
		 * 
		 * 查得到直接发
		 * 查不到就在大师兄意向里状态改成1
		 * （每次登陆都查看一下状态，如果是1就提醒一下）
		 * 
		 * 写入订单信息，确定订单已经生成
		 * 
		 */
		try {
			String BbID = instance.getTableInfo("wantinfo", "wantID", wantIdList.getString(i), "BbID");
			JSONObject BbIDObj=JSON.parseObject(BbID);
			String BbIDStr=BbIDObj.getString("BbID");
			//BbId=BbIDStr;
			IoSession wantSession=SessionManager.getManager().getSession(BbIDStr);
			if(wantSession==null) {
				instance.setTableInfo("wantinfo","WantID" , wantIdList.getString(i), "state", "1");
			}
			else {
				//197是提醒被接单代码
				String mess="{\"type\":197}";
				wantSession.write(new MinaBean(mess));
				
			}
			
			
			
			
						
				String tradeInfo="{\"FetcherID\":"+fetcherId+",\"BbID\":"+BbIDStr+",\"WantedID\":"+wantedId
						+",\"WantID\":"+wantIdList.getIntValue(i)+",\"StartTime\":\""+StartTime+"\",\"FinishTime\":\""
						+arriveTime+"\",\"State\":0}";
				instance.insertTableInfo("traderecordinfo", tradeInfo);
				
				
				
				
				
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		}	
		
		
		
			/*
			 * 写入订单信息
			 * 确认订单
			 * 不删意向s
			 */
		
			session.write(new MinaBean("{\"type\":107,\"state\":0}"));
			
			
		/*
		 * 终于他妈的结束了这个函数
		 * 太棒了			
		 */
					
			
	}
	
	
	/*
	 * 108
	 * 查询订单信息
	 * 带哥
	 * 
	 */
	private void queryFetcherOrder(IoSession session,String content) throws Exception{
		
		//传来的是 type state data
		JSONObject contentObj=JSON.parseObject(content);
		String dataStr=contentObj.getString("data");
		JSONObject dataObj=JSON.parseObject(dataStr);
		String UserId=dataObj.getString("UserID");
		
		
		/*
		 * 获取到userId后查询订单信息
		 * 1.查询作为带哥的订单
		 * 2.查询作为大师兄的订单
		 */
		
		
		String recordStr=instance.getTableInfo("traderecordinfo", "FetcherID", UserId);
		JSONArray recordArr=JSON.parseArray(recordStr);
		
		
		/*
		 * 查询作为大师兄的订单
		 * 逻辑与上面一样
		 */
		
		//String recordStr2=instance.getTableInfo("traderecordinfo", "BbID", UserId);
		//JSONArray recordArr2=JSON.parseArray(recordStr2);
		
		
		/*
		 * 合并
		 */
		
		//JSONArray recordTotal=mergeJSONArray(recordArr,recordArr2);
		String recordTotalStr=recordArr.toJSONString();
		//加头尾
		String recordTotalStrWithHeadTail=addHeadTail("198",recordTotalStr);
		//发送
		session.write(new MinaBean(recordTotalStrWithHeadTail));
		
		
		
		
		/*
		 * 结束
		 */
		
		
	}
	
	
	
	
	/*
	 * 合并函数
	 * 将两个jsonArray合并成一个JSONArray
	 */
	private JSONArray mergeJSONArray(JSONArray arr1,JSONArray arr2){
		JSONArray arr = new JSONArray();
		for(int i=0;i<arr1.size();i++){
			arr.add(arr1.get(i));
		}
		for(int i=0;i<arr2.size();i++){
			arr.add(arr2.get(i));
		}
		return arr;
	}
	
	
	/*
	 * 109
	 * 查询订单详情页
	 */
	
	private void orderDetail(IoSession session,String content) throws Exception{
		
		//传来的是 type state data
		JSONObject contentObj=JSON.parseObject(content);
		String dataStr=contentObj.getString("data");
		JSONObject dataObj=JSON.parseObject(dataStr);
		String TradeID=dataObj.getString("TradeID");
		/*
		 * getstring类型订单信息
		 * 加头加尾发出去
		 * 代号199
		 */
		try {
		String orderStr=instance.getTableInfo("traderecordinfo", "TradeID", TradeID);
		String mess=addHeadTail("199",orderStr);
		session.write(new MinaBean(mess));
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
	/*
	 * 110
	 * confirm the complete of trade
	 */
	
	private void confirmTradeComplete(IoSession session,String content) throws Exception{
		
		//传来的是 type state data
		JSONObject contentObj=JSON.parseObject(content);
		String dataStr=contentObj.getString("data");
		JSONObject dataObj=JSON.parseObject(dataStr);
		String TradeID=dataObj.getString("TradeID");
		/*
		 * getstring类型订单信息
		 * 加头加尾发出去
		 * 代号199
		 */
		try {
		instance.setTableInfo("traderecordinfo", "TradeID", TradeID, "state", "1");
		session.write(new MinaBean("{\"type\":110,\"state\":0}"));
		
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
	/*
	 * 111
	 * query single item info
	 */
	
	
	
	
	private void querySingleItemInfo(IoSession session, String content) throws Exception {
		// message 转string
		
		// json方法
		JSONObject info = JSON.parseObject(content);
		String dataStr=info.getString("data");
		JSONObject dataObj=JSON.parseObject(dataStr);
		String itemID=dataObj.getString("ItemID");
		
		
		/*
		 * send to server like this
		 * {"type":111,"state":0,"data":{"ItemID":10001}}
		 */
		
		
		try {
			String itemInfo=instance.getTableInfo("iteminfo", "ItemID", itemID);
			
			
			// 需要进行数据库合并测试！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			// 直接发
			String itemsInfo=addHeadTail("181",itemInfo);
			session.write(new MinaBean(itemsInfo));

		} catch (Exception e) {
			e.printStackTrace();
			session.write(new MinaBean("{\"type\":111,\"state\":1}"));
			// json格式，需修改
			return;
		}

	}
	
	
	
	
	
	

	/*
	 * 112
	 * query all wantInfo
	 * 
	 */
	private void  queryAllWantInfo(IoSession session,String content) throws Exception{
		JSONObject contentObj=JSON.parseObject(content);
		String dataStr=contentObj.getString("data");
		JSONObject dataObj=JSON.parseObject(dataStr);
		int BbID=dataObj.getIntValue("BbID");
		/*
		 * query the database
		 * 
		 */
		
		try {
		String cont="{\"type\":182,\"state\":0,\"data\":[";
		if(instance.getNumber("wantinfo","BbID",BbID)==0) {
			cont=cont+"]}";
			session.write(new MinaBean(cont));
			return;
		}
		for(int i=0;i<instance.getNumber("wantinfo","BbID",BbID);i++) {
			cont=cont+"{\"WantInfo\":"+instance.getRowofNumber("wantinfo","BbID",BbID,i)+","
					+"\"TradeInfo\":";
			String wantinfo=instance.getRowofNumber("wantinfo","BbID",BbID,i);
			JSONObject wantinfoObj=JSON.parseObject(wantinfo);
			String WantID=wantinfoObj.getString("WantID");
			String tradeinfo=instance.getTableInfo("traderecordinfo", "WantID", WantID);
			
			cont=cont+tradeinfo+","
					+ "\"WantedInfo\":";
			
			
			
			String wantedid=instance.getTableInfo("traderecordinfo", "WantID", WantID, "WantedID");
			JSONObject wantedidObj=JSON.parseObject(wantedid);
			String wantedidStr=wantedidObj.getString("WantedID");
			String wantedinfo=instance.getTableInfo("wantedinfo", "WantedID", wantedidStr);
			
			
			cont=cont+wantedinfo
					+ ","
					+ "\"data\":[";
			String itemslist=wantinfoObj.getString("ItemList");
			JSONArray itemslistArr=JSON.parseArray(itemslist);
			
			
			for(int j=0;j<itemslistArr.size();j++) {
				cont=cont+"{\"ItemInfo\":"+instance.getTableInfo("iteminfo", "ItemID", itemslistArr.get(j));
				int qua=1;
				for(int k=j+1;k<itemslistArr.size();k++) {
					if(itemslistArr.get(k).equals(itemslistArr.get(j))) {
						qua++;
						itemslistArr.remove(k);
					}
				}
				cont=cont+",\"Quantity\":"+qua+"},";
					
			}
			
			cont=cont.substring(0,cont.length()-1);
			cont=cont+"]},";
			
		}
		cont=cont.substring(0,cont.length()-1);
		cont=cont+"]}";
		
		
		session.write(new MinaBean(cont));
		
		}catch(Exception e) {
			e.printStackTrace();
			
			
		}
	}
	
	
	/*
	 * 113
	 * query all wantedInfo
	 * 
	 */
	private void  queryAllWantedInfo(IoSession session,String content) throws Exception{
		JSONObject contentObj=JSON.parseObject(content);
		String dataStr=contentObj.getString("data");
		JSONObject dataObj=JSON.parseObject(dataStr);
		int FetcherID=dataObj.getIntValue("FetcherID");
		/*
		 * query the database
		 * 
		 */
		
		try {
		String cont="{\"type\":183,\"state\":0,\"data\":[";
		if(instance.getNumber("wantedinfo","FetcherID",FetcherID)==0) {
			cont=cont+"]}";
			session.write(new MinaBean(cont));
			return;
		}
		for(int i=0;i<instance.getNumber("wantedinfo","FetcherID",FetcherID);i++) {
			
			String wantedinfo=instance.getRowofNumber("wantedinfo","FetcherID",FetcherID,i);
			cont=cont+"{\"WantedInfo\":"+wantedinfo+","
					+"\"data\":[";
			JSONObject wantedinfoObj=JSON.parseObject(wantedinfo);
			int wantedid=wantedinfoObj.getIntValue("WantedID");
			//not accept the wanted ,return ""
			if(instance.getNumber("traderecordinfo","WantedID",wantedid)==0) {
				cont=cont+"]},";
				continue;
			}
			for(int o=0;o<instance.getNumber("traderecordinfo","WantedID",wantedid);o++)
			{
			cont=cont+"{\"TradeInfo\":";
			
			String tradeinfoStr=instance.getRowofNumber("traderecordinfo", "WantedID", wantedid,o);
			JSONObject tradeinfoObj=JSON.parseObject(tradeinfoStr);
			//String tradeinfo=tradeinfoObj.getString("TradeInfo");
			cont=cont+tradeinfoStr+",\"WantInfo\":";
			
			
			String wantidStr=tradeinfoObj.getString("WantID");
			String wantinfoStr=instance.getTableInfo("WantInfo", "WantID", wantidStr);
			JSONArray wantinfoArr=JSON.parseArray(wantinfoStr);
			cont=cont+wantinfoStr+",\"data\":[";
			
			
			
			
			
			
			JSONObject wantinfoObj=wantinfoArr.getJSONObject(0);
			String itemslist=wantinfoObj.getString("ItemList");
			JSONArray itemslistArr=JSON.parseArray(itemslist);
			
			
			for(int j=0;j<itemslistArr.size();j++) {
				cont=cont+"{\"ItemInfo\":"+instance.getTableInfo("iteminfo", "ItemID", itemslistArr.get(j));
				int qua=1;
				for(int k=j+1;k<itemslistArr.size();k++) {
					if(itemslistArr.get(k).equals(itemslistArr.get(j))) {
						qua++;
						itemslistArr.remove(k);
					}
				}
				cont=cont+",\"Quantity\":"+qua+"},";
					
			}
			
			cont=cont.substring(0,cont.length()-1);
			cont=cont+"]},";
			
			
			}
			cont=cont.substring(0,cont.length()-1);
			cont=cont+"]},";
			
		}
		cont=cont.substring(0,cont.length()-1);
		cont=cont+"]}";
		
		
		session.write(new MinaBean(cont));
		
		}catch(Exception e) {
			e.printStackTrace();
			
			
		}
	}

	
	/*
	 * 114
	 * query the wantedInfo
	 * 
	 */
	private void  queryWantedInfo(IoSession session,String content) throws Exception{
		JSONObject contentObj=JSON.parseObject(content);
		String dataStr=contentObj.getString("data");
		JSONObject dataObj=JSON.parseObject(dataStr);
		String WantedID=dataObj.getString("WantedID");
		/*
		 * query the database
		 * 
		 */
		String wantedInfoStr=instance.getTableInfo("wantedinfo", "WantedID", WantedID);
		
		String finallyWantedInfoStr=addHeadTail("184",wantedInfoStr);
		session.write(new MinaBean(finallyWantedInfoStr));
		
		
	}
	/*
	 * 115
	 */
	private void type115(IoSession session, Object message) { 
		String content = ioBufferToString(message);
		JSONObject messageObj = JSON.parseObject(content);
		String data = messageObj.getString("data");
		JSONObject obj = JSONObject.parseObject(data);
		try {
			int tradeid = obj.getIntValue("TradeID");
			String fetcherlocation = (String) instance.getTableInfoValue("traderecordinfo", "TradeID", tradeid, "FetcherLocation");
			String fetcherid = (String) instance.getTableInfoValue("traderecordinfo", "TradeID", tradeid, "FetcherID");
			String nickname =(String) instance.getTableInfoValue("user", "UserID", fetcherid, "NickName");
			String phonenumber =(String) instance.getTableInfoValue("user", "UserID", fetcherid, "PhoneNumber");
			Map<String, Object> resultmap = new HashMap<String,Object>();
			resultmap.put("NickName", nickname);
			resultmap.put("PhoneNumber", phonenumber);
			resultmap.put("FetcherLocation", fetcherlocation);
			String resultstr = JSON.toJSONString(resultmap);
			String strtosend = addHeadTail("185",resultstr);
			session.write(new MinaBean(strtosend));
		}catch(Exception e) {
			e.printStackTrace();
			session.write(new MinaBean("{\"type\":115,\"state\":1}"));
		}
	}
	/*
	 * 116
	 */
	private void type116(IoSession session, Object message) { 
		String content = ioBufferToString(message);
		JSONObject messageObj = JSON.parseObject(content);
		String data = messageObj.getString("data");
		JSONObject obj = JSONObject.parseObject(data);
		try {
			int tradeid = obj.getIntValue("TradeID");
			Calendar a = Calendar.getInstance();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String currenttime = df.format(a.getTime());
			instance.setTableInfo("traderecordinfo", "TradeID", tradeid, "FinishTime", currenttime);
			instance.setTableInfo("traderecordinfo", "TradeID", tradeid, "State", 1);
			int bbid = (Integer) instance.getTableInfoValue("traderecordinfo", "TradeID", tradeid, "BbID");
			instance.setTableInfo("wantinfo", "BbID", bbid, "State", 2);
			session.write(new MinaBean("{\"type\":116,\"state\":0}"));
		}catch(Exception e) {
			e.printStackTrace();
			session.write(new MinaBean("{\"type\":116,\"state\":1}"));
		}
	}
	private void type117(IoSession session, Object message) { 
		String content = ioBufferToString(message);
		JSONObject messageObj = JSON.parseObject(content);
		String data = messageObj.getString("data");
		JSONObject obj = JSONObject.parseObject(data);
		try {
			int tradeid = obj.getIntValue("TradeID");
			Calendar a = Calendar.getInstance();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String currenttime = df.format(a.getTime());
			instance.setTableInfo("traderecordinfo", "TradeID", tradeid, "FinishTime", currenttime);
			instance.setTableInfo("traderecordinfo", "TradeID", tradeid, "State", 1);
			int fetcherid = (Integer) instance.getTableInfoValue("traderecordinfo", "TradeID", tradeid, "FetcherID");
			instance.setTableInfo("wantedinfo", "FetcherID", fetcherid, "State", 2);
			session.write(new MinaBean("{\"type\":117,\"state\":0}"));
		}catch(Exception e) {
			e.printStackTrace();
			session.write(new MinaBean("{\"type\":117,\"state\":1}"));
		}
	}
	/*
	 * 118
	 */
	private void type118(IoSession session, Object message) { 
		String content = ioBufferToString(message);
		JSONObject messageObj = JSON.parseObject(content);
		String data = messageObj.getString("data");
		JSONObject obj = JSONObject.parseObject(data);
		try {
			String fetcherlocation = obj.getString("FetcherLocation");
			int tradeid = obj.getIntValue("TradeID");
			instance.setTableInfo("traderecordinfo", "TradeID", tradeid, "FetcherLocation", fetcherlocation);
			session.write(new MinaBean("{\"type\":118,\"state\":0}"));
		}catch(Exception e) {
			e.printStackTrace();
			session.write(new MinaBean("{\"type\":118,\"state\":1}"));
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
