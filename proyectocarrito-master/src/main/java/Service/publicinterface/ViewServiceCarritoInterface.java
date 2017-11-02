package Service.publicinterface;

import Bean.ReplyBean;

/**
 *
 * @author Julian
 */

public interface ViewServiceCarritoInterface {

    public ReplyBean list() throws Exception;

    public ReplyBean buy() throws Exception;

    public ReplyBean empty() throws Exception;
}
