package Service.publicinterface;

import Bean.ReplyBean;

/**
 *
 * @author Julian
 */

public interface TableServiceCarritoInterface {

    public ReplyBean add() throws Exception;

    public ReplyBean remove() throws Exception;
}
