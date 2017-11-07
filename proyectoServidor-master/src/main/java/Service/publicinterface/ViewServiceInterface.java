package Service.publicinterface;

/**
 *
 * @author Julián
 */

import Bean.ReplyBean;

public interface ViewServiceInterface {

    public ReplyBean getPage() throws Exception;

    public ReplyBean getCount() throws Exception;

    public ReplyBean getPageX() throws Exception;

    public ReplyBean getCountX() throws Exception;

}
