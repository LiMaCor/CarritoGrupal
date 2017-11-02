/*
 * Copyright (c) 2017 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * generic-carrito-server: Helps you to develop easily AJAX web applications 
 *               by copying and modifying this Java Server.
 *
 * Sources at https://github.com/rafaelaznar/generic-carrito-server
 * 
 * generic-carrito-server is distributed under the MIT License (MIT)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package Connection;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import Helper.ConnectionClassHelper;
import Helper.Log4jConfigurationHelper;
import java.beans.PropertyVetoException;
import java.sql.Connection;
import java.sql.SQLException;

public class C3POConnection implements ConnectionInterface {

    private ComboPooledDataSource connectionPool = null;
    private Connection oConnection = null;

    @Override
    public Connection newConnection() throws Exception {
        try {
            connectionPool = new ComboPooledDataSource();
            connectionPool.setDriverClass("com.mysql.jdbc.Driver");
            connectionPool.setJdbcUrl(ConnectionClassHelper.getConnectionChain());
            connectionPool.setUser(ConnectionClassHelper.getDatabaseLogin());
            connectionPool.setPassword(ConnectionClassHelper.getDatabasePassword());
            connectionPool.setMaxStatements(180);
            oConnection = connectionPool.getConnection();
        } catch (PropertyVetoException | SQLException ex) {
            String msg = this.getClass().getName() + ":" + (ex.getStackTrace()[0]).getMethodName();
            Log4jConfigurationHelper.errorLog(msg, ex);
            throw new Exception(msg, ex);
        }
        return oConnection;
    }

    @Override
    public void disposeConnection() throws Exception {
        try {
            if (oConnection != null) {
                oConnection.close();
            }
            if (connectionPool != null) {
                connectionPool.close();
            }
        } catch (SQLException ex) {
            String msg = this.getClass().getName() + ":" + (ex.getStackTrace()[0]).getMethodName();
            Log4jConfigurationHelper.errorLog(msg, ex);
            throw new Exception(msg, ex);
        }
    }
}
