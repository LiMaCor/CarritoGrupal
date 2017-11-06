/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Dao.specificimplementation;

/**
 *
 * @author Kysuke
 */
import Dao.genericimplementation.TableGenericDaoImplementation;
import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import java.sql.Connection;

public class TipousuarioSpecificDaoImplementation extends TableGenericDaoImplementation {

    public TipousuarioSpecificDaoImplementation(Connection oPooledConnection, UsuarioSpecificBeanImplementation oPuserBean_security, String strWhere) {
        super("tipousuario", oPooledConnection, oPuserBean_security, strWhere);
    }

}
