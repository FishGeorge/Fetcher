import org.apache.mina.core.session.IoSession;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class SessionManager {
    private final static Map<String, IoSession> sessions = new ConcurrentHashMap<>();
    private final static SessionManager manager = new SessionManager();

    public static SessionManager getManager() {
        return manager;
    }

    private SessionManager() {}

    public void add(String UserId,IoSession ioSession) {
        if (ioSession == null) return;
        if(sessions.get(UserId)==null) {
        		sessions.put(UserId, ioSession);
        }else {
        		remove(sessions.get(UserId));
        		sessions.put(UserId, ioSession);
        }
        
    }
    public void send(String getid) {
    		sessions.get(getid).write("abc");
    }
    public void remove(IoSession ioSession) {
        if (ioSession == null) return;

        sessions.remove(ioSession);
    }

    public void removeAll() {
        if (sessions.size() == 0) return;

        sessions.clear();
    }

    public void update(Object message) {
        for (IoSession ioSession: sessions.values()) {
            ioSession.write(message);
        }
    }
}