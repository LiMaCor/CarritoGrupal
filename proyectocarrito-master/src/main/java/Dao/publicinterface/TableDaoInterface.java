/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Dao.publicinterface;

/**
 *
 * @author Kysuke
 */
public interface TableDaoInterface<GenericTableBean> {

    public GenericTableBean get(int id, int intExpand) throws Exception;

    public Integer set(GenericTableBean oBean) throws Exception;

    public Boolean remove(Integer id) throws Exception;

}
