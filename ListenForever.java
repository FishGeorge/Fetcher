import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.Charset;

import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.filter.codec.textline.LineDelimiter;
import org.apache.mina.filter.codec.textline.TextLineCodecFactory;
import org.apache.mina.filter.logging.LogLevel;
import org.apache.mina.filter.logging.LoggingFilter;
import org.apache.mina.transport.socket.SocketAcceptor;
import org.apache.mina.transport.socket.nio.NioSocketAcceptor;

public class ListenForever {
    
    SocketAcceptor acceptor = null;
    
    ListenForever(){
        acceptor = new NioSocketAcceptor();
        acceptor.getFilterChain().addLast("codec",   
                new ProtocolCodecFilter(new TextLineCodecFactory(Charset.forName("UTF-8"))));
        if(!bind()){
            System.out.println("服务器启动失败");
        }else{
            System.out.println("服务器启动成功");
        }
    }
    public boolean bind(){
        //acceptor.getFilterChain().addLast("codec", new ProtocolCodecFilter(
                //new MyTextLineCodecFactory()); //配置CodecFactory
        LoggingFilter log = new LoggingFilter();
        log.setMessageReceivedLogLevel(LogLevel.INFO);
        acceptor.getFilterChain().addLast("logger", log);
        acceptor.setHandler(new ServerHandler());//配置handler
        acceptor.getSessionConfig().setIdleTime(IdleStatus.BOTH_IDLE, 30);
        //acceptor.getFilterChain().addLast("codec", 
                //new ProtocolCodecFilter(new TextLineCodecFactory(Charset.forName("UTF-8"))));
        try {
            acceptor.bind(new InetSocketAddress(8899));
            return true;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        
    }
    /*
    public static void main(String args[]){
        ListenForever server = new ListenForever();
        if(!server.bind()){
            System.out.println("服务器启动失败");
        }else{
            System.out.println("服务器启动成功");
        }
    }*/

}