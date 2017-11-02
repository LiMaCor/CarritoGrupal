/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Service.publicinterface;

/**
 *
 * @author Kysuke
 */
import Bean.ReplyBean;

public interface ViewServiceInterface {

    public ReplyBean getPage() throws Exception;

    public ReplyBean getCount() throws Exception;

    public ReplyBean getPageX() throws Exception;

    public ReplyBean getCountX() throws Exception;

}
