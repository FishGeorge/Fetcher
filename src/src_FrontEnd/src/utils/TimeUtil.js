export default class TimeUtil {


    static getDate(){
        var time=new Date();
        return time.getFullYear()+"-"+((time.getMonth()+1)>=10?"":"0")+(time.getMonth()+1)+"-"+time.getDate();
    }
}
